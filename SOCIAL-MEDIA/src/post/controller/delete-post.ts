import { Request, Response, NextFunction } from 'express';
import db from '../../utils/db';
import { CustomError } from '../../utils/custom-error';

interface AuthenticatedRequest extends Request {
  user?: { id: number }; // Changed to number to match authenticate middleware
}

interface ResponseWithSuccess extends Response {
  sendSuccess: (data: any, message?: string) => void;
}

export const deletePost = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const resTyped = res as ResponseWithSuccess;
    try {
      const userId = req.user?.id;
      const { postId } = req.params;
  
      if (!userId) throw new CustomError('Unauthorized', 401);
  
      const [rows] = await db.query(
        `SELECT * FROM posts WHERE post_id = ? AND is_deleted = FALSE`,
        [postId]
      );
      const post = (rows as any[])[0];
  
      if (!post) throw new CustomError('Post not found', 404);
      if (post.author_id !== userId) throw new CustomError('Unauthorized to delete this post', 403);
  
      await db.query(
        `UPDATE posts SET is_deleted = TRUE, updated_on = CURRENT_TIMESTAMP WHERE post_id = ?`,
        [postId]
      );
  
      resTyped.sendSuccess(null, 'Post deleted successfully');
    } catch (err) {
      next(err);
    }
  };