import { db } from '../db';
import { navigationItemsTable, pagesTable } from '../db/schema';
import { type CreateNavigationItemInput, type NavigationItem } from '../schema';
import { eq } from 'drizzle-orm';

export const createNavigationItem = async (input: CreateNavigationItemInput): Promise<NavigationItem> => {
  try {
    // Validate that the referenced page slug exists
    const existingPages = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.slug, input.slug))
      .execute();

    if (existingPages.length === 0) {
      throw new Error(`Page with slug '${input.slug}' does not exist`);
    }

    // Insert navigation item record
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