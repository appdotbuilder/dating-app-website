import { db } from '../db';
import { pagesTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { type GetPageByIdInput } from '../schema';

export async function deletePage(input: GetPageByIdInput): Promise<boolean> {
  try {
    // Perform hard delete - remove the page from database
    const result = await db.delete(pagesTable)
      .where(eq(pagesTable.id, input.id))
      .execute();

    // Check if any rows were affected (deleted)
    // result.rowCount will be 1 if page was found and deleted, 0 if not found, or null in some cases
    return (result.rowCount ?? 0) > 0;
  } catch (error) {
    console.error('Page deletion failed:', error);
    throw error;
  }
}