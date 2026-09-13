import { Router, Request, Response } from 'express';
import { auth } from '../../config/auth.js';
import { toNodeHandler } from 'better-auth/node';

const router = Router();

// Pass all /api/auth routes to better-auth handler
router.all('/*', (req: Request, res: Response) => {
  // better-auth toNodeHandler handles Express req/res
  const handler = toNodeHandler(auth.handler);
  return handler(req, res);
});

export default router;
