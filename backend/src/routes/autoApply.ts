import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { FormAutoFiller } from '../services/FormAutoFiller';
import { JobBoardConnector } from '../services/JobBoardConnector';

const connector = new JobBoardConnector();
const filler = new FormAutoFiller();
let running = false;

export const autoApplyRouter = Router();
autoApplyRouter.use(authMiddleware);

autoApplyRouter.post('/start', async (_req, res) => {
  running = true;
  const [linkedIn, indeed, glassdoor] = await Promise.all([
    connector.syncLinkedIn(),
    connector.syncIndeed(),
    connector.syncGlassdoor()
  ]);
  return res.json({ running, connectors: [linkedIn, indeed, glassdoor] });
});

autoApplyRouter.get('/status', (_req, res) => {
  return res.json({ running });
});

autoApplyRouter.post('/stop', (_req, res) => {
  running = false;
  return res.json({ running });
});

autoApplyRouter.post('/autofill', (req, res) => {
  const fields = filler.detectFields(req.body.formHtml || '');
  const values = filler.autoFill(req.body.formData || {}, req.body.profileData || {});
  return res.json({ fields, values });
});
