import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET ?? 'your-secret-key';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
