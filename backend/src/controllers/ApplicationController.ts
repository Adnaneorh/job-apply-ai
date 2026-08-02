import type { Request, Response } from 'express';
import { ApplicationService } from '../services/ApplicationService';

const applications = new ApplicationService();

export class ApplicationController {
  list(req: Request, res: Response) {
    return res.json({ applications: applications.listByUser(req.userId!) });
  }

  create(req: Request, res: Response) {
    const { jobId, notes } = req.body;
    const app = applications.create(req.userId!, jobId, notes);
    return res.status(201).json({ application: app });
  }

  update(req: Request, res: Response) {
    const { status, notes } = req.body;
    const app = applications.updateStatus(req.userId!, String(req.params.id), status, notes);
    return res.json({ application: app });
  }

  delete(req: Request, res: Response) {
    applications.delete(req.userId!, String(req.params.id));
    return res.status(204).send();
  }

  stats(req: Request, res: Response) {
    return res.json({ stats: applications.stats(req.userId!) });
  }
}
