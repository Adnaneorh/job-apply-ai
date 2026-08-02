# JobApply AI

Production-style full-stack job application automation platform (FastApply-like) with React dashboard, Express API, Prisma schema, AI helpers, and Docker setup.

## Tech Stack
- Frontend: React + TypeScript + Tailwind + Vite
- Backend: Node.js + Express + TypeScript + Prisma
- Database: PostgreSQL
- AI: OpenAI API (fallback mock behavior if key missing)

## Project Structure
- `frontend/` React dashboard app
- `backend/` Express API + Prisma schema
- `docker-compose.yml` postgres + backend + frontend

## Quick Start (Local)
1. Install dependencies
   - `cd backend && npm install`
   - `cd ../frontend && npm install`
2. Configure environment files
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.example frontend/.env`
3. Run backend
   - `cd backend && npm run dev`
4. Run frontend
   - `cd frontend && npm run dev`

## Docker
Run everything:

```bash
docker-compose up --build
```

Services:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health: http://localhost:5000/health

## Implemented API Endpoints
### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Profile
- `GET /api/profile`
- `PUT /api/profile`
- `POST /api/profile/resume`
- `GET /api/profile/experience`
- `POST /api/profile/experience`
- `PUT /api/profile/experience/:id`
- `DELETE /api/profile/experience/:id`

### Jobs
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs/search`
- `GET /api/jobs/matched`

### Applications
- `GET /api/applications`
- `POST /api/applications`
- `PUT /api/applications/:id`
- `DELETE /api/applications/:id`
- `GET /api/applications/stats`

### AI
- `POST /api/ai/generate-answer`
- `POST /api/ai/tailor-resume`
- `POST /api/ai/cover-letter`
- `POST /api/ai/match-score`

### Auto Apply
- `POST /api/auto-apply/start`
- `GET /api/auto-apply/status`
- `POST /api/auto-apply/stop`

## Notes
- Current implementation uses in-memory stores for app data services while preserving Prisma schema for migration to persistent DB.
- Theme customization supports Blue (default), Purple, Green, and Red with dark mode persistence.
