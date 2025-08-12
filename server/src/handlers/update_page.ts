import { db } from '../db';
import { pagesTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { UpdatePageInput, Page } from '../schema';

export const updatePage = async (input: UpdatePageInput): Promise<Page | null> => {
  try {
    const updateData: Partial<typeof pagesTable.$inferInsert> = {
      updated_at: new Date()
    };

    if (input.slug !== undefined) updateData.slug = input.slug;
    if (input.title !== undefined) updateData.title = input.title;
    if (input.content !== undefined) updateData.content = input.content;
    if (input.meta_description !== undefined) updateData.meta_description = input.meta_description;
    if (input.meta_keywords !== undefined) updateData.meta_keywords = input.meta_keywords;
    if (input.is_published !== undefined) updateData.is_published = input.is_published;

    const result = await db.update(pagesTable)
      .set(updateData)
      .where(eq(pagesTable.id, input.id))
      .returning()
      .execute();

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Page update failed:', error);
    throw error;
  }
};