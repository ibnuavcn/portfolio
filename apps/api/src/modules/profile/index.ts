import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../../config/db.js';
import { profile } from '../../db/schema.js';
import { requireAuth } from '../../middlewares/auth.js';

// Service
class ProfileService {
  async get() {
    const result = await db.select().from(profile).limit(1);
    return result[0] || null;
  }
  async update(data: any) {
    const existing = await this.get();
    if (existing) {
      const result = await db.update(profile).set({ ...data, updatedAt: new Date() }).returning();
      return result[0];
    } else {
      const result = await db.insert(profile).values(data).returning();
      return result[0];
    }
  }
}
const profileService = new ProfileService();

// Controller
class ProfileController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await profileService.get();
      res.json(data || {});
    } catch (error) { next(error); }
  }
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await profileService.update(req.body);
      res.json(data);
    } catch (error) { next(error); }
  }
}
const profileController = new ProfileController();

// Routes
const router = Router();
router.get('/', profileController.getProfile);
router.put('/admin', requireAuth, profileController.updateProfile);

export default router;
