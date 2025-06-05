import { Request, Response, NextFunction } from 'express';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import db from '../../utils/db';
import { CustomError } from '../../utils/custom-error';

// Configure AWS S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ''
  }
});

interface AuthenticatedRequest extends Request {
  user?: { id: number }; // Changed to number to match global type
  file?: Express.Multer.File;
}

interface ResponseWithSuccess extends Response {
  sendSuccess: (data: any, message?: string) => void;
}

// View my profile: GET /users/me
export const getMyProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const resTyped = res as ResponseWithSuccess;
  try {
    const userId = req.user?.id;
    if (!userId) throw new CustomError('Unauthorized', 401);

    const [rows] = await db.query(
      `SELECT user_id, username, first_name, last_name, email, phone_number, profile_pic, created_on, updated_on 
       FROM users WHERE user_id = ?`,
      [userId]
    );

    const user = (rows as any[])[0];
    if (!user) throw new CustomError('User not found', 404);

    resTyped.sendSuccess(user, 'User profile retrieved');
  } catch (err) {
    next(err);
  }
};

// Break out updateProfile into smaller functions to reduce complexity
function validateUsername(username: string | undefined, currentUsername: string, lastUpdate: Date | null): void {
  if (username && username !== currentUsername) {
    if (lastUpdate) {
      const now = new Date();
      const diffDays = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays < 30) {
        throw new CustomError('Username can only be changed once every 30 days', 400);
      }
    }
  }
}

async function checkUsernameUniqueness(username: string): Promise<void> {
  const [usernameExistsRows] = await db.query(`SELECT user_id FROM users WHERE username = ?`, [username]);
  if ((usernameExistsRows as any[]).length > 0) {
    throw new CustomError('Username already taken', 400);
  }
}

function buildUpdateFields(data: {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  username?: string;
}, currentUsername: string): { fields: string[]; values: any[] } {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.first_name) {
    fields.push('first_name = ?');
    values.push(data.first_name);
  }
  if (data.last_name) {
    fields.push('last_name = ?');
    values.push(data.last_name);
  }
  if (data.email) {
    fields.push('email = ?');
    values.push(data.email);
  }
  if (data.phone) {
    fields.push('phone_number = ?');
    values.push(data.phone);
  }
  if (data.username && data.username !== currentUsername) {
    fields.push('username = ?');
    values.push(data.username);
  }

  return { fields, values };
}

export const updateProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const resTyped = res as ResponseWithSuccess;
  try {
    const userId = req.user?.id;
    if (!userId) throw new CustomError('Unauthorized', 401);

    const { first_name, last_name, email, phone, username } = req.body;

    // Get current user data
    const [userRows] = await db.query(`SELECT username, updated_on FROM users WHERE user_id = ?`, [userId]);
    const user = (userRows as any[])[0];
    if (!user) throw new CustomError('User not found', 404);

    // Validate username update timing
    validateUsername(username, user.username, user.updated_on);

    // Check username uniqueness if being updated
    if (username && username !== user.username) {
      await checkUsernameUniqueness(username);
    }

    // Build update query
    const { fields, values } = buildUpdateFields(
      { first_name, last_name, email, phone, username },
      user.username
    );

    if (fields.length === 0) {
      throw new CustomError('No valid fields provided to update', 400);
    }

    values.push(userId);
    const sql = `UPDATE users SET ${fields.join(', ')}, updated_on = CURRENT_TIMESTAMP WHERE user_id = ?`;

    await db.query(sql, values);
    resTyped.sendSuccess(null, 'Profile updated successfully');
  } catch (err) {
    next(err);
  }
};

// Search users by username: GET /users/search?username=abc
export const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
  const resTyped = res as ResponseWithSuccess;
  try {
    const usernameQuery = req.query.username as string;
    if (!usernameQuery) {
      throw new CustomError('Username query parameter is required', 400);
    }

    const [rows] = await db.query(
      `SELECT username, first_name, last_name, profile_pic FROM users WHERE username LIKE ?`,
      [`%${usernameQuery}%`]
    );

    resTyped.sendSuccess(rows, 'Users retrieved');
  } catch (err) {
    next(err);
  }
};

// View public profile of another user: GET /users/:username
export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  const resTyped = res as ResponseWithSuccess;
  try {
    const { username } = req.params;

    const [rows] = await db.query(
      `SELECT username, first_name, last_name, profile_pic FROM users WHERE username = ?`,
      [username]
    );

    const user = (rows as any[])[0];
    if (!user) throw new CustomError('User not found', 404);

    resTyped.sendSuccess(user, 'User profile retrieved');
  } catch (err) {
    next(err);
  }
};

// View profile picture: GET /users/:username/profile-pic or /users/me/profile-pic
export const getProfilePicture = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const resTyped = res as ResponseWithSuccess;
  try {
    let username = req.params.username;

    if (username === 'me') {
      const userId = req.user?.id;
      if (!userId) throw new CustomError('Unauthorized', 401);

      const [rows] = await db.query(`SELECT username FROM users WHERE user_id = ?`, [userId]);
      const user = (rows as any[])[0];
      if (!user) throw new CustomError('User not found', 404);

      username = user.username;
    }

    const [picRows] = await db.query(`SELECT profile_pic FROM users WHERE username = ?`, [username]);
    const userPic = (picRows as any[])[0];
    if (!userPic) throw new CustomError('User not found', 404);

    if (!userPic.profile_pic) {
      throw new CustomError('Profile picture not set', 404);
    }

    resTyped.sendSuccess({ url: userPic.profile_pic }, 'Profile picture retrieved successfully');
  } catch (err) {
    next(err);
  }
};

// Upload profile picture: POST /users/me/profile-pic
export const uploadProfilePicture = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const resTyped = res as ResponseWithSuccess;
  try {
    const userId = req.user?.id;
    if (!userId) throw new CustomError('Unauthorized', 401);

    const file = req.file;
    if (!file) throw new CustomError('No file uploaded', 400);

    if (!file.mimetype.startsWith('image/')) {
      throw new CustomError('Only image files are allowed', 400);
    }

    const bucketName = process.env.AWS_BUCKET_NAME;
    if (!bucketName) {
      throw new CustomError('AWS bucket name not configured', 500);
    }

    const uploadKey = `profile-pictures/${userId}-${Date.now()}${getFileExtension(file.originalname)}`;

    try {
      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: bucketName,
          Key: uploadKey,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read'
        }
      });

      const result = await upload.done();
      
      // Update user's profile_pic URL in database
      await db.query(
        'UPDATE users SET profile_pic = ?, updated_on = CURRENT_TIMESTAMP WHERE user_id = ?',
        [result.Location, userId]
      );

      resTyped.sendSuccess(
        { 
          url: result.Location,
          userId: userId
        },
        'Profile picture uploaded successfully'
      );
    } catch (awsError) {
      console.error('AWS Upload Error:', awsError);
      throw new CustomError('Failed to upload profile picture to S3', 500);
    }
  } catch (err) {
    next(err);
  }
};

// Helper function to get file extension
function getFileExtension(filename: string): string {
  const ext = filename.split('.').pop();
  return ext ? `.${ext}` : '';
}
