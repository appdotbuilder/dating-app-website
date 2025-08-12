import { z } from 'zod';

// Page schema for static content pages
export const pageSchema = z.object({
  id: z.number(),
  slug: z.string(), // URL-friendly identifier (e.g., 'landing', 'about', 'terms')
  title: z.string(),
  content: z.string(), // HTML content for the page
  meta_description: z.string().nullable(), // SEO meta description
  meta_keywords: z.string().nullable(), // SEO keywords
  is_published: z.boolean(), // Whether the page is publicly visible
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Page = z.infer<typeof pageSchema>;

// Input schema for creating pages
export const createPageInputSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  title: z.string().min(1),
  content: z.string().min(1),
  meta_description: z.string().nullable(),
  meta_keywords: z.string().nullable(),
  is_published: z.boolean().default(true)
});

export type CreatePageInput = z.infer<typeof createPageInputSchema>;

// Input schema for updating pages
export const updatePageInputSchema = z.object({
  id: z.number(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens").optional(),
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  meta_description: z.string().nullable().optional(),
  meta_keywords: z.string().nullable().optional(),
  is_published: z.boolean().optional()
});

export type UpdatePageInput = z.infer<typeof updatePageInputSchema>;

// Input schema for getting a page by slug
export const getPageBySlugInputSchema = z.object({
  slug: z.string().min(1)
});

export type GetPageBySlugInput = z.infer<typeof getPageBySlugInputSchema>;

// Input schema for getting a page by ID
export const getPageByIdInputSchema = z.object({
  id: z.number()
});

export type GetPageByIdInput = z.infer<typeof getPageByIdInputSchema>;

// Navigation menu item schema
export const navigationItemSchema = z.object({
  id: z.number(),
  label: z.string(), // Display text for the navigation item
  slug: z.string(), // Reference to the page slug
  order_index: z.number().int(), // Order in navigation menu
  is_visible: z.boolean(), // Whether to show in navigation
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type NavigationItem = z.infer<typeof navigationItemSchema>;

// Input schema for creating navigation items
export const createNavigationItemInputSchema = z.object({
  label: z.string().min(1),
  slug: z.string().min(1),
  order_index: z.number().int().nonnegative(),
  is_visible: z.boolean().default(true)
});

export type CreateNavigationItemInput = z.infer<typeof createNavigationItemInputSchema>;

// Input schema for updating navigation items
export const updateNavigationItemInputSchema = z.object({
  id: z.number(),
  label: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  order_index: z.number().int().nonnegative().optional(),
  is_visible: z.boolean().optional()
});

export type UpdateNavigationItemInput = z.infer<typeof updateNavigationItemInputSchema>;