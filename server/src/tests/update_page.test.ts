import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { pagesTable } from '../db/schema';
import { type CreatePageInput, type UpdatePageInput } from '../schema';
import { updatePage } from '../handlers/update_page';
import { eq } from 'drizzle-orm';

// Helper to create a test page
const createTestPage = async (pageData: Partial<CreatePageInput> = {}) => {
  const defaultData: CreatePageInput = {
    slug: 'test-page',
    title: 'Test Page',
    content: '<h1>Test Content</h1>',
    meta_description: 'Test description',
    meta_keywords: 'test, keywords',
    is_published: true
  };

  const result = await db.insert(pagesTable)
    .values({ ...defaultData, ...pageData })
    .returning()
    .execute();

  return result[0];
};

describe('updatePage', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should update a page with all fields', async () => {
    const testPage = await createTestPage();
    const originalUpdatedAt = testPage.updated_at;

    // Wait a bit to ensure updated_at changes
    await new Promise(resolve => setTimeout(resolve, 10));

    const updateInput: UpdatePageInput = {
      id: testPage.id,
      slug: 'updated-page',
      title: 'Updated Page Title',
      content: '<h1>Updated Content</h1>',
      meta_description: 'Updated description',
      meta_keywords: 'updated, keywords',
      is_published: false
    };

    const result = await updatePage(updateInput);

    expect(result).not.toBeNull();
    expect(result!.id).toBe(testPage.id);
    expect(result!.slug).toBe('updated-page');
    expect(result!.title).toBe('Updated Page Title');
    expect(result!.content).toBe('<h1>Updated Content</h1>');
    expect(result!.meta_description).toBe('Updated description');
    expect(result!.meta_keywords).toBe('updated, keywords');
    expect(result!.is_published).toBe(false);
    expect(result!.created_at).toEqual(testPage.created_at);
    expect(result!.updated_at).not.toEqual(originalUpdatedAt);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should update only specified fields', async () => {
    const testPage = await createTestPage({
      title: 'Original Title',
      content: 'Original Content',
      is_published: true
    });

    const updateInput: UpdatePageInput = {
      id: testPage.id,
      title: 'Updated Title Only'
    };

    const result = await updatePage(updateInput);

    expect(result).not.toBeNull();
    expect(result!.title).toBe('Updated Title Only');
    expect(result!.content).toBe('Original Content'); // Should remain unchanged
    expect(result!.slug).toBe(testPage.slug); // Should remain unchanged
    expect(result!.is_published).toBe(true); // Should remain unchanged
  });

  it('should save updated page to database', async () => {
    const testPage = await createTestPage();

    const updateInput: UpdatePageInput = {
      id: testPage.id,
      title: 'Database Updated Title',
      content: '<p>Database updated content</p>'
    };

    await updatePage(updateInput);

    // Verify the update was saved to the database
    const pages = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.id, testPage.id))
      .execute();

    expect(pages).toHaveLength(1);
    expect(pages[0].title).toBe('Database Updated Title');
    expect(pages[0].content).toBe('<p>Database updated content</p>');
    expect(pages[0].slug).toBe(testPage.slug); // Original value preserved
  });

  it('should update nullable fields to null', async () => {
    const testPage = await createTestPage({
      meta_description: 'Original description',
      meta_keywords: 'original, keywords'
    });

    const updateInput: UpdatePageInput = {
      id: testPage.id,
      meta_description: null,
      meta_keywords: null
    };

    const result = await updatePage(updateInput);

    expect(result).not.toBeNull();
    expect(result!.meta_description).toBeNull();
    expect(result!.meta_keywords).toBeNull();
  });

  it('should update nullable fields from null to value', async () => {
    const testPage = await createTestPage({
      meta_description: null,
      meta_keywords: null
    });

    const updateInput: UpdatePageInput = {
      id: testPage.id,
      meta_description: 'New description',
      meta_keywords: 'new, keywords'
    };

    const result = await updatePage(updateInput);

    expect(result).not.toBeNull();
    expect(result!.meta_description).toBe('New description');
    expect(result!.meta_keywords).toBe('new, keywords');
  });

  it('should return null for non-existent page', async () => {
    const updateInput: UpdatePageInput = {
      id: 999999, // Non-existent ID
      title: 'Updated Title'
    };

    const result = await updatePage(updateInput);

    expect(result).toBeNull();
  });

  it('should update boolean field correctly', async () => {
    const testPage = await createTestPage({ is_published: true });

    const updateInput: UpdatePageInput = {
      id: testPage.id,
      is_published: false
    };

    const result = await updatePage(updateInput);

    expect(result).not.toBeNull();
    expect(result!.is_published).toBe(false);
  });

  it('should always update the updated_at timestamp', async () => {
    const testPage = await createTestPage();
    const originalUpdatedAt = testPage.updated_at;

    // Wait to ensure timestamp difference
    await new Promise(resolve => setTimeout(resolve, 10));

    // Update with minimal change
    const updateInput: UpdatePageInput = {
      id: testPage.id
    };

    const result = await updatePage(updateInput);

    expect(result).not.toBeNull();
    expect(result!.updated_at).not.toEqual(originalUpdatedAt);
    expect(result!.updated_at).toBeInstanceOf(Date);
    expect(result!.updated_at > originalUpdatedAt).toBe(true);
  });

  it('should handle empty update gracefully', async () => {
    const testPage = await createTestPage();

    // Update with only ID (no fields to update)
    const updateInput: UpdatePageInput = {
      id: testPage.id
    };

    const result = await updatePage(updateInput);

    expect(result).not.toBeNull();
    expect(result!.id).toBe(testPage.id);
    expect(result!.title).toBe(testPage.title);
    expect(result!.slug).toBe(testPage.slug);
    expect(result!.content).toBe(testPage.content);
    // updated_at should still be updated
    expect(result!.updated_at).not.toEqual(testPage.updated_at);
  });
});