import { Router } from 'express';
import { projectsController } from './projects.controller.js';
import { requireAuth } from '../../middlewares/auth.js';

const router = Router();

// Public routes
router.get('/', projectsController.getPublicProjects);
router.get('/:slug', projectsController.getProjectBySlug);

// Protected routes (Admin)
router.get('/admin/all', requireAuth, projectsController.getAdminProjects);
router.post('/admin', requireAuth, projectsController.createProject);
router.put('/admin/:id', requireAuth, projectsController.updateProject);
router.delete('/admin/:id', requireAuth, projectsController.deleteProject);

export default router;
