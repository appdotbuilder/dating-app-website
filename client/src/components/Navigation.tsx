import { Button } from '@/components/ui/button';
import type { NavigationItem } from '../../../server/src/schema';

interface NavigationProps {
  currentSlug: string;
  onNavigate: (slug: string) => void;
  navigationItems: NavigationItem[];
}

export function Navigation({ currentSlug, onNavigate, navigationItems }: NavigationProps) {
  // Default navigation items in case the API doesn't have them set up
  const defaultNavItems = [
    { slug: 'landing', label: 'Home' },
    { slug: 'about', label: 'About' },
    { slug: 'terms', label: 'Terms' },
    { slug: 'privacy', label: 'Privacy' },
    { slug: 'cookies', label: 'Cookies' },
    { slug: 'help', label: 'Help' }
  ];

  // Use API navigation items if available, otherwise fall back to defaults
  const navItems = navigationItems.length > 0 
    ? navigationItems.sort((a, b) => a.order_index - b.order_index)
    : defaultNavItems;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">💕</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              LoveConnect
            </h1>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.slug}
                variant={currentSlug === item.slug ? 'default' : 'ghost'}
                onClick={() => onNavigate(item.slug)}
                className={currentSlug === item.slug 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                  : 'hover:bg-pink-50'
                }
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}