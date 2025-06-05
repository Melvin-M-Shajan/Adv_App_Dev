import express from 'express';
import multer from 'multer';
import {getMyProfile} from '../controller/view-me';
import {updateProfile} from '../controller/update-user';
import {searchUsers} from '../controller/search-username';
import {getUserProfile} from '../controller/view-profile';
import {getProfilePicture} from '../controller/view-pic';

import { authenticate } from '../../middleware/authenticate';
import { validate } from '../../middleware/validate';
import { updateProfileSchema, searchSchema } from '../../middleware/validation-schemas';

const router = express.Router();

// Configure Multer with proper error handling
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed') as any);
    }
  }
});

// Helper to handle multer errors and maintain consistent response format
const handleMulterUpload = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  upload.single('profilePic')(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        statusCode: 400,
        error: err.code === 'LIMIT_FILE_SIZE' 
          ? 'File size cannot exceed 5MB'
          : err.message
      });
    } 
    if (err) {
      return res.status(400).json({
        statusCode: 400,
        error: err.message
      });
    }
    next();
  });
};

// Protected routes that require authentication
router.use(authenticate);

// View own profile
router.get('/me', getMyProfile);

// Update profile
router.put('/me', validate(updateProfileSchema), updateProfile);


// Public routes that don't require authentication
router.get('/search', validate(searchSchema), searchUsers);
router.get('/:username', getUserProfile);
router.get('/:username/profile-pic', getProfilePicture);

export default router;
