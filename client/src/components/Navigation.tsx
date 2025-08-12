import { Button } from '@/components/ui/button';
import { trpc } from '@/utils/trpc';
import { useState, useEffect, useCallback } from 'react';
import { ThemeToggle } from './ThemeToggle';
import type { NavigationItem } from '../../../server/src/schema';

interface NavigationProps {
  currentSlug?: string;
  onNavigate: (slug: string) => void;
}

export function Navigation({ currentSlug, onNavigate }: NavigationProps) {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadNavigationItems = useCallback(async () => {
    try {
      const items = await trpc.getVisibleNavigationItems.query();
      setNavigationItems(items);
    } catch (error) {
      console.error('Failed to load navigation items:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNavigationItems();
  }, [loadNavigationItems]);

  if (isLoading) {
    return (
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">❤️</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                LoveConnect
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">❤️</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              LoveConnect
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item: NavigationItem) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => onNavigate(item.slug)}
                  className={`text-sm font-medium transition-all duration-200 ${
                    currentSlug === item.slug
                      ? 'text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:bg-clip-text'
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            
            <ThemeToggle />

            <Button 
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Download App
            </Button>
          </div>

          {/* Mobile menu button - simplified for now */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="text-gray-700 dark:text-gray-300"
            >
              Menu
            </Button>
          </div>
        </div>

        {/* Mobile navigation items */}
        <div className="md:hidden mt-4 space-y-2">
          {navigationItems.map((item: NavigationItem) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onNavigate(item.slug)}
              className={`w-full justify-start text-sm font-medium transition-all duration-200 ${
                currentSlug === item.slug
                  ? 'text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:bg-clip-text'
              }`}
            >
              {item.label}
            </Button>
          ))}
          <Button 
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 rounded-full mt-4"
          >
            Download App
          </Button>
        </div>
      </div>
    </nav>
  );
}