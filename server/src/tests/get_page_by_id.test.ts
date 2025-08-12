import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { pagesTable } from '../db/schema';
import { type GetPageByIdInput, type CreatePageInput } from '../schema';
import { getPageById } from '../handlers/get_page_by_id';

describe('getPageById', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return a page when found by ID', async () => {
    // Create a test page
    const createInput: CreatePageInput = {
      slug: 'test-page',
      title: 'Test Page',
      content: '<h1>Test Content</h1>',
      meta_description: 'Test meta description',
      meta_keywords: 'test, page, keywords',
      is_published: true
    };

    const insertResult = await db.insert(pagesTable)
      .values({
        slug: createInput.slug,
        title: createInput.title,
        content: createInput.content,
        meta_description: createInput.meta_description,
        meta_keywords: createInput.meta_keywords,
        is_published: createInput.is_published
      })
      .returning()
      .execute();

    const createdPage = insertResult[0];

    // Test getting the page by ID
    const getInput: GetPageByIdInput = {
      id: createdPage.id
    };

    const result = await getPageById(getInput);

    expect(result).not.toBeNull();
    expect(result!.id).toEqual(createdPage.id);
    expect(result!.slug).toEqual('test-page');
    expect(result!.title).toEqual('Test Page');
    expect(result!.content).toEqual('<h1>Test Content</h1>');
    expect(result!.meta_description).toEqual('Test meta description');
    expect(result!.meta_keywords).toEqual('test, page, keywords');
    expect(result!.is_published).toEqual(true);
    expect(result!.created_at).toBeInstanceOf(Date);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should return null when page is not found', async () => {
    const input: GetPageByIdInput = {
      id: 999999 // Non-existent ID
    };

    const result = await getPageById(input);

    expect(result).toBeNull();
  });

  it('should return unpublished pages', async () => {
    // Create an unpublished test page
    const createInput: CreatePageInput = {
      slug: 'draft-page',
      title: 'Draft Page',
      content: '<p>Draft content</p>',
      meta_description: null,
      meta_keywords: null,
      is_published: false
    };

    const insertResult = await db.insert(pagesTable)
      .values({
        slug: createInput.slug,
        title: createInput.title,
        content: createInput.content,
        meta_description: createInput.meta_description,
        meta_keywords: createInput.meta_keywords,
        is_published: createInput.is_published
      })
      .returning()
      .execute();

    const createdPage = insertResult[0];

    const getInput: GetPageByIdInput = {
      id: createdPage.id
    };

    const result = await getPageById(getInput);

    expect(result).not.toBeNull();
    expect(result!.id).toEqual(createdPage.id);
    expect(result!.slug).toEqual('draft-page');
    expect(result!.is_published).toEqual(false);
  });

  it('should handle pages with null meta fields', async () => {
    // Create a page with null meta fields
    const insertResult = await db.insert(pagesTable)
      .values({
        slug: 'minimal-page',
        title: 'Minimal Page',
        content: '<p>Minimal content</p>',
        meta_description: null,
        meta_keywords: null,
        is_published: true
      })
      .returning()
      .execute();

    const createdPage = insertResult[0];

    const getInput: GetPageByIdInput = {
      id: createdPage.id
    };

    const result = await getPageById(getInput);

    expect(result).not.toBeNull();
    expect(result!.id).toEqual(createdPage.id);
    expect(result!.slug).toEqual('minimal-page');
    expect(result!.meta_description).toBeNull();
    expect(result!.meta_keywords).toBeNull();
  });

  it('should return correct data types for all fields', async () => {
    // Create a comprehensive test page
    const insertResult = await db.insert(pagesTable)
      .values({
        slug: 'type-test-page',
        title: 'Type Test Page',
        content: '<div>Content with HTML</div>',
        meta_description: 'Type test description',
        meta_keywords: 'type, test',
        is_published: true
      })
      .returning()
      .execute();

    const createdPage = insertResult[0];

    const getInput: GetPageByIdInput = {
      id: createdPage.id
    };

    const result = await getPageById(getInput);

    expect(result).not.toBeNull();
    
    // Verify all field types
    expect(typeof result!.id).toEqual('number');
    expect(typeof result!.slug).toEqual('string');
    expect(typeof result!.title).toEqual('string');
    expect(typeof result!.content).toEqual('string');
    expect(typeof result!.meta_description).toEqual('string');
    expect(typeof result!.meta_keywords).toEqual('string');
    expect(typeof result!.is_published).toEqual('boolean');
    expect(result!.created_at).toBeInstanceOf(Date);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });
});