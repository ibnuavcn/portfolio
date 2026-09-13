import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/auth.js';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Attach user and session to request for downstream use
    (req as any).user = session.user;
    (req as any).session = session.session;
    
    next();
  } catch (error) {
    next(error);
  }
};
