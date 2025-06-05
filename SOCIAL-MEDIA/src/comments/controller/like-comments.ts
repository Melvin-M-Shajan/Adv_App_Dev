import { Request, Response, NextFunction } from 'express';
import db from '../../utils/db';


interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

interface ResponseWithSuccess extends Response {
  sendSuccess: (data: any, message?: string) => void;
}

export const likeComment = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const resTyped = res as ResponseWithSuccess;
    try {
      const userId = req.user?.id;
      const { commentId } = req.params;
  
      const [likes] = await db.query(
        `SELECT * FROM likes_comments WHERE user_id = ? AND comment_id = ?`,
        [userId, commentId]
      );
  
      if ((likes as any[]).length > 0) {
        await db.query(`DELETE FROM likes_comments WHERE user_id = ? AND comment_id = ?`, [userId, commentId]);
        resTyped.sendSuccess(null, 'Comment unliked');
      } else {
        await db.query(`INSERT INTO likes_comments (user_id, comment_id) VALUES (?, ?)`, [userId, commentId]);
        resTyped.sendSuccess(null, 'Comment liked');
      }
    } catch (err) {
      next(err);
    }
  };