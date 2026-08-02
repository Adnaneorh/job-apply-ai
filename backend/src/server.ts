import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { authRouter } from './routes/auth';
import { jobsRouter } from './routes/jobs';
import { applicationsRouter } from './routes/applications';
import { profileRouter } from './routes/profile';
import { aiRouter } from './routes/ai';
import { autoApplyRouter } from './routes/autoApply';
import { errorHandler } from './middleware/errorHandler';
import { apiRateLimiter } from './middleware/rateLimit';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use('/api', apiRateLimiter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/ai', aiRouter);
app.use('/api/auto-apply', autoApplyRouter);

app.use(errorHandler);

app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend API running on http://localhost:${env.PORT}`);
});
