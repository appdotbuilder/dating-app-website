import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Cookies Policy 🍪
        </h1>
        <p className="text-lg text-gray-600">
          Learn how we use cookies and similar technologies to improve your LoveConnect experience.
        </p>
        <p className="text-sm text-gray-500">
          Last updated: December 15, 2024
        </p>
      </div>

      <Card className="border-pink-100">
        <CardContent className="p-8 space-y-8">
          
          {/* What are Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>🍪</span> What Are Cookies?
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                Cookies are small text files that are stored on your device when you visit 
                websites or use mobile applications. They help us provide you with a better 
                experience by remembering your preferences and understanding how you use our service.
              </p>
              <p>
                In addition to cookies, LoveConnect may use similar technologies such as:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Web beacons:</strong> Small graphics that track user engagement</li>
                <li><strong>Local storage:</strong> Data stored directly on your device</li>
                <li><strong>Mobile SDKs:</strong> Software development kits for app analytics</li>
                <li><strong>Device identifiers:</strong> Unique identifiers for mobile devices</li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* How We Use Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>🎯</span> How We Use Cookies
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>LoveConnect uses cookies and similar technologies for several purposes:</p>
              
              <div className="space-y-4">
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">✨ Essential Functionality</h3>
                  <p className="text-sm">
                    These cookies are necessary for the app to function properly. They enable 
                    core features like user authentication, security, and basic app navigation.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">📊 Analytics & Performance</h3>
                  <p className="text-sm">
                    We use these to understand how users interact with LoveConnect, which 
                    features are popular, and how we can improve the matching experience.
                  </p>
                </div>
                
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">⚙️ Personalization</h3>
                  <p className="text-sm">
                    These help us remember your preferences, settings, and provide personalized 
                    match recommendations based on your activity.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">📱 Marketing & Advertising</h3>
                  <p className="text-sm">
                    Used to show relevant ads and measure campaign effectiveness. These help 
                    us reach potential users who might be interested in LoveConnect.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Types of Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>📋</span> Types of Cookies We Use
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Category</th>
                      <th className="text-left p-3 font-semibold">Purpose</th>
                      <th className="text-left p-3 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-3 font-medium">Strictly Necessary</td>
                      <td className="p-3">Authentication, security, basic functionality</td>
                      <td className="p-3">Session/1 year</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Performance</td>
                      <td className="p-3">App performance monitoring, error tracking</td>
                      <td className="p-3">30 days - 2 years</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Analytics</td>
                      <td className="p-3">Usage statistics, feature popularity</td>
                      <td className="p-3">1-2 years</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Personalization</td>
                      <td className="p-3">User preferences, matching algorithm</td>
                      <td className="p-3">1 year</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Marketing</td>
                      <td className="p-3">Ad targeting, campaign measurement</td>
                      <td className="p-3">30 days - 1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <Separator />

          {/* Third-Party Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>🤝</span> Third-Party Services
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                LoveConnect works with trusted third-party services that may also set cookies 
                on your device. These include:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">📊 Analytics Providers</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Google Analytics - Usage statistics and user behavior</li>
                    <li>Mixpanel - Event tracking and user engagement</li>
                    <li>Firebase - App performance and crash reporting</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">📱 Advertising Networks</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Facebook Ads - Social media advertising</li>
                    <li>Google Ads - Search and display advertising</li>
                    <li>Apple Search Ads - App Store advertising</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">💳 Payment Processors</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Stripe - Secure payment processing</li>
                    <li>App Store/Google Play - In-app purchase processing</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">🛠️ Support Tools</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Intercom - Customer support chat</li>
                    <li>Zendesk - Help desk functionality</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Managing Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>⚙️</span> Managing Your Cookie Preferences
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                You have several options for controlling cookies and similar technologies:
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">📱 Mobile App Settings</h3>
                  <p className="text-sm mb-2">
                    You can control certain preferences within the LoveConnect app:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Go to Settings → Privacy → Analytics</li>
                    <li>Toggle analytics and advertising preferences</li>
                    <li>Manage location services in your device settings</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">📲 Device Settings</h3>
                  <p className="text-sm mb-2">
                    Control advertising and tracking through your device:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li><strong>iOS:</strong> Settings → Privacy & Security → Tracking</li>
                    <li><strong>Android:</strong> Settings → Privacy → Ads</li>
                    <li>Enable "Limit Ad Tracking" or "Opt out of Ads Personalization"</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">🌐 Browser Settings</h3>
                  <p className="text-sm mb-2">
                    If you access LoveConnect through a web browser:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Most browsers allow you to block or delete cookies</li>
                    <li>Enable "Do Not Track" requests</li>
                    <li>Use private/incognito browsing modes</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Important:</strong> Blocking certain cookies may limit functionality 
                  and affect your LoveConnect experience. Essential cookies are necessary for 
                  core app features and cannot be disabled.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Updates to Policy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>🔄</span> Changes to This Policy
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                We may update this Cookies Policy from time to time to reflect changes in 
                our practices or for legal and regulatory reasons. When we make significant 
                changes, we will:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Update the "Last updated" date at the top of this policy</li>
                <li>Notify users through the app or email when appropriate</li>
                <li>Provide an opportunity to review and accept major changes</li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* Contact Information */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>📞</span> Questions About Cookies?
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                If you have questions about our use of cookies or this policy, 
                please don't hesitate to reach out:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><strong>Email:</strong> privacy@loveconnect.app</p>
                <p><strong>Subject line:</strong> "Cookies Policy Question"</p>
                <p><strong>Support:</strong> Available through the app's Help section</p>
              </div>
            </div>
          </section>

        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500 pt-8">
        We use cookies to make your LoveConnect experience sweeter! 🍪💕
      </div>
    </div>
  );
}