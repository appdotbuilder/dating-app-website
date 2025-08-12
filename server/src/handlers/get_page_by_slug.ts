import { db } from '../db';
import { pagesTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { GetPageBySlugInput, Page } from '../schema';

export const getPageBySlug = async (input: GetPageBySlugInput): Promise<Page | null> => {
  try {
    const results = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.slug, input.slug))
      .execute();

    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Failed to get page by slug:', error);
    throw error;
  }
};