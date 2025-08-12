import { serial, text, pgTable, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

// Pages table for storing static content
export const pagesTable = pgTable('pages', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(), // URL-friendly identifier
  title: text('title').notNull(),
  content: text('content').notNull(), // HTML content for the page
  meta_description: text('meta_description'), // Nullable SEO meta description
  meta_keywords: text('meta_keywords'), // Nullable SEO keywords
  is_published: boolean('is_published').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Navigation items table for managing site navigation
export const navigationItemsTable = pgTable('navigation_items', {
  id: serial('id').primaryKey(),
  label: text('label').notNull(), // Display text for navigation
  slug: text('slug').notNull(), // Reference to page slug
  order_index: integer('order_index').notNull().default(0), // Order in navigation menu
  is_visible: boolean('is_visible').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// TypeScript types for the table schemas
export type Page = typeof pagesTable.$inferSelect;
export type NewPage = typeof pagesTable.$inferInsert;
export type NavigationItem = typeof navigationItemsTable.$inferSelect;
export type NewNavigationItem = typeof navigationItemsTable.$inferInsert;

// Important: Export all tables for proper query building
export const tables = { 
  pages: pagesTable, 
  navigationItems: navigationItemsTable 
};