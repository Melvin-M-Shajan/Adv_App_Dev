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