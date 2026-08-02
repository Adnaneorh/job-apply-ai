import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.header('authorization');
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const payload = verifyToken(auth.substring(7));
    req.userId = String(payload.sub);
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
