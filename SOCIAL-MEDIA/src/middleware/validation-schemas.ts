import Joi from 'joi';

// Signup validation schema
export const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  first_name: Joi.string().min(1).max(25).required(),
  last_name: Joi.string().min(1).max(25).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\d{10,12}$/).required(),
  password: Joi.string().min(6).required(),
});

// Login validation schema
export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// User profile update schema
export const updateProfileSchema = Joi.object({
  first_name: Joi.string().min(1).max(25).optional(),
  last_name: Joi.string().min(1).max(25).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(/^\d{10,12}$/).optional(),
  username: Joi.string().alphanum().min(3).max(30).optional(),
});

// Create post schema
export const createPostSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().required(),
  image_url: Joi.string().uri().optional().allow(null, '')
});

// Edit post schema
export const editPostSchema = Joi.object({
  title: Joi.string().min(1).max(255).optional(),
  description: Joi.string().optional()
}).min(1); // At least one field must be provided

// Search schema
export const searchSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required()
});
