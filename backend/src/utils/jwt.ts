import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export type AuthPayload = { userId: string; email: string };

export const signToken = (payload: AuthPayload) => jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });

export const verifyToken = (token: string): AuthPayload => jwt.verify(token, env.JWT_SECRET) as AuthPayload;
