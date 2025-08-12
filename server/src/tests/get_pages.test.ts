import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { pagesTable } from '../db/schema';
import { getPages, getPublishedPages } from '../handlers/get_pages';

describe('getPages', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no pages exist', async () => {
    const result = await getPages();
    expect(result).toEqual([]);
  });

  it('should return all pages regardless of published status', async () => {
    // Create test pages with different published status
    await db.insert(pagesTable)
      .values([
        {
          slug: 'published-page',
          title: 'Published Page',
          content: '<h1>Published Content</h1>',
          meta_description: 'Published page description',
          meta_keywords: 'published, page',
          is_published: true
        },
        {
          slug: 'unpublished-page',
          title: 'Unpublished Page',
          content: '<h1>Unpublished Content</h1>',
          meta_description: 'Unpublished page description',
          meta_keywords: 'unpublished, page',
          is_published: false
        },
        {
          slug: 'another-published',
          title: 'Another Published Page',
          content: '<h1>Another Published Content</h1>',
          meta_description: null,
          meta_keywords: null,
          is_published: true
        }
      ])
      .execute();

    const result = await getPages();

    expect(result).toHaveLength(3);
    
    // Verify all pages are returned
    const slugs = result.map(page => page.slug);
    expect(slugs).toContain('published-page');
    expect(slugs).toContain('unpublished-page');
    expect(slugs).toContain('another-published');

    // Verify page structure and types
    result.forEach(page => {
      expect(page.id).toBeDefined();
      expect(typeof page.slug).toBe('string');
      expect(typeof page.title).toBe('string');
      expect(typeof page.content).toBe('string');
      expect(typeof page.is_published).toBe('boolean');
      expect(page.created_at).toBeInstanceOf(Date);
      expect(page.updated_at).toBeInstanceOf(Date);
    });
  });

  it('should return pages ordered by creation date descending', async () => {
    // Create pages at different times to test ordering
    const firstPage = await db.insert(pagesTable)
      .values({
        slug: 'first-page',
        title: 'First Page',
        content: '<h1>First Content</h1>',
        meta_description: 'First page',
        meta_keywords: null,
        is_published: true
      })
      .returning()
      .execute();

    // Small delay to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));

    const secondPage = await db.insert(pagesTable)
      .values({
        slug: 'second-page',
        title: 'Second Page',
        content: '<h1>Second Content</h1>',
        meta_description: null,
        meta_keywords: 'second',
        is_published: false
      })
      .returning()
      .execute();

    const result = await getPages();

    expect(result).toHaveLength(2);
    
    // Newest should be first
    expect(result[0].slug).toBe('second-page');
    expect(result[1].slug).toBe('first-page');
    
    // Verify ordering by comparing timestamps
    expect(result[0].created_at >= result[1].created_at).toBe(true);
  });

  it('should handle pages with null metadata fields', async () => {
    await db.insert(pagesTable)
      .values({
        slug: 'minimal-page',
        title: 'Minimal Page',
        content: '<p>Basic content</p>',
        meta_description: null,
        meta_keywords: null,
        is_published: true
      })
      .execute();

    const result = await getPages();

    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('minimal-page');
    expect(result[0].title).toBe('Minimal Page');
    expect(result[0].content).toBe('<p>Basic content</p>');
    expect(result[0].meta_description).toBeNull();
    expect(result[0].meta_keywords).toBeNull();
    expect(result[0].is_published).toBe(true);
  });
});

