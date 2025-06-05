import { Request, Response, NextFunction } from 'express';
import db from '../../utils/db';
import { CustomError } from '../../utils/custom-error';

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

interface ResponseWithSuccess extends Response {
  sendSuccess: (data: any, message?: string) => void;
}

export const addComment = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const resTyped = res as ResponseWithSuccess;
    try {
      const userId = req.user?.id;
      const { postId } = req.params;
      const { content } = req.body;
  
      if (!content) throw new CustomError('Comment content is required', 400);
  
      await db.query(
        `INSERT INTO comments (post_id, author_id, content) VALUES (?, ?, ?)`,
        [postId, userId, content]
      );
  
      resTyped.sendSuccess(null, 'Comment added successfully');
    } catch (err) {
      next(err);
    }
  };
  