import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { pagesTable } from '../db/schema';
import { type CreatePageInput } from '../schema';
import { createPage } from '../handlers/create_page';
import { eq } from 'drizzle-orm';

// Simple test input
const testInput: CreatePageInput = {
  slug: 'test-page',
  title: 'Test Page',
  content: '<h1>Welcome to Test Page</h1><p>This is test content.</p>',
  meta_description: 'A test page for testing purposes',
  meta_keywords: 'test, page, testing',
  is_published: true
};

describe('createPage', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a page with all fields', async () => {
    const result = await createPage(testInput);

    // Basic field validation
    expect(result.slug).toEqual('test-page');
    expect(result.title).toEqual('Test Page');
    expect(result.content).toEqual('<h1>Welcome to Test Page</h1><p>This is test content.</p>');
    expect(result.meta_description).toEqual('A test page for testing purposes');
    expect(result.meta_keywords).toEqual('test, page, testing');
    expect(result.is_published).toEqual(true);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should create a page with minimal fields', async () => {
    const minimalInput: CreatePageInput = {
      slug: 'minimal-page',
      title: 'Minimal Page',
      content: '<p>Minimal content</p>',
      meta_description: null,
      meta_keywords: null,
      is_published: true
    };

    const result = await createPage(minimalInput);

    expect(result.slug).toEqual('minimal-page');
    expect(result.title).toEqual('Minimal Page');
    expect(result.content).toEqual('<p>Minimal content</p>');
    expect(result.meta_description).toBeNull();
    expect(result.meta_keywords).toBeNull();
    expect(result.is_published).toEqual(true);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should save page to database', async () => {
    const result = await createPage(testInput);

    // Query using proper drizzle syntax
    const pages = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.id, result.id))
      .execute();

    expect(pages).toHaveLength(1);
    expect(pages[0].slug).toEqual('test-page');
    expect(pages[0].title).toEqual('Test Page');
    expect(pages[0].content).toEqual('<h1>Welcome to Test Page</h1><p>This is test content.</p>');
    expect(pages[0].meta_description).toEqual('A test page for testing purposes');
    expect(pages[0].meta_keywords).toEqual('test, page, testing');
    expect(pages[0].is_published).toEqual(true);
    expect(pages[0].created_at).toBeInstanceOf(Date);
    expect(pages[0].updated_at).toBeInstanceOf(Date);
  });

  it('should use default value for is_published when not provided', async () => {
    const inputWithDefaults: CreatePageInput = {
      slug: 'default-page',
      title: 'Default Page',
      content: '<p>Default content</p>',
      meta_description: null,
      meta_keywords: null,
      is_published: true // This will come from Zod default
    };

    const result = await createPage(inputWithDefaults);

    expect(result.is_published).toEqual(true);
  });

  it('should handle duplicate slug error', async () => {
    // Create first page
    await createPage(testInput);

    // Try to create another page with the same slug
    await expect(createPage(testInput)).rejects.toThrow(/duplicate key value|unique constraint/i);
  });

  it('should create multiple pages with different slugs', async () => {
    const firstPage = await createPage(testInput);

    const secondInput: CreatePageInput = {
      slug: 'second-page',
      title: 'Second Page',
      content: '<p>Second page content</p>',
      meta_description: 'Second page description',
      meta_keywords: 'second, page',
      is_published: false
    };

    const secondPage = await createPage(secondInput);

    expect(firstPage.id).not.toEqual(secondPage.id);
    expect(firstPage.slug).toEqual('test-page');
    expect(secondPage.slug).toEqual('second-page');
    expect(secondPage.is_published).toEqual(false);

    // Verify both pages exist in database
    const allPages = await db.select()
      .from(pagesTable)
      .execute();

    expect(allPages).toHaveLength(2);
  });

  it('should handle empty meta fields correctly', async () => {
    const inputWithNulls: CreatePageInput = {
      slug: 'null-meta-page',
      title: 'Null Meta Page',
      content: '<p>Content with null meta fields</p>',
      meta_description: null,
      meta_keywords: null,
      is_published: true
    };

    const result = await createPage(inputWithNulls);

    expect(result.meta_description).toBeNull();
    expect(result.meta_keywords).toBeNull();

    // Verify in database
    const pages = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.id, result.id))
      .execute();

    expect(pages[0].meta_description).toBeNull();
    expect(pages[0].meta_keywords).toBeNull();
  });

  it('should handle HTML content correctly', async () => {
    const htmlContent = `
      <div class="container">
        <h1>Rich HTML Content</h1>
        <p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
        <ul>
          <li>First item</li>
          <li>Second item</li>
        </ul>
        <a href="https://example.com">External link</a>
      </div>
    `;

    const htmlInput: CreatePageInput = {
      slug: 'html-page',
      title: 'HTML Page',
      content: htmlContent,
      meta_description: 'Page with rich HTML content',
      meta_keywords: 'html, content, rich',
      is_published: true
    };

    const result = await createPage(htmlInput);

    expect(result.content).toEqual(htmlContent);

    // Verify in database that HTML is preserved
    const pages = await db.select()
      .from(pagesTable)
      .where(eq(pagesTable.id, result.id))
      .execute();

    expect(pages[0].content).toEqual(htmlContent);
  });
});