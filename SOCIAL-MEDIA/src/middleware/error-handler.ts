import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/custom-error';
import AWS from 'aws-sdk';
import { MulterError } from 'multer';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error details:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    code: err.code
  });

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ 
      statusCode: err.statusCode,
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  // Handle AWS errors
  if (err && typeof err === 'object' && 'code' in err && err.code?.startsWith('AWS')) {
    console.error('AWS Error:', {
      code: err.code,
      message: err.message,
      region: AWS.config.region
    });
    return res.status(500).json({ 
      statusCode: 500,
      error: 'AWS Service Error',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }

  // Handle Multer errors
  if (err instanceof MulterError) {
    const statusCode = 400;
    return res.status(statusCode).json({ 
      statusCode,
      error: err.message,
      field: err.field,
      code: err.code
    });
  }

  // Handle Joi validation errors
  if (err.isJoi) {
    const statusCode = 400;
    return res.status(statusCode).json({ 
      statusCode,
      error: err.details[0].message 
    });
  }

  // Handle other errors
  const statusCode = 500;
  res.status(statusCode).json({ 
    statusCode,
    error: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};
