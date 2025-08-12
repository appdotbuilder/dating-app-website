import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { navigationItemsTable, pagesTable } from '../db/schema';
import { type CreateNavigationItemInput } from '../schema';
import { createNavigationItem } from '../handlers/create_navigation_item';
import { eq } from 'drizzle-orm';

// Test page data
const testPage = {
  slug: 'test-page',
  title: 'Test Page',
  content: '<p>Test page content</p>',
  meta_description: 'Test page description',
  meta_keywords: 'test, page',
  is_published: true
};

// Test navigation item input
const testInput: CreateNavigationItemInput = {
  label: 'Test Navigation',
  slug: 'test-page',
  order_index: 1,
  is_visible: true
};

describe('createNavigationItem', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a navigation item', async () => {
    // Create prerequisite page first
    await db.insert(pagesTable).values(testPage).execute();

    const result = await createNavigationItem(testInput);

    // Basic field validation
    expect(result.label).toEqual('Test Navigation');
    expect(result.slug).toEqual('test-page');
    expect(result.order_index).toEqual(1);
    expect(result.is_visible).toEqual(true);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should save navigation item to database', async () => {
    // Create prerequisite page first
    await db.insert(pagesTable).values(testPage).execute();

    const result = await createNavigationItem(testInput);

    // Query using proper drizzle syntax
    const navigationItems = await db.select()
      .from(navigationItemsTable)
      .where(eq(navigationItemsTable.id, result.id))
      .execute();

    expect(navigationItems).toHaveLength(1);
    expect(navigationItems[0].label).toEqual('Test Navigation');
    expect(navigationItems[0].slug).toEqual('test-page');
    expect(navigationItems[0].order_index).toEqual(1);
    expect(navigationItems[0].is_visible).toEqual(true);
    expect(navigationItems[0].created_at).toBeInstanceOf(Date);
    expect(navigationItems[0].updated_at).toBeInstanceOf(Date);
  });

  it('should create navigation item with default visibility', async () => {
    // Create prerequisite page first
    await db.insert(pagesTable).values(testPage).execute();

    const inputWithDefaults: CreateNavigationItemInput = {
      label: 'Test Navigation',
      slug: 'test-page',
      order_index: 0,
      is_visible: true // Zod default applied
    };

    const result = await createNavigationItem(inputWithDefaults);

    expect(result.is_visible).toEqual(true);
    expect(result.order_index).toEqual(0);
  });

  it('should throw error when referenced page does not exist', async () => {
    const invalidInput: CreateNavigationItemInput = {
      label: 'Test Navigation',
      slug: 'non-existent-page',
      order_index: 1,
      is_visible: true
    };

    await expect(createNavigationItem(invalidInput)).rejects.toThrow(/page with slug 'non-existent-page' does not exist/i);
  });

  it('should create navigation items with different order indices', async () => {
    // Create prerequisite pages first
    await db.insert(pagesTable).values([
      { ...testPage, slug: 'page-1' },
      { ...testPage, slug: 'page-2' }
    ]).execute();

    const firstNavItem = await createNavigationItem({
      label: 'First Nav',
      slug: 'page-1',
      order_index: 1,
      is_visible: true
    });

    const secondNavItem = await createNavigationItem({
      label: 'Second Nav',
      slug: 'page-2',
      order_index: 2,
      is_visible: true
    });

    expect(firstNavItem.order_index).toEqual(1);
    expect(secondNavItem.order_index).toEqual(2);

    // Verify both items are in database
    const allNavItems = await db.select()
      .from(navigationItemsTable)
      .execute();

    expect(allNavItems).toHaveLength(2);
    expect(allNavItems.some(item => item.order_index === 1)).toBe(true);
    expect(allNavItems.some(item => item.order_index === 2)).toBe(true);
  });

  it('should handle invisible navigation items', async () => {
    // Create prerequisite page first
    await db.insert(pagesTable).values(testPage).execute();

    const invisibleNavItem = await createNavigationItem({
      label: 'Hidden Navigation',
      slug: 'test-page',
      order_index: 5,
      is_visible: false
    });

    expect(invisibleNavItem.is_visible).toEqual(false);
    expect(invisibleNavItem.label).toEqual('Hidden Navigation');

    // Verify in database
    const savedItem = await db.select()
      .from(navigationItemsTable)
      .where(eq(navigationItemsTable.id, invisibleNavItem.id))
      .execute();

    expect(savedItem[0].is_visible).toEqual(false);
  });
});