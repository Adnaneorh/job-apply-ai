import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT || 4000),
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads'
};
