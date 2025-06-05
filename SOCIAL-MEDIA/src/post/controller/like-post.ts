import { Request, Response, NextFunction } from 'express';
import db from '../../utils/db';
import { CustomError } from '../../utils/custom-error';

interface AuthenticatedRequest extends Request {
  user?: { id: number }; // Changed to number to match authenticate middleware
}

interface ResponseWithSuccess extends Response {
  sendSuccess: (data: any, message?: string) => void;
}

export const likePost = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const resTyped = res as ResponseWithSuccess;
    try {
      const userId = req.user?.id;
      const { postId } = req.params;
  
      if (!userId) throw new CustomError('Unauthorized', 401);
  
      // Check if post exists and is not deleted
      const [postRows] = await db.query(
        `SELECT post_id FROM posts WHERE post_id = ? AND is_deleted = FALSE`,
        [postId]
      );
      if ((postRows as any[]).length === 0) {
        throw new CustomError('Post not found', 404);
      }
  
      // Check if already liked
      const [likeRows] = await db.query(
        `SELECT * FROM likes_posts WHERE user_id = ? AND post_id = ?`,
        [userId, postId]
      );
  
      if ((likeRows as any[]).length > 0) {
        // Unlike
        await db.query(
          `DELETE FROM likes_posts WHERE user_id = ? AND post_id = ?`,
          [userId, postId]
        );
        resTyped.sendSuccess(null, 'Post unliked successfully');
      } else {
        // Like
        await db.query(
          `INSERT INTO likes_posts (user_id, post_id) VALUES (?, ?)`,
  
          [userId, postId]
        );
        resTyped.sendSuccess(null, 'Post liked successfully');
      }
    } catch (err) {
      next(err);
    }
  };