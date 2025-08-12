import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { navigationItemsTable } from '../db/schema';
import { getNavigationItems, getVisibleNavigationItems } from '../handlers/get_navigation_items';

describe('getNavigationItems', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no navigation items exist', async () => {
    const result = await getNavigationItems();
    expect(result).toEqual([]);
  });

  it('should return all navigation items ordered by order_index', async () => {
    // Create test navigation items with different order indices
    await db.insert(navigationItemsTable).values([
      {
        label: 'About',
        slug: 'about',
        order_index: 2,
        is_visible: true
      },
      {
        label: 'Home',
        slug: 'home',
        order_index: 1,
        is_visible: true
      },
      {
        label: 'Contact',
        slug: 'contact',
        order_index: 3,
        is_visible: false
      }
    ]).execute();

    const result = await getNavigationItems();

    expect(result).toHaveLength(3);
    
    // Check ordering by order_index
    expect(result[0].label).toEqual('Home');
    expect(result[0].order_index).toEqual(1);
    expect(result[1].label).toEqual('About');
    expect(result[1].order_index).toEqual(2);
    expect(result[2].label).toEqual('Contact');
    expect(result[2].order_index).toEqual(3);

    // Verify all expected fields are present
    result.forEach(item => {
      expect(item.id).toBeDefined();
      expect(item.label).toBeDefined();
      expect(item.slug).toBeDefined();
      expect(typeof item.order_index).toBe('number');
      expect(typeof item.is_visible).toBe('boolean');
      expect(item.created_at).toBeInstanceOf(Date);
      expect(item.updated_at).toBeInstanceOf(Date);
    });
  });

  it('should return both visible and hidden items', async () => {
    // Create items with mixed visibility
    await db.insert(navigationItemsTable).values([
      {
        label: 'Public Page',
        slug: 'public',
        order_index: 1,
        is_visible: true
      },
      {
        label: 'Draft Page',
        slug: 'draft',
        order_index: 2,
        is_visible: false
      }
    ]).execute();

    const result = await getNavigationItems();

    expect(result).toHaveLength(2);
    expect(result[0].is_visible).toBe(true);
    expect(result[1].is_visible).toBe(false);
  });
});

describe('getVisibleNavigationItems', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no visible navigation items exist', async () => {
    // Create only hidden items
    await db.insert(navigationItemsTable).values({
      label: 'Hidden Page',
      slug: 'hidden',
      order_index: 1,
      is_visible: false
    }).execute();

    const result = await getVisibleNavigationItems();
    expect(result).toEqual([]);
  });

  it('should return only visible navigation items ordered by order_index', async () => {
    // Create mixed visibility items
    await db.insert(navigationItemsTable).values([
      {
        label: 'Services',
        slug: 'services',
        order_index: 3,
        is_visible: true
      },
      {
        label: 'Draft',
        slug: 'draft',
        order_index: 1,
        is_visible: false
      },
      {
        label: 'Home',
        slug: 'home',
        order_index: 1,
        is_visible: true
      },
      {
        label: 'About',
        slug: 'about',
        order_index: 2,
        is_visible: true
      },
      {
        label: 'Hidden Contact',
        slug: 'hidden-contact',
        order_index: 4,
        is_visible: false
      }
    ]).execute();

    const result = await getVisibleNavigationItems();

    // Should only include visible items
    expect(result).toHaveLength(3);
    
    // Check correct ordering by order_index
    expect(result[0].label).toEqual('Home');
    expect(result[0].order_index).toEqual(1);
    expect(result[0].is_visible).toBe(true);
    
    expect(result[1].label).toEqual('About');
    expect(result[1].order_index).toEqual(2);
    expect(result[1].is_visible).toBe(true);
    
    expect(result[2].label).toEqual('Services');
    expect(result[2].order_index).toEqual(3);
    expect(result[2].is_visible).toBe(true);

    // Verify all items are visible
    result.forEach(item => {
      expect(item.is_visible).toBe(true);
    });
  });

  it('should handle same order_index values consistently', async () => {
    // Create items with same order_index to test consistent ordering
    await db.insert(navigationItemsTable).values([
      {
        label: 'Page B',
        slug: 'page-b',
        order_index: 1,
        is_visible: true
      },
      {
        label: 'Page A',
        slug: 'page-a',
        order_index: 1,
        is_visible: true
      }
    ]).execute();

    const result = await getVisibleNavigationItems();

    expect(result).toHaveLength(2);
    // Both should have same order_index
    expect(result[0].order_index).toEqual(1);
    expect(result[1].order_index).toEqual(1);
    
    // Results should be consistent across multiple calls
    const result2 = await getVisibleNavigationItems();
    expect(result).toEqual(result2);
  });

  it('should return all fields correctly', async () => {
    await db.insert(navigationItemsTable).values({
      label: 'Test Page',
      slug: 'test-page',
      order_index: 5,
      is_visible: true
    }).execute();

    const result = await getVisibleNavigationItems();

    expect(result).toHaveLength(1);
    const item = result[0];
    
    expect(item.id).toBeDefined();
    expect(item.label).toEqual('Test Page');
    expect(item.slug).toEqual('test-page');
    expect(item.order_index).toEqual(5);
    expect(item.is_visible).toBe(true);
    expect(item.created_at).toBeInstanceOf(Date);
    expect(item.updated_at).toBeInstanceOf(Date);
  });
});