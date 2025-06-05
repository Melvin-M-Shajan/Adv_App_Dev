import { Request, Response, NextFunction } from 'express';
import db from '../../utils/db';
import { CustomError } from '../../utils/custom-error';

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

interface ResponseWithSuccess extends Response {
  sendSuccess: (data: any, message?: string) => void;
}

export const deleteComment = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const resTyped = res as ResponseWithSuccess;
    try {
      const userId = req.user?.id;
      const { commentId } = req.params;
  
      const [rows] = await db.query(`SELECT * FROM comments WHERE comment_id = ? AND is_deleted = FALSE`, [commentId]);
      const comment = (rows as any[])[0];
  
      if (!comment) throw new CustomError('Comment not found', 404);
      if (comment.author_id !== userId) throw new CustomError('Unauthorized', 403);
  
      await db.query(`UPDATE comments SET is_deleted = TRUE WHERE comment_id = ?`, [commentId]);
  
      resTyped.sendSuccess(null, 'Comment deleted successfully');
    } catch (err) {
      next(err);
    }
  };