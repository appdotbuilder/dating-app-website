import { db } from '../db';
import { navigationItemsTable } from '../db/schema';
import { eq, gt, sql } from 'drizzle-orm';
import type { GetPageByIdInput } from '../schema';

export const deleteNavigationItem = async (input: GetPageByIdInput): Promise<boolean> => {
  try {
    // First, get the item to be deleted to know its order_index
    const itemToDelete = await db.select()
      .from(navigationItemsTable)
      .where(eq(navigationItemsTable.id, input.id))
      .execute();

    if (itemToDelete.length === 0) {
      return false;
    }

    const deletedOrderIndex = itemToDelete[0].order_index;

    // Delete the item
    const result = await db.delete(navigationItemsTable)
      .where(eq(navigationItemsTable.id, input.id))
      .returning()
      .execute();

    if (result.length === 0) {
      return false;
    }

    // Reorder remaining items: decrement order_index for items that came after the deleted one
    await db.update(navigationItemsTable)
      .set({ 
        order_index: sql`${navigationItemsTable.order_index} - 1`,
        updated_at: new Date()
      })
      .where(gt(navigationItemsTable.order_index, deletedOrderIndex))
      .execute();

    return true;
  } catch (error) {
    console.error('Navigation item deletion failed:', error);
    throw error;
  }
};