import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { trpc } from '@/utils/trpc';
import { useState, useEffect, useCallback } from 'react';
import { Navigation } from './components/Navigation';
import { ThemeProvider } from './components/ThemeProvider';
import { Download, Heart, Shield, Users, Zap, Star, ArrowRight } from 'lucide-react';
import type { Page } from '../../server/src/schema';

function AppContent() {
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [currentSlug, setCurrentSlug] = useState<string>('landing');
  const [isLoading, setIsLoading] = useState(true);

  const loadPages = useCallback(async () => {
    try {
      const result = await trpc.getPublishedPages.query();
      
      // If no pages exist, initialize the database
      if (result.length === 0) {
        try {
          await trpc.initializeData.mutate();
          // Retry loading pages after initialization
          const newResult = await trpc.getPublishedPages.query();
          setPages(newResult);
          
          const landingPage = newResult.find((p: Page) => p.slug === 'landing') || newResult[0];
          if (landingPage) {
            setCurrentPage(landingPage);
            setCurrentSlug(landingPage.slug);
          }
        } catch (initError) {
          console.error('Failed to initialize data:', initError);
        }
      } else {
        setPages(result);
        
        // Set initial page
        const landingPage = result.find((p: Page) => p.slug === 'landing') || result[0];
        if (landingPage) {
          setCurrentPage(landingPage);
          setCurrentSlug(landingPage.slug);
        }
      }
    } catch (error) {
      console.error('Failed to load pages:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPages();
  }, [loadPages]);

  const handleNavigate = async (slug: string) => {
    try {
      const page = await trpc.getPageBySlug.query({ slug });
      if (page) {
        setCurrentPage(page);
        setCurrentSlug(slug);
      } else {
        // Handle case where page doesn't exist
        setCurrentPage(null);
        setCurrentSlug(slug);
      }
    } catch (error) {
      console.error('Failed to load page:', error);
      setCurrentPage(null);
      setCurrentSlug(slug);
    }
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10 dark:from-pink-500/5 dark:to-purple-600/5"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <Heart className="w-10 h-10 text-white" fill="currentColor" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Find Your Perfect Match
            </h1>
            <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with like-minded people in your area. Swipe, match, and start meaningful conversations with LoveConnect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-pink-300 dark:border-pink-600 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:border-pink-400 dark:hover:border-pink-500"
              >
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">LoveConnect?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the features that make finding love easier and more enjoyable than ever before.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Smart Matching</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our advanced algorithm finds compatible matches based on your interests, values, and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Safe & Secure</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your privacy and safety are our top priorities with verified profiles and secure messaging.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Instant Connect</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Start conversations instantly with our real-time messaging and video chat features.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real people, real connections, real love stories made possible with LoveConnect.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Sarah & Mike", story: "We matched on LoveConnect and had our first date within a week. Two years later, we're happily married!" },
              { name: "Emma & James", story: "The smart matching feature really works! We had so much in common from day one." },
              { name: "Lisa & David", story: "I was skeptical about dating apps, but LoveConnect felt different. Found my soulmate here!" }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{testimonial.story}"</p>
                  <p className="font-semibold text-gray-900 dark:text-white">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Find Love?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join millions of people who have found meaningful connections on LoveConnect. Your perfect match is just a swipe away.
          </p>
          <Button 
            size="lg"
            className="bg-white text-pink-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <Download className="w-5 h-5 mr-2" />
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );

  const renderPageContent = (page: Page) => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-12 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{page.title}</h1>
            {page.meta_description && (
              <p className="text-xl text-white/90 max-w-2xl mx-auto">{page.meta_description}</p>
            )}
          </div>
          
          <div className="px-8 py-12">
            <div 
              className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 prose-headings:text-gray-900 dark:prose-headings:text-white prose-strong:text-gray-900 dark:prose-strong:text-white prose-a:text-pink-600 dark:prose-a:text-pink-400 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navigation currentSlug={currentSlug} onNavigate={handleNavigate} />
      
      <main>
        {currentPage ? (
          currentSlug === 'landing' ? renderLandingPage() : renderPageContent(currentPage)
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
              <Button 
                onClick={() => handleNavigate('landing')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-full"
              >
                Go Home
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;