import { db } from '../db';
import { pagesTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { GetPageByIdInput, Page } from '../schema';

export const getPageById = async (input: GetPageByIdInput): Promise<Page | null> => {
  try {
    const results = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.id, input.id))
      .execute();

    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Failed to get page by ID:', error);
    throw error;
  }
};