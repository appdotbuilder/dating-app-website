import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { navigationItemsTable, pagesTable } from '../db/schema';
import { type GetPageByIdInput, type CreateNavigationItemInput } from '../schema';
import { deleteNavigationItem } from '../handlers/delete_navigation_item';
import { eq } from 'drizzle-orm';

const testPageData = {
  slug: 'test-page',
  title: 'Test Page',
  content: '<p>Test content</p>',
  meta_description: null,
  meta_keywords: null,
  is_published: true
};

const createTestPage = async () => {
  const result = await db.insert(pagesTable)
    .values(testPageData)
    .returning()
    .execute();
  return result[0];
};

const createNavigationItem = async (data: CreateNavigationItemInput) => {
  const result = await db.insert(navigationItemsTable)
    .values({
      label: data.label,
      slug: data.slug,
      order_index: data.order_index,
      is_visible: data.is_visible
    })
    .returning()
    .execute();
  return result[0];
};

describe('deleteNavigationItem', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should delete a navigation item successfully', async () => {
    // Create prerequisite page and navigation item
    const page = await createTestPage();
    const navItem = await createNavigationItem({
      label: 'Test Nav',
      slug: page.slug,
      order_index: 0,
      is_visible: true
    });

    const input: GetPageByIdInput = { id: navItem.id };
    const result = await deleteNavigationItem(input);

    expect(result).toBe(true);

    // Verify item is deleted from database
    const deletedItems = await db.select()
      .from(navigationItemsTable)
      .where(eq(navigationItemsTable.id, navItem.id))
      .execute();

    expect(deletedItems).toHaveLength(0);
  });

  it('should return false when navigation item does not exist', async () => {
    const input: GetPageByIdInput = { id: 999 };
    const result = await deleteNavigationItem(input);

    expect(result).toBe(false);
  });

  it('should reorder remaining items after deletion', async () => {
    // Create prerequisite page
    const page = await createTestPage();

    // Create multiple navigation items with different order indexes
    const navItem1 = await createNavigationItem({
      label: 'First Nav',
      slug: page.slug,
      order_index: 0,
      is_visible: true
    });

    const navItem2 = await createNavigationItem({
      label: 'Second Nav',
      slug: page.slug,
      order_index: 1,
      is_visible: true
    });

    const navItem3 = await createNavigationItem({
      label: 'Third Nav',
      slug: page.slug,
      order_index: 2,
      is_visible: true
    });

    // Delete the middle item (order_index: 1)
    const input: GetPageByIdInput = { id: navItem2.id };
    const result = await deleteNavigationItem(input);

    expect(result).toBe(true);

    // Check that remaining items are reordered correctly
    const remainingItems = await db.select()
      .from(navigationItemsTable)
      .orderBy(navigationItemsTable.order_index)
      .execute();

    expect(remainingItems).toHaveLength(2);
    expect(remainingItems[0].id).toBe(navItem1.id);
    expect(remainingItems[0].order_index).toBe(0); // Should remain unchanged
    expect(remainingItems[1].id).toBe(navItem3.id);
    expect(remainingItems[1].order_index).toBe(1); // Should be decremented from 2 to 1
  });

  it('should not reorder items that came before the deleted item', async () => {
    // Create prerequisite page
    const page = await createTestPage();

    // Create multiple navigation items
    const navItem1 = await createNavigationItem({
      label: 'First Nav',
      slug: page.slug,
      order_index: 0,
      is_visible: true
    });

    const navItem2 = await createNavigationItem({
      label: 'Second Nav',
      slug: page.slug,
      order_index: 1,
      is_visible: true
    });

    const navItem3 = await createNavigationItem({
      label: 'Third Nav',
      slug: page.slug,
      order_index: 2,
      is_visible: true
    });

    // Delete the last item (order_index: 2)
    const input: GetPageByIdInput = { id: navItem3.id };
    const result = await deleteNavigationItem(input);

    expect(result).toBe(true);

    // Check that preceding items are unchanged
    const remainingItems = await db.select()
      .from(navigationItemsTable)
      .orderBy(navigationItemsTable.order_index)
      .execute();

    expect(remainingItems).toHaveLength(2);
    expect(remainingItems[0].id).toBe(navItem1.id);
    expect(remainingItems[0].order_index).toBe(0); // Should remain unchanged
    expect(remainingItems[1].id).toBe(navItem2.id);
    expect(remainingItems[1].order_index).toBe(1); // Should remain unchanged
  });

  it('should handle deleting the only navigation item', async () => {
    // Create prerequisite page and single navigation item
    const page = await createTestPage();
    const navItem = await createNavigationItem({
      label: 'Only Nav',
      slug: page.slug,
      order_index: 0,
      is_visible: true
    });

    const input: GetPageByIdInput = { id: navItem.id };
    const result = await deleteNavigationItem(input);

    expect(result).toBe(true);

    // Verify no items remain
    const remainingItems = await db.select()
      .from(navigationItemsTable)
      .execute();

    expect(remainingItems).toHaveLength(0);
  });

  it('should update updated_at timestamp for reordered items', async () => {
    // Create prerequisite page
    const page = await createTestPage();

    // Create navigation items
    const navItem1 = await createNavigationItem({
      label: 'First Nav',
      slug: page.slug,
      order_index: 0,
      is_visible: true
    });

    const navItem2 = await createNavigationItem({
      label: 'Second Nav',
      slug: page.slug,
      order_index: 1,
      is_visible: true
    });

    const navItem3 = await createNavigationItem({
      label: 'Third Nav',
      slug: page.slug,
      order_index: 2,
      is_visible: true
    });

    // Get original timestamps
    const originalItem3 = await db.select()
      .from(navigationItemsTable)
      .where(eq(navigationItemsTable.id, navItem3.id))
      .execute();

    const originalTimestamp = originalItem3[0].updated_at;

    // Wait a moment to ensure timestamp difference
    await new Promise(resolve => setTimeout(resolve, 10));

    // Delete the first item
    const input: GetPageByIdInput = { id: navItem1.id };
    await deleteNavigationItem(input);

    // Check that reordered items have updated timestamps
    const updatedItem3 = await db.select()
      .from(navigationItemsTable)
      .where(eq(navigationItemsTable.id, navItem3.id))
      .execute();

    expect(updatedItem3[0].updated_at).toBeInstanceOf(Date);
    expect(updatedItem3[0].updated_at > originalTimestamp).toBe(true);
  });
});