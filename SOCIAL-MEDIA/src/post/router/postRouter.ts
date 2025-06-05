import express from 'express';
import { createPost } from '../controller/add-post';
import { editPost } from '../controller/update-post';
import { deletePost } from '../controller/delete-post';
import { likePost } from '../controller/like-post';    

import { authenticate } from '../../middleware/authenticate';
import { validate } from '../../middleware/validate';
import { createPostSchema, editPostSchema } from '../../middleware/validation-schemas';

const router = express.Router();

// Create a new post
router.post('/', authenticate, validate(createPostSchema), createPost);

// Edit a post (title & description only)
router.put('/:postId', authenticate, validate(editPostSchema), editPost);

// Soft delete a post
router.delete('/:postId', authenticate, deletePost);

// Like/Unlike a post
router.post('/:postId/like', authenticate, likePost);

export default router;
