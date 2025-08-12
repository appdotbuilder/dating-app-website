import { db } from '../db';
import { navigationItemsTable } from '../db/schema';
import { type GetPageByIdInput } from '../schema';
import { eq, gt, sql } from 'drizzle-orm';

export const deleteNavigationItem = async (input: GetPageByIdInput): Promise<boolean> => {
  try {
    // First get the navigation item to check if it exists and get its order_index
    const existingItems = await db.select()
      .from(navigationItemsTable)
      .where(eq(navigationItemsTable.id, input.id))
      .execute();

    if (existingItems.length === 0) {
      return false; // Item not found
    }

    const deletedItem = existingItems[0];

    // Delete the navigation item
    const result = await db.delete(navigationItemsTable)
      .where(eq(navigationItemsTable.id, input.id))
      .returning()
      .execute();

    if (result.length === 0) {
      return false; // Deletion failed
    }

    // Reorder remaining items - decrement order_index for items that came after the deleted item
    await db.update(navigationItemsTable)
      .set({
        order_index: sql`order_index - 1`,
        updated_at: new Date()
      })
      .where(gt(navigationItemsTable.order_index, deletedItem.order_index))
      .execute();

    return true;
  } catch (error) {
    console.error('Navigation item deletion failed:', error);
    throw error;
  }
};