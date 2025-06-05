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