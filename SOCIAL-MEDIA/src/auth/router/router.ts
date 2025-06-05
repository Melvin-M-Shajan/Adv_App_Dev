import { Router } from 'express';
import { signupController } from '../controller/sign-up';
import { loginController } from '../controller/login';
import { validate } from '../../middleware/validate';
import { signupSchema, loginSchema } from '../../middleware/validation-schemas';

const router = Router();

router.post('/signup', validate(signupSchema), signupController);
router.post('/login', validate(loginSchema), loginController);

export default router;
