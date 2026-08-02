import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 5000),
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://localhost:5432/jobapply',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000'
};
