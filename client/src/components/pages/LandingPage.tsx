import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function LandingPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Find Your Perfect Match
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with meaningful relationships through our intelligent matching algorithm. 
              Your love story starts here! 💖
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3">
              📱 Download for iOS
            </Button>
            <Button size="lg" variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-3">
              🤖 Download for Android
            </Button>
          </div>
          
          <div className="pt-8">
            <img 
              src="/api/placeholder/600/400" 
              alt="LoveConnect App Preview" 
              className="mx-auto rounded-2xl shadow-2xl max-w-md w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-800">
              Why Choose LoveConnect? ✨
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience dating like never before with our innovative features designed to help you find genuine connections.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-pink-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Smart Matching</h3>
                <p className="text-gray-600">
                  Our AI-powered algorithm learns your preferences to suggest highly compatible matches.
                </p>
              </CardContent>
            </Card>

            <Card className="border-pink-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Safe & Secure</h3>
                <p className="text-gray-600">
                  Your privacy matters. All profiles are verified and your data is encrypted.
                </p>
              </CardContent>
            </Card>

            <Card className="border-pink-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Fun Conversations</h3>
                <p className="text-gray-600">
                  Break the ice with conversation starters and interactive features.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-white">
              Join Thousands of Happy Couples! 💕
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-pink-100">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">15K+</div>
                <div className="text-pink-100">Successful Matches</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2K+</div>
                <div className="text-pink-100">Happy Couples</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.8★</div>
                <div className="text-pink-100">App Store Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Success Stories 💖
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-pink-100">
              <CardContent className="p-6 space-y-4">
                <p className="text-gray-600 italic">
                  "I found my soulmate on LoveConnect! The matching algorithm really works. 
                  We've been together for 8 months now and couldn't be happier! 😍"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Sarah & Mike</div>
                    <div className="text-sm text-gray-500">New York, NY</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-pink-100">
              <CardContent className="p-6 space-y-4">
                <p className="text-gray-600 italic">
                  "Amazing app! I love how safe and genuine the community is. 
                  Met my fiancé here and we're planning our wedding! ✨"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Emma & David</div>
                    <div className="text-sm text-gray-500">Los Angeles, CA</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="container mx-auto px-4 text-center">
        <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
          <CardContent className="p-12 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Ready to Find Love? 💕
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Download LoveConnect today and start your journey to meaningful connections. 
              Your perfect match is just a swipe away!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3">
                📱 Get it on App Store
              </Button>
              <Button size="lg" variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-3">
                🤖 Get it on Google Play
              </Button>
            </div>
            
            <div className="flex justify-center space-x-4 pt-4">
              <Badge variant="secondary" className="bg-pink-100 text-pink-700">Free to Download</Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">No Hidden Fees</Badge>
              <Badge variant="secondary" className="bg-pink-100 text-pink-700">Safe & Secure</Badge>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}