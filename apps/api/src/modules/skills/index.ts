import { Router, Request, Response, NextFunction } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../../config/db.js';
import { skills } from '../../db/schema.js';
import { requireAuth } from '../../middlewares/auth.js';

// Service
class SkillsService {
  async getAll() {
    return await db.select().from(skills).orderBy(skills.displayOrder);
  }
  async create(data: any) {
    const result = await db.insert(skills).values(data).returning();
    return result[0];
  }
  async update(id: string, data: any) {
    const result = await db.update(skills).set(data).where(eq(skills.id, id)).returning();
    return result[0];
  }
  async delete(id: string) {
    const result = await db.delete(skills).where(eq(skills.id, id)).returning();
    return result[0];
  }
}
const skillsService = new SkillsService();

// Controller
class SkillsController {
  async getSkills(req: Request, res: Response, next: NextFunction) {
    try { res.json(await skillsService.getAll()); } catch (error) { next(error); }
  }
  async createSkill(req: Request, res: Response, next: NextFunction) {
    try { res.status(201).json(await skillsService.create(req.body)); } catch (error) { next(error); }
  }
  async updateSkill(req: Request, res: Response, next: NextFunction) {
    try { res.json(await skillsService.update(req.params.id, req.body)); } catch (error) { next(error); }
  }
  async deleteSkill(req: Request, res: Response, next: NextFunction) {
    try {
      await skillsService.delete(req.params.id);
      res.json({ success: true });
    } catch (error) { next(error); }
  }
}
const skillsController = new SkillsController();

// Routes
const router = Router();
router.get('/', skillsController.getSkills);
router.post('/admin', requireAuth, skillsController.createSkill);
router.put('/admin/:id', requireAuth, skillsController.updateSkill);
router.delete('/admin/:id', requireAuth, skillsController.deleteSkill);

export default router;
