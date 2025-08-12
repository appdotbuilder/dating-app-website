import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { LandingPage } from '@/components/pages/LandingPage';
import { AboutPage } from '@/components/pages/AboutPage';
import { TermsPage } from '@/components/pages/TermsPage';
import { PrivacyPage } from '@/components/pages/PrivacyPage';
import { CookiesPage } from '@/components/pages/CookiesPage';
import { HelpPage } from '@/components/pages/HelpPage';
import { trpc } from '@/utils/trpc';
import type { NavigationItem } from '../../server/src/schema';

function App() {
  const [currentSlug, setCurrentSlug] = useState<string>('landing');
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);

  useEffect(() => {
    const loadNavigation = async () => {
      try {
        const items = await trpc.getVisibleNavigationItems.query();
        setNavigationItems(items);
      } catch (error) {
        console.error('Failed to load navigation:', error);
      }
    };
    
    loadNavigation();
  }, []);

  const renderPage = () => {
    switch (currentSlug) {
      case 'landing':
        return <LandingPage />;
      case 'about':
        return <AboutPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'cookies':
        return <CookiesPage />;
      case 'help':
        return <HelpPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Navigation 
        currentSlug={currentSlug} 
        onNavigate={setCurrentSlug}
        navigationItems={navigationItems}
      />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;