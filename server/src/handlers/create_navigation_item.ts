import { db } from '../db';
import { navigationItemsTable, pagesTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { CreateNavigationItemInput, NavigationItem } from '../schema';

export const createNavigationItem = async (input: CreateNavigationItemInput): Promise<NavigationItem> => {
  try {
    // Check if the referenced page exists
    const pageExists = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.slug, input.slug))
      .execute();

    if (pageExists.length === 0) {
      throw new Error(`Page with slug '${input.slug}' does not exist`);
    }

    const result = await db.insert(navigationItemsTable)
      .values({
        label: input.label,
        slug: input.slug,
        order_index: input.order_index,
        is_visible: input.is_visible
      })
      .returning()
      .execute();

    return result[0];
  } catch (error) {
    console.error('Navigation item creation failed:', error);
    throw error;
  }
};