describe('getPublishedPages', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no published pages exist', async () => {
    // Create only unpublished pages
    await db.insert(pagesTable)
      .values([
        {
          slug: 'unpublished-1',
          title: 'Unpublished 1',
          content: '<h1>Content 1</h1>',
          meta_description: 'Description 1',
          meta_keywords: 'keywords 1',
          is_published: false
        },
        {
          slug: 'unpublished-2',
          title: 'Unpublished 2',
          content: '<h1>Content 2</h1>',
          meta_description: null,
          meta_keywords: null,
          is_published: false
        }
      ])
      .execute();

    const result = await getPublishedPages();
    expect(result).toEqual([]);
  });

  it('should return only published pages', async () => {
    // Create mix of published and unpublished pages
    await db.insert(pagesTable)
      .values([
        {
          slug: 'published-1',
          title: 'Published Page 1',
          content: '<h1>Published Content 1</h1>',
          meta_description: 'Published description 1',
          meta_keywords: 'published, test',
          is_published: true
        },
        {
          slug: 'unpublished-1',
          title: 'Unpublished Page 1',
          content: '<h1>Unpublished Content 1</h1>',
          meta_description: 'Unpublished description',
          meta_keywords: null,
          is_published: false
        },
        {
          slug: 'published-2',
          title: 'Published Page 2',
          content: '<h1>Published Content 2</h1>',
          meta_description: null,
          meta_keywords: 'another, published',
          is_published: true
        }
      ])
      .execute();

    const result = await getPublishedPages();

    expect(result).toHaveLength(2);
    
    // Should only contain published pages
    const slugs = result.map(page => page.slug);
    expect(slugs).toContain('published-1');
    expect(slugs).toContain('published-2');
    expect(slugs).not.toContain('unpublished-1');

    // All returned pages should be published
    result.forEach(page => {
      expect(page.is_published).toBe(true);
    });
  });

  it('should return published pages ordered by creation date descending', async () => {
    // Create published pages at different times
    await db.insert(pagesTable)
      .values({
        slug: 'older-published',
        title: 'Older Published',
        content: '<h1>Older Content</h1>',
        meta_description: 'Older description',
        meta_keywords: null,
        is_published: true
      })
      .execute();

    // Small delay to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));

    await db.insert(pagesTable)
      .values({
        slug: 'newer-published',
        title: 'Newer Published',
        content: '<h1>Newer Content</h1>',
        meta_description: null,
        meta_keywords: 'newer',
        is_published: true
      })
      .execute();

    const result = await getPublishedPages();

    expect(result).toHaveLength(2);
    
    // Newest should be first
    expect(result[0].slug).toBe('newer-published');
    expect(result[1].slug).toBe('older-published');
    
    // Verify ordering by comparing timestamps
    expect(result[0].created_at >= result[1].created_at).toBe(true);
  });

  it('should handle published pages with various metadata combinations', async () => {
    await db.insert(pagesTable)
      .values([
        {
          slug: 'full-meta',
          title: 'Page with Full Meta',
          content: '<h1>Full Meta Content</h1>',
          meta_description: 'Complete meta description',
          meta_keywords: 'complete, meta, keywords',
          is_published: true
        },
        {
          slug: 'partial-meta',
          title: 'Page with Partial Meta',
          content: '<h1>Partial Meta Content</h1>',
          meta_description: 'Only description',
          meta_keywords: null,
          is_published: true
        },
        {
          slug: 'no-meta',
          title: 'Page with No Meta',
          content: '<h1>No Meta Content</h1>',
          meta_description: null,
          meta_keywords: null,
          is_published: true
        }
      ])
      .execute();

    const result = await getPublishedPages();

    expect(result).toHaveLength(3);
    
    // Verify all pages have correct structure
    result.forEach(page => {
      expect(page.id).toBeDefined();
      expect(typeof page.slug).toBe('string');
      expect(typeof page.title).toBe('string');
      expect(typeof page.content).toBe('string');
      expect(page.is_published).toBe(true);
      expect(page.created_at).toBeInstanceOf(Date);
      expect(page.updated_at).toBeInstanceOf(Date);
      // meta fields can be string or null
      expect(page.meta_description === null || typeof page.meta_description === 'string').toBe(true);
      expect(page.meta_keywords === null || typeof page.meta_keywords === 'string').toBe(true);
    });

    // Find specific pages and verify their metadata
    const fullMetaPage = result.find(p => p.slug === 'full-meta');
    expect(fullMetaPage?.meta_description).toBe('Complete meta description');
    expect(fullMetaPage?.meta_keywords).toBe('complete, meta, keywords');

    const partialMetaPage = result.find(p => p.slug === 'partial-meta');
    expect(partialMetaPage?.meta_description).toBe('Only description');
    expect(partialMetaPage?.meta_keywords).toBeNull();

    const noMetaPage = result.find(p => p.slug === 'no-meta');
    expect(noMetaPage?.meta_description).toBeNull();
    expect(noMetaPage?.meta_keywords).toBeNull();
  });
});