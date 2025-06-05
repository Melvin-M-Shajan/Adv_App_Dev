import { Request, Response, NextFunction } from 'express';
import db from '../../utils/db';
import { CustomError } from '../../utils/custom-error';

interface AuthenticatedRequest extends Request {
    user?: { id: number }; // Changed to number to match global type
    file?: Express.Multer.File;
  }
  
  interface ResponseWithSuccess extends Response {
    sendSuccess: (data: any, message?: string) => void;
  }

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