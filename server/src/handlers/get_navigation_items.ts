import { db } from '../db';
import { navigationItemsTable } from '../db/schema';
import { type NavigationItem } from '../schema';
import { asc, eq } from 'drizzle-orm';

export async function getNavigationItems(): Promise<NavigationItem[]> {
  try {
    const results = await db.select()
      .from(navigationItemsTable)
      .orderBy(asc(navigationItemsTable.order_index))
      .execute();

    return results;
  } catch (error) {
    console.error('Failed to fetch navigation items:', error);
    throw error;
  }
}

export async function getVisibleNavigationItems(): Promise<NavigationItem[]> {
  try {
    const results = await db.select()
      .from(navigationItemsTable)
      .where(eq(navigationItemsTable.is_visible, true))
      .orderBy(asc(navigationItemsTable.order_index))
      .execute();

    return results;
  } catch (error) {
    console.error('Failed to fetch visible navigation items:', error);
    throw error;
  }
}