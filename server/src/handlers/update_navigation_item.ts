import { db } from '../db';
import { navigationItemsTable } from '../db/schema';
import { type UpdateNavigationItemInput, type NavigationItem } from '../schema';
import { eq } from 'drizzle-orm';

export const updateNavigationItem = async (input: UpdateNavigationItemInput): Promise<NavigationItem | null> => {
  try {
    // First, check if the navigation item exists
    const existingItems = await db.select()
      .from(navigationItemsTable)
      .where(eq(navigationItemsTable.id, input.id))
      .execute();

    if (existingItems.length === 0) {
      return null;
    }

    // Build update object with only provided fields
    const updateData: Record<string, any> = {
      updated_at: new Date()
    };

    if (input.label !== undefined) {
      updateData['label'] = input.label;
    }

    if (input.slug !== undefined) {
      updateData['slug'] = input.slug;
    }

    if (input.order_index !== undefined) {
      updateData['order_index'] = input.order_index;
    }

    if (input.is_visible !== undefined) {
      updateData['is_visible'] = input.is_visible;
    }

    // Update the navigation item
    const result = await db.update(navigationItemsTable)
      .set(updateData)
      .where(eq(navigationItemsTable.id, input.id))
      .returning()
      .execute();

    return result[0];
  } catch (error) {
    console.error('Navigation item update failed:', error);
    throw error;
  }
};