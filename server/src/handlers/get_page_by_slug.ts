import { db } from '../db';
import { pagesTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { type GetPageBySlugInput, type Page } from '../schema';

export async function getPageBySlug(input: GetPageBySlugInput): Promise<Page | null> {
  try {
    const result = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.slug, input.slug))
      .limit(1)
      .execute();

    if (result.length === 0) {
      return null;
    }

    // Return the first (and should be only) result
    return result[0];
  } catch (error) {
    console.error('Get page by slug failed:', error);
    throw error;
  }
}