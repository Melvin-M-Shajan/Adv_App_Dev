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