import { Request, Response, NextFunction } from 'express';
import db from '../../utils/db';
import { hashPassword } from '../../utils/crypt-password';
import { CustomError } from '../../utils/custom-error';

const CHECK_EXISTING_USER_QUERY = `
  SELECT user_id FROM users WHERE username = ? OR email = ?
`;

const INSERT_USER_QUERY = `
  INSERT INTO users (username, first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?, ?)
`;

const INSERT_CREDENTIALS_QUERY = `
  INSERT INTO user_credentials (username, user_password) VALUES (?, ?)
`;

export const signupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, first_name, last_name, email, phone, password } = req.body;

    const [existing] = await db.query(CHECK_EXISTING_USER_QUERY, [username, email]);
    if ((existing as any[]).length > 0) {
      throw new CustomError('Username or Email already exists', 409);
    }

    await db.query(INSERT_USER_QUERY, [username, first_name, last_name, email, phone]);

    const hashedPassword = await hashPassword(password);

    await db.query(INSERT_CREDENTIALS_QUERY, [username, hashedPassword]);

    res.status(201).json({ message: 'User created successfully', username });
  } catch (err) {
    next(err);
  }
};
