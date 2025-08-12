import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { pagesTable } from '../db/schema';
import { type GetPageBySlugInput } from '../schema';
import { getPageBySlug } from '../handlers/get_page_by_slug';

// Test input data
const testPageData = {
  slug: 'test-page',
  title: 'Test Page Title',
  content: '<h1>Welcome to Test Page</h1><p>This is test content.</p>',
  meta_description: 'A test page for unit testing',
  meta_keywords: 'test, page, unit testing',
  is_published: true
};

const testInput: GetPageBySlugInput = {
  slug: 'test-page'
};

describe('getPageBySlug', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return a page when found by slug', async () => {
    // Create a test page first
    const insertResult = await db.insert(pagesTable)
      .values(testPageData)
      .returning()
      .execute();

    const createdPage = insertResult[0];

    // Test the handler
    const result = await getPageBySlug(testInput);

    expect(result).not.toBeNull();
    expect(result!.id).toEqual(createdPage.id);
    expect(result!.slug).toEqual('test-page');
    expect(result!.title).toEqual('Test Page Title');
    expect(result!.content).toEqual('<h1>Welcome to Test Page</h1><p>This is test content.</p>');
    expect(result!.meta_description).toEqual('A test page for unit testing');
    expect(result!.meta_keywords).toEqual('test, page, unit testing');
    expect(result!.is_published).toEqual(true);
    expect(result!.created_at).toBeInstanceOf(Date);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should return null when page is not found', async () => {
    const nonExistentInput: GetPageBySlugInput = {
      slug: 'non-existent-page'
    };

    const result = await getPageBySlug(nonExistentInput);

    expect(result).toBeNull();
  });

  it('should find page with different slug formats', async () => {
    // Create pages with various slug formats
    const dashSlugPage = {
      ...testPageData,
      slug: 'about-us-company'
    };

    const numberSlugPage = {
      ...testPageData,
      slug: 'page-123',
      title: 'Page 123'
    };

    await db.insert(pagesTable)
      .values([dashSlugPage, numberSlugPage])
      .execute();

    // Test dash slug
    const dashResult = await getPageBySlug({ slug: 'about-us-company' });
    expect(dashResult).not.toBeNull();
    expect(dashResult!.slug).toEqual('about-us-company');

    // Test number slug
    const numberResult = await getPageBySlug({ slug: 'page-123' });
    expect(numberResult).not.toBeNull();
    expect(numberResult!.slug).toEqual('page-123');
    expect(numberResult!.title).toEqual('Page 123');
  });

  it('should return page regardless of published status', async () => {
    // Create an unpublished page
    const unpublishedPageData = {
      ...testPageData,
      slug: 'draft-page',
      title: 'Draft Page',
      is_published: false
    };

    await db.insert(pagesTable)
      .values(unpublishedPageData)
      .execute();

    const result = await getPageBySlug({ slug: 'draft-page' });

    expect(result).not.toBeNull();
    expect(result!.slug).toEqual('draft-page');
    expect(result!.title).toEqual('Draft Page');
    expect(result!.is_published).toEqual(false);
  });

  it('should handle pages with null meta fields', async () => {
    // Create page with null meta fields
    const pageWithNullMeta = {
      slug: 'minimal-page',
      title: 'Minimal Page',
      content: '<p>Simple content</p>',
      meta_description: null,
      meta_keywords: null,
      is_published: true
    };

    await db.insert(pagesTable)
      .values(pageWithNullMeta)
      .execute();

    const result = await getPageBySlug({ slug: 'minimal-page' });

    expect(result).not.toBeNull();
    expect(result!.slug).toEqual('minimal-page');
    expect(result!.title).toEqual('Minimal Page');
    expect(result!.meta_description).toBeNull();
    expect(result!.meta_keywords).toBeNull();
  });

  it('should be case sensitive for slug matching', async () => {
    // Create page with lowercase slug
    await db.insert(pagesTable)
      .values({
        ...testPageData,
        slug: 'lowercase-slug'
      })
      .execute();

    // Try to find with uppercase - should not match
    const uppercaseResult = await getPageBySlug({ slug: 'LOWERCASE-SLUG' });
    expect(uppercaseResult).toBeNull();

    // Try to find with mixed case - should not match
    const mixedCaseResult = await getPageBySlug({ slug: 'Lowercase-Slug' });
    expect(mixedCaseResult).toBeNull();

    // Find with exact lowercase match - should work
    const exactResult = await getPageBySlug({ slug: 'lowercase-slug' });
    expect(exactResult).not.toBeNull();
    expect(exactResult!.slug).toEqual('lowercase-slug');
  });
});