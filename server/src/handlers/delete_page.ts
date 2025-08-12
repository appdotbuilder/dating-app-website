import { db } from '../db';
import { pagesTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { GetPageByIdInput } from '../schema';

export const deletePage = async (input: GetPageByIdInput): Promise<boolean> => {
  try {
    const result = await db.delete(pagesTable)
      .where(eq(pagesTable.id, input.id))
      .returning()
      .execute();

    return result.length > 0;
  } catch (error) {
    console.error('Page deletion failed:', error);
    throw error;
  }
};