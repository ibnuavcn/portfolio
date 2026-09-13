import { Router, Request, Response, NextFunction } from 'express';
import { eq, desc } from 'drizzle-orm';
import { db } from '../../config/db.js';
import { messages } from '../../db/schema.js';
import { requireAuth } from '../../middlewares/auth.js';

// Service
class MessagesService {
  async getAll() {
    return await db.select().from(messages).orderBy(desc(messages.createdAt));
  }
  async create(data: any) {
    const result = await db.insert(messages).values(data).returning();
    return result[0];
  }
  async markAsRead(id: string) {
    const result = await db.update(messages).set({ isRead: true }).where(eq(messages.id, id)).returning();
    return result[0];
  }
  async delete(id: string) {
    const result = await db.delete(messages).where(eq(messages.id, id)).returning();
    return result[0];
  }
}
const messagesService = new MessagesService();

// Controller
class MessagesController {
  async getMessages(req: Request, res: Response, next: NextFunction) {
    try { res.json(await messagesService.getAll()); } catch (error) { next(error); }
  }
  async createMessage(req: Request, res: Response, next: NextFunction) {
    try { res.status(201).json(await messagesService.create(req.body)); } catch (error) { next(error); }
  }
  async markRead(req: Request, res: Response, next: NextFunction) {
    try { res.json(await messagesService.markAsRead(req.params.id)); } catch (error) { next(error); }
  }
  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      await messagesService.delete(req.params.id);
      res.json({ success: true });
    } catch (error) { next(error); }
  }
}
const messagesController = new MessagesController();

// Routes
const router = Router();
router.post('/', messagesController.createMessage);
router.get('/admin', requireAuth, messagesController.getMessages);
router.patch('/admin/:id/read', requireAuth, messagesController.markRead);
router.delete('/admin/:id', requireAuth, messagesController.deleteMessage);

export default router;
