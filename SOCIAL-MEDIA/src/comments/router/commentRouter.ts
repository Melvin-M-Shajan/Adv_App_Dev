import express from 'express';

import { addComment } from '../controller/post-comment';
import { likeComment } from '../controller/like-comments';
import { editComment } from '../controller/edit-comments';
import { deleteComment } from '../controller/delete-comments';
import { authenticate } from '../../middleware/authenticate';

const router = express.Router();

// Add a comment to a post
router.post('/posts/:postId/comments', authenticate, addComment);

// Edit a comment
router.put('/comments/:commentId', authenticate, editComment);

// Delete a comment (soft delete)
router.delete('/comments/:commentId', authenticate, deleteComment);

// Like/Unlike a comment
router.post('/comments/:commentId/like', authenticate, likeComment);

export default router;
