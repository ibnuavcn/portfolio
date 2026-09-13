import { eq } from 'drizzle-orm';
import { db } from '../../config/db.js';
import { projects, projectTags } from '../../db/schema.js';

export class ProjectsService {
  async getAll(publishedOnly = true) {
    let query = db.select().from(projects);
    if (publishedOnly) {
      // @ts-ignore
      query = query.where(eq(projects.isPublished, true));
    }
    return await query;
  }

  async getBySlug(slug: string) {
    const result = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    return result[0];
  }

  async create(data: any) {
    const result = await db.insert(projects).values(data).returning();
    return result[0];
  }

  async update(id: string, data: any) {
    const result = await db.update(projects).set({ ...data, updatedAt: new Date() }).where(eq(projects.id, id)).returning();
    return result[0];
  }

  async delete(id: string) {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result[0];
  }
}

export const projectsService = new ProjectsService();
