import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.js';

declare module 'express-serve-static-core' {
  interface Request {
    user?: { userId: string; email: string };
  }
}

export function authRequired(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing token' });

  try {
    req.user = verifyToken(header.slice(7));
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
