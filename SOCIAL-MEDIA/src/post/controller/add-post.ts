import { Request, Response, NextFunction } from 'express';
import db from '../../utils/db';
import { CustomError } from '../../utils/custom-error';

interface AuthenticatedRequest extends Request {
  user?: { id: number }; // Changed to number to match authenticate middleware
}

interface ResponseWithSuccess extends Response {
  sendSuccess: (data: any, message?: string) => void;
}

export const createPost = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const resTyped = res as ResponseWithSuccess;
    try {
      const userId = req.user?.id;
      const { title, description, image_url } = req.body;
  
      if (!userId) throw new CustomError('Unauthorized', 401);
      if (!title || !description) throw new CustomError('Title and description are required', 400);
  
      const [result] = await db.query(
        `INSERT INTO posts (author_id, title, description, image_url) VALUES (?, ?, ?, ?)`,
  
        [userId, title, description, image_url ?? null]
      );
  
      resTyped.sendSuccess({ postId: (result as any).insertId }, 'Post created successfully');
    } catch (err) {
      next(err);
    }
  };