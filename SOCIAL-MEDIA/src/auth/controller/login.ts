import { Request, Response, NextFunction } from 'express';
import db from '../../utils/db';
import { comparePassword } from '../../utils/crypt-password';
import { generateToken } from '../../utils/jwt';
import { CustomError } from '../../utils/custom-error';

const LOGIN_QUERY = `
  SELECT uc.user_password, u.user_id 
  FROM user_credentials uc 
  JOIN users u ON uc.username = u.username 
  WHERE uc.username = ?
`;

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const [rows] = await db.query(LOGIN_QUERY, [username]);
    const user = (rows as any[])[0];
    if (!user) throw new CustomError('Invalid credentials', 401);

    const isValid = await comparePassword(password, user.user_password);
    if (!isValid) throw new CustomError('Invalid credentials', 401);

    const token = generateToken({ id: user.user_id });

    res.sendSuccess!({ token }, 'Login successful');
  } catch (err) {
    next(err);
  }
};
