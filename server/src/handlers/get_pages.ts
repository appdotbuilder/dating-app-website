import { db } from '../db';
import { pagesTable } from '../db/schema';
import { type Page } from '../schema';
import { eq, desc } from 'drizzle-orm';

export async function getPages(): Promise<Page[]> {
  try {
    // Fetch all pages (both published and unpublished) for admin use
    // Order by creation date descending to show newest first
    const results = await db.select()
      .from(pagesTable)
      .orderBy(desc(pagesTable.created_at))
      .execute();

    // Return results as-is since no numeric columns need conversion
    return results;
  } catch (error) {
    console.error('Failed to fetch pages:', error);
    throw error;
  }
}

export async function getPublishedPages(): Promise<Page[]> {
  try {
    // Fetch only published pages for public-facing website content
    // Order by creation date descending to show newest first
    const results = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.is_published, true))
      .orderBy(desc(pagesTable.created_at))
      .execute();

    // Return results as-is since no numeric columns need conversion
    return results;
  } catch (error) {
    console.error('Failed to fetch published pages:', error);
    throw error;
  }
}