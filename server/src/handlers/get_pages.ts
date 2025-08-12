import { db } from '../db';
import { pagesTable } from '../db/schema';
import { desc, eq } from 'drizzle-orm';
import type { Page } from '../schema';

export const getPages = async (): Promise<Page[]> => {
  try {
    const results = await db.select()
      .from(pagesTable)
      .orderBy(desc(pagesTable.created_at))
      .execute();

    return results;
  } catch (error) {
    console.error('Failed to get pages:', error);
    throw error;
  }
};

export const getPublishedPages = async (): Promise<Page[]> => {
  try {
    const results = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.is_published, true))
      .orderBy(desc(pagesTable.created_at))
      .execute();

    return results;
  } catch (error) {
    console.error('Failed to get published pages:', error);
    throw error;
  }
};