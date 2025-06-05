import { Response, Request, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Response {
    sendSuccess?: (data: any, message?: string) => void;
    sendError?: (message?: string, statusCode?: number) => void;
  }
}

export const responseStructure = (req: Request, res: Response, next: NextFunction) => {
  res.sendSuccess = (data: any, message = 'Success') => {
    res.status(200).json({ success: true, message, data });
  };

  res.sendError = (message = 'Error', statusCode = 400) => {
    res.status(statusCode).json({ success: false, message });
  };

  next();
};
