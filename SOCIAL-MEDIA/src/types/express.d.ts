// src/types/express.d.ts
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: number;
      username?: string;
    };
  }
}

export {};
