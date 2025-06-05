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