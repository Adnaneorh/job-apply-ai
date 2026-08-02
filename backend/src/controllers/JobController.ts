import type { Request, Response } from 'express';
import { JobService } from '../services/JobService';

const jobs = new JobService();

export class JobController {
  list(req: Request, res: Response) {
    const remote = req.query.remote === 'true' ? true : undefined;
    const salary = req.query.salary ? Number(req.query.salary) : undefined;
    return res.json({
      jobs: jobs.list({
        title: req.query.title ? String(req.query.title) : undefined,
        location: req.query.location ? String(req.query.location) : undefined,
        remote,
        salary
      })
    });
  }

  getById(req: Request, res: Response) {
    const job = jobs.getById(String(req.params.id));
    if (!job) return res.status(404).json({ error: 'Job not found' });
    return res.json({ job });
  }

  search(req: Request, res: Response) {
    return res.json({ jobs: jobs.list(req.body || {}) });
  }

  matched(_req: Request, res: Response) {
    return res.json({ jobs: jobs.matched() });
  }
}
