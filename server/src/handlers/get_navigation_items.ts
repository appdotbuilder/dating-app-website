import { db } from '../db';
import { navigationItemsTable } from '../db/schema';
import { asc, eq } from 'drizzle-orm';
import type { NavigationItem } from '../schema';

export const getNavigationItems = async (): Promise<NavigationItem[]> => {
  try {
    const results = await db.select()
      .from(navigationItemsTable)
      .orderBy(asc(navigationItemsTable.order_index))
      .execute();

    return results;
  } catch (error) {
    console.error('Failed to get navigation items:', error);
    throw error;
  }
};

export const getVisibleNavigationItems = async (): Promise<NavigationItem[]> => {
  try {
    const results = await db.select()
      .from(navigationItemsTable)
      .where(eq(navigationItemsTable.is_visible, true))
      .orderBy(asc(navigationItemsTable.order_index))
      .execute();

    return results;
  } catch (error) {
    console.error('Failed to get visible navigation items:', error);
    throw error;
  }
};