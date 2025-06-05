import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { CustomError } from '../utils/custom-error';

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization?.startsWith('Bearer ')) {
      throw new CustomError('Authorization token missing', 401);
    }

    const token = req.headers.authorization.split(' ')[1];
    const payload = verifyToken(token);

    if (!payload || typeof payload !== 'object' || !('id' in payload)) {
      throw new CustomError('Invalid token payload', 401);
    }

    const userId = Number(payload.id);
    if (isNaN(userId)) {
      throw new CustomError('Invalid user ID in token', 401);
    }

    req.user = { id: userId };
    next();
  } catch (err) {
    next(err);
  }
};
