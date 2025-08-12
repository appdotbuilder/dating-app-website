import { db } from '../db';
import { pagesTable } from '../db/schema';
import type { CreatePageInput, Page } from '../schema';

export const createPage = async (input: CreatePageInput): Promise<Page> => {
  try {
    const result = await db.insert(pagesTable)
      .values({
        slug: input.slug,
        title: input.title,
        content: input.content,
        meta_description: input.meta_description,
        meta_keywords: input.meta_keywords,
        is_published: input.is_published
      })
      .returning()
      .execute();

    return result[0];
  } catch (error) {
    console.error('Page creation failed:', error);
    throw error;
  }
};