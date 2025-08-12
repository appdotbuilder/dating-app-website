import { db } from '../db';
import { pagesTable } from '../db/schema';
import { type GetPageByIdInput, type Page } from '../schema';
import { eq } from 'drizzle-orm';

export const getPageById = async (input: GetPageByIdInput): Promise<Page | null> => {
  try {
    const result = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.id, input.id))
      .execute();

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    console.error('Failed to get page by ID:', error);
    throw error;
  }
};