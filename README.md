# job-apply-ai

AI-powered full-stack job application automation platform.

## Stack
- Frontend: React + TypeScript + Tailwind CSS + React Router + Axios
- Backend: Express + TypeScript + Prisma + JWT + OpenAI
- Database: PostgreSQL

## Features
- JWT signup/login/logout
- Profile setup + resume upload + work experience/skills
- Job listing with title/location/remote/salary filters
- One-click apply + application tracking with status badges
- AI endpoints for screening answers, resume tailoring, and cover letters
- Auto-apply service with form auto-fill payloads
- Connector seeding for LinkedIn/Indeed/Glassdoor jobs
- Theme customization (Blue, Purple, Green, Red)

## API endpoints
- `POST /api/auth/signup`, `/api/auth/login`, `/api/auth/logout`
- `GET /api/profile`, `PUT /api/profile`, `POST /api/profile/resume`
- `GET /api/jobs`, `POST /api/jobs/search`
- `GET /api/applications`, `POST /api/applications`
- `POST /api/ai/generate-answer`, `/api/ai/tailor-resume`, `/api/ai/cover-letter`
- `POST /api/auto-apply/start`

## Local setup
1. Copy env files:
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.example frontend/.env`
2. Install dependencies:
   - `npm install`
3. Generate Prisma client:
   - `npm run db:generate`
4. Run apps:
   - `npm run dev`

## Docker
```bash
docker compose up --build
```
