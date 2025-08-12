import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schema types
import { 
  createPageInputSchema, 
  updatePageInputSchema, 
  getPageBySlugInputSchema, 
  getPageByIdInputSchema,
  createNavigationItemInputSchema,
  updateNavigationItemInputSchema
} from './schema';

// Import handlers
import { createPage } from './handlers/create_page';
import { getPages, getPublishedPages } from './handlers/get_pages';
import { getPageBySlug } from './handlers/get_page_by_slug';
import { getPageById } from './handlers/get_page_by_id';
import { updatePage } from './handlers/update_page';
import { deletePage } from './handlers/delete_page';
import { createNavigationItem } from './handlers/create_navigation_item';
import { getNavigationItems, getVisibleNavigationItems } from './handlers/get_navigation_items';
import { updateNavigationItem } from './handlers/update_navigation_item';
import { deleteNavigationItem } from './handlers/delete_navigation_item';
import { initializeData } from './handlers/initialize_data';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Page management routes
  createPage: publicProcedure
    .input(createPageInputSchema)
    .mutation(({ input }) => createPage(input)),
  
  getPages: publicProcedure
    .query(() => getPages()),
  
  getPublishedPages: publicProcedure
    .query(() => getPublishedPages()),
  
  getPageBySlug: publicProcedure
    .input(getPageBySlugInputSchema)
    .query(({ input }) => getPageBySlug(input)),
  
  getPageById: publicProcedure
    .input(getPageByIdInputSchema)
    .query(({ input }) => getPageById(input)),
  
  updatePage: publicProcedure
    .input(updatePageInputSchema)
    .mutation(({ input }) => updatePage(input)),
  
  deletePage: publicProcedure
    .input(getPageByIdInputSchema)
    .mutation(({ input }) => deletePage(input)),

  // Navigation management routes
  createNavigationItem: publicProcedure
    .input(createNavigationItemInputSchema)
    .mutation(({ input }) => createNavigationItem(input)),
  
  getNavigationItems: publicProcedure
    .query(() => getNavigationItems()),
  
  getVisibleNavigationItems: publicProcedure
    .query(() => getVisibleNavigationItems()),
  
  updateNavigationItem: publicProcedure
    .input(updateNavigationItemInputSchema)
    .mutation(({ input }) => updateNavigationItem(input)),
  
  deleteNavigationItem: publicProcedure
    .input(getPageByIdInputSchema)
    .mutation(({ input }) => deleteNavigationItem(input)),

  // Initialize data
  initializeData: publicProcedure
    .mutation(() => initializeData()),
});

export type AppRouter = typeof appRouter;

async function start() {
  // Initialize database with seed data on startup
  try {
    await initializeData();
  } catch (error) {
    console.error('Failed to initialize data:', error);
  }

  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();