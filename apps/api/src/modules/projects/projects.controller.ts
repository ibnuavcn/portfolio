import { Request, Response, NextFunction } from 'express';
import { projectsService } from './projects.service.js';

export class ProjectsController {
  async getPublicProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await projectsService.getAll(true);
      res.json(projects);
    } catch (error) {
      next(error);
    }
  }

  async getProjectBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const project = await projectsService.getBySlug(slug);
      if (!project) return res.status(404).json({ error: 'Project not found' });
      res.json(project);
    } catch (error) {
      next(error);
    }
  }

  async getAdminProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await projectsService.getAll(false);
      res.json(projects);
    } catch (error) {
      next(error);
    }
  }

  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectsService.create(req.body);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }

  async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const project = await projectsService.update(id, req.body);
      if (!project) return res.status(404).json({ error: 'Project not found' });
      res.json(project);
    } catch (error) {
      next(error);
    }
  }

  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const project = await projectsService.delete(id);
      if (!project) return res.status(404).json({ error: 'Project not found' });
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

export const projectsController = new ProjectsController();
