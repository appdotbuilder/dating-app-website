import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { navigationItemsTable } from '../db/schema';
import { type CreateNavigationItemInput, type UpdateNavigationItemInput } from '../schema';
import { updateNavigationItem } from '../handlers/update_navigation_item';
import { eq } from 'drizzle-orm';

// Helper function to create a navigation item for testing
const createTestNavigationItem = async (input: CreateNavigationItemInput) => {
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
};

const testNavigationItem: CreateNavigationItemInput = {
  label: 'Test Navigation',
  slug: 'test-nav',
  order_index: 1,
  is_visible: true
};

describe('updateNavigationItem', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should update a navigation item with all fields', async () => {
    // Create test navigation item
    const createdItem = await createTestNavigationItem(testNavigationItem);

    const updateInput: UpdateNavigationItemInput = {
      id: createdItem.id,
      label: 'Updated Navigation',
      slug: 'updated-nav',
      order_index: 5,
      is_visible: false
    };

    const result = await updateNavigationItem(updateInput);

    // Verify update result
    expect(result).not.toBeNull();
    expect(result!.id).toEqual(createdItem.id);
    expect(result!.label).toEqual('Updated Navigation');
    expect(result!.slug).toEqual('updated-nav');
    expect(result!.order_index).toEqual(5);
    expect(result!.is_visible).toEqual(false);
    expect(result!.created_at).toEqual(createdItem.created_at);
    expect(result!.updated_at).toBeInstanceOf(Date);
    expect(result!.updated_at.getTime()).toBeGreaterThan(createdItem.updated_at.getTime());
  });

  it('should update a navigation item with partial fields', async () => {
    // Create test navigation item
    const createdItem = await createTestNavigationItem(testNavigationItem);

    const updateInput: UpdateNavigationItemInput = {
      id: createdItem.id,
      label: 'Partially Updated Navigation'
    };

    const result = await updateNavigationItem(updateInput);

    // Verify partial update
    expect(result).not.toBeNull();
    expect(result!.id).toEqual(createdItem.id);
    expect(result!.label).toEqual('Partially Updated Navigation');
    expect(result!.slug).toEqual(createdItem.slug); // Should remain unchanged
    expect(result!.order_index).toEqual(createdItem.order_index); // Should remain unchanged
    expect(result!.is_visible).toEqual(createdItem.is_visible); // Should remain unchanged
    expect(result!.updated_at).toBeInstanceOf(Date);
    expect(result!.updated_at.getTime()).toBeGreaterThan(createdItem.updated_at.getTime());
  });

  it('should update only order_index', async () => {
    // Create test navigation item
    const createdItem = await createTestNavigationItem(testNavigationItem);

    const updateInput: UpdateNavigationItemInput = {
      id: createdItem.id,
      order_index: 10
    };

    const result = await updateNavigationItem(updateInput);

    // Verify order_index update
    expect(result).not.toBeNull();
    expect(result!.order_index).toEqual(10);
    expect(result!.label).toEqual(createdItem.label); // Should remain unchanged
    expect(result!.slug).toEqual(createdItem.slug); // Should remain unchanged
    expect(result!.is_visible).toEqual(createdItem.is_visible); // Should remain unchanged
  });

  it('should update visibility status', async () => {
    // Create test navigation item
    const createdItem = await createTestNavigationItem(testNavigationItem);

    const updateInput: UpdateNavigationItemInput = {
      id: createdItem.id,
      is_visible: false
    };

    const result = await updateNavigationItem(updateInput);

    // Verify visibility update
    expect(result).not.toBeNull();
    expect(result!.is_visible).toEqual(false);
    expect(result!.label).toEqual(createdItem.label); // Should remain unchanged
  });

  it('should return null for non-existent navigation item', async () => {
    const updateInput: UpdateNavigationItemInput = {
      id: 99999, // Non-existent ID
      label: 'Non-existent Navigation'
    };

    const result = await updateNavigationItem(updateInput);

    expect(result).toBeNull();
  });

  it('should save updated navigation item to database', async () => {
    // Create test navigation item
    const createdItem = await createTestNavigationItem(testNavigationItem);

    const updateInput: UpdateNavigationItemInput = {
      id: createdItem.id,
      label: 'Database Updated Navigation',
      slug: 'db-updated-nav'
    };

    await updateNavigationItem(updateInput);

    // Query database directly to verify changes
    const navigationItems = await db.select()
      .from(navigationItemsTable)
      .where(eq(navigationItemsTable.id, createdItem.id))
      .execute();

    expect(navigationItems).toHaveLength(1);
    expect(navigationItems[0].label).toEqual('Database Updated Navigation');
    expect(navigationItems[0].slug).toEqual('db-updated-nav');
    expect(navigationItems[0].order_index).toEqual(createdItem.order_index); // Should remain unchanged
    expect(navigationItems[0].updated_at).toBeInstanceOf(Date);
    expect(navigationItems[0].updated_at.getTime()).toBeGreaterThan(createdItem.updated_at.getTime());
  });

  it('should update navigation item with order_index 0', async () => {
    // Create test navigation item
    const createdItem = await createTestNavigationItem(testNavigationItem);

    const updateInput: UpdateNavigationItemInput = {
      id: createdItem.id,
      order_index: 0 // Test edge case with 0 value
    };

    const result = await updateNavigationItem(updateInput);

    expect(result).not.toBeNull();
    expect(result!.order_index).toEqual(0);
  });

  it('should handle multiple navigation items correctly', async () => {
    // Create multiple navigation items
    const item1 = await createTestNavigationItem({
      label: 'Nav 1',
      slug: 'nav-1',
      order_index: 1,
      is_visible: true
    });

    const item2 = await createTestNavigationItem({
      label: 'Nav 2',
      slug: 'nav-2',
      order_index: 2,
      is_visible: true
    });

    // Update only the second item
    const updateInput: UpdateNavigationItemInput = {
      id: item2.id,
      label: 'Updated Nav 2'
    };

    const result = await updateNavigationItem(updateInput);

    // Verify correct item was updated
    expect(result).not.toBeNull();
    expect(result!.id).toEqual(item2.id);
    expect(result!.label).toEqual('Updated Nav 2');

    // Verify first item remains unchanged
    const firstItem = await db.select()
      .from(navigationItemsTable)
      .where(eq(navigationItemsTable.id, item1.id))
      .execute();

    expect(firstItem[0].label).toEqual('Nav 1');
    expect(firstItem[0].updated_at).toEqual(item1.updated_at);
  });
});