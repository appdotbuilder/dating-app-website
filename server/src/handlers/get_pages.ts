import { type Page } from '../schema';

export async function getPages(): Promise<Page[]> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is fetching all pages from the database.
    // It should return both published and unpublished pages for admin use.
    return [];
}

export async function getPublishedPages(): Promise<Page[]> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is fetching only published pages from the database.
    // This is used for public-facing website content.
    return [];
}