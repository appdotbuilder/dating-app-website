import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { pagesTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { type GetPageByIdInput, type CreatePageInput } from '../schema';
import { deletePage } from '../handlers/delete_page';

// Test data for creating pages
const testPageData: CreatePageInput = {
  slug: 'test-page',
  title: 'Test Page',
  content: '<h1>Welcome to Test Page</h1><p>This is test content.</p>',
  meta_description: 'A test page for testing purposes',
  meta_keywords: 'test, page, example',
  is_published: true
};

const secondPageData: CreatePageInput = {
  slug: 'another-page',
  title: 'Another Page',
  content: '<p>Another test page content</p>',
  meta_description: null,
  meta_keywords: null,
  is_published: false
};

describe('deletePage', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should delete an existing page and return true', async () => {
    // Create a test page first
    const [createdPage] = await db.insert(pagesTable)
      .values({
        slug: testPageData.slug,
        title: testPageData.title,
        content: testPageData.content,
        meta_description: testPageData.meta_description,
        meta_keywords: testPageData.meta_keywords,
        is_published: testPageData.is_published
      })
      .returning()
      .execute();

    const deleteInput: GetPageByIdInput = {
      id: createdPage.id
    };

    // Delete the page
    const result = await deletePage(deleteInput);

    // Should return true indicating successful deletion
    expect(result).toBe(true);

    // Verify page no longer exists in database
    const pages = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.id, createdPage.id))
      .execute();

    expect(pages).toHaveLength(0);
  });

  it('should return false when trying to delete non-existent page', async () => {
    const nonExistentId = 99999;
    const deleteInput: GetPageByIdInput = {
      id: nonExistentId
    };

    // Try to delete non-existent page
    const result = await deletePage(deleteInput);

    // Should return false indicating page was not found
    expect(result).toBe(false);
  });

  it('should only delete the specified page and leave others intact', async () => {
    // Create two test pages
    const [page1] = await db.insert(pagesTable)
      .values({
        slug: testPageData.slug,
        title: testPageData.title,
        content: testPageData.content,
        meta_description: testPageData.meta_description,
        meta_keywords: testPageData.meta_keywords,
        is_published: testPageData.is_published
      })
      .returning()
      .execute();

    const [page2] = await db.insert(pagesTable)
      .values({
        slug: secondPageData.slug,
        title: secondPageData.title,
        content: secondPageData.content,
        meta_description: secondPageData.meta_description,
        meta_keywords: secondPageData.meta_keywords,
        is_published: secondPageData.is_published
      })
      .returning()
      .execute();

    const deleteInput: GetPageByIdInput = {
      id: page1.id
    };

    // Delete only the first page
    const result = await deletePage(deleteInput);

    expect(result).toBe(true);

    // Verify first page is deleted
    const deletedPage = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.id, page1.id))
      .execute();

    expect(deletedPage).toHaveLength(0);

    // Verify second page still exists
    const remainingPage = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.id, page2.id))
      .execute();

    expect(remainingPage).toHaveLength(1);
    expect(remainingPage[0].slug).toBe(secondPageData.slug);
    expect(remainingPage[0].title).toBe(secondPageData.title);
  });

  it('should handle deletion of published pages', async () => {
    // Create a published page
    const [publishedPage] = await db.insert(pagesTable)
      .values({
        slug: testPageData.slug,
        title: testPageData.title,
        content: testPageData.content,
        meta_description: testPageData.meta_description,
        meta_keywords: testPageData.meta_keywords,
        is_published: true
      })
      .returning()
      .execute();

    const deleteInput: GetPageByIdInput = {
      id: publishedPage.id
    };

    const result = await deletePage(deleteInput);

    expect(result).toBe(true);

    // Verify published page was successfully deleted
    const pages = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.id, publishedPage.id))
      .execute();

    expect(pages).toHaveLength(0);
  });

  it('should handle deletion of unpublished pages', async () => {
    // Create an unpublished page
    const [unpublishedPage] = await db.insert(pagesTable)
      .values({
        slug: secondPageData.slug,
        title: secondPageData.title,
        content: secondPageData.content,
        meta_description: secondPageData.meta_description,
        meta_keywords: secondPageData.meta_keywords,
        is_published: false
      })
      .returning()
      .execute();

    const deleteInput: GetPageByIdInput = {
      id: unpublishedPage.id
    };

    const result = await deletePage(deleteInput);

    expect(result).toBe(true);

    // Verify unpublished page was successfully deleted
    const pages = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.id, unpublishedPage.id))
      .execute();

    expect(pages).toHaveLength(0);
  });

  it('should handle negative ID values gracefully', async () => {
    const negativeIdInput: GetPageByIdInput = {
      id: -1
    };

    const result = await deletePage(negativeIdInput);

    // Should return false as negative ID won't match any existing record
    expect(result).toBe(false);
  });

  it('should handle zero ID value gracefully', async () => {
    const zeroIdInput: GetPageByIdInput = {
      id: 0
    };

    const result = await deletePage(zeroIdInput);

    // Should return false as ID 0 won't match any existing record (serial starts from 1)
    expect(result).toBe(false);
  });
});