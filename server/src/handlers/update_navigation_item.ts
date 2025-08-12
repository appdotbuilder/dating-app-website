import { db } from '../db';
import { navigationItemsTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { UpdateNavigationItemInput, NavigationItem } from '../schema';

export const updateNavigationItem = async (input: UpdateNavigationItemInput): Promise<NavigationItem | null> => {
  try {
    const updateData: Partial<typeof navigationItemsTable.$inferInsert> = {
      updated_at: new Date()
    };

    if (input.label !== undefined) updateData.label = input.label;
    if (input.slug !== undefined) updateData.slug = input.slug;
    if (input.order_index !== undefined) updateData.order_index = input.order_index;
    if (input.is_visible !== undefined) updateData.is_visible = input.is_visible;

    const result = await db.update(navigationItemsTable)
      .set(updateData)
      .where(eq(navigationItemsTable.id, input.id))
      .returning()
      .execute();

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Navigation item update failed:', error);
    throw error;
  }
};