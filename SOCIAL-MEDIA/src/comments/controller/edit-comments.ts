import { Request, Response, NextFunction } from 'express';
import db from '../../utils/db';
import { CustomError } from '../../utils/custom-error';

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

interface ResponseWithSuccess extends Response {
  sendSuccess: (data: any, message?: string) => void;
}

export const editComment = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const resTyped = res as ResponseWithSuccess;
    try {
      const userId = req.user?.id;
      const { commentId } = req.params;
      const { content } = req.body;
  
      const [rows] = await db.query(`SELECT * FROM comments WHERE comment_id = ? AND is_deleted = FALSE`, [commentId]);
      const comment = (rows as any[])[0];
  
      if (!comment) throw new CustomError('Comment not found', 404);
      if (comment.author_id !== userId) throw new CustomError('Unauthorized', 403);
  
      await db.query(
        `UPDATE comments SET content = ?, is_edited = TRUE WHERE comment_id = ?`,
        [content ?? comment.content, commentId]
      );
  
      resTyped.sendSuccess(null, 'Comment updated successfully');
    } catch (err) {
      next(err);
    }
  };
  