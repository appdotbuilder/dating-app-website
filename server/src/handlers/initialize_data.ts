import { db } from '../db';
import { pagesTable, navigationItemsTable } from '../db/schema';
import { eq } from 'drizzle-orm';

const seedData = {
  pages: [
    {
      slug: 'landing',
      title: 'Find Your Perfect Match',
      content: `
        <div class="space-y-8">
          <section>
            <h2 class="text-3xl font-bold mb-4">Welcome to LoveConnect</h2>
            <p class="text-lg mb-6">The modern way to find love. Connect with like-minded people in your area through our intelligent matching system.</p>
            <p class="text-base">Our app uses advanced algorithms to match you with compatible partners based on your interests, values, and relationship goals.</p>
          </section>
          
          <section>
            <h3 class="text-2xl font-semibold mb-4">Key Features</h3>
            <ul class="space-y-2">
              <li>• Smart matching algorithm</li>
              <li>• Real-time messaging and video chat</li>
              <li>• Verified profiles for safety</li>
              <li>• Location-based matching</li>
              <li>• Privacy-focused design</li>
            </ul>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">Download Today</h3>
            <p>Available on iOS and Android. Start your journey to finding meaningful connections today!</p>
          </section>
        </div>
      `,
      meta_description: 'Find your perfect match with LoveConnect - the modern dating app that connects like-minded people.',
      meta_keywords: 'dating app, relationships, love, matching, singles',
      is_published: true
    },
    {
      slug: 'about',
      title: 'About LoveConnect',
      content: `
        <div class="space-y-8">
          <section>
            <h2 class="text-3xl font-bold mb-4">Our Mission</h2>
            <p class="text-lg mb-6">At LoveConnect, we believe that everyone deserves to find meaningful connections and lasting love.</p>
            <p class="text-base mb-4">Founded in 2024, LoveConnect was born from the idea that technology should bring people together, not drive them apart. We've created a platform that prioritizes genuine connections over superficial interactions.</p>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">Our Values</h3>
            <div class="space-y-4">
              <div>
                <h4 class="text-xl font-medium mb-2">Authenticity</h4>
                <p>We encourage users to be their genuine selves, creating an environment where real connections can flourish.</p>
              </div>
              <div>
                <h4 class="text-xl font-medium mb-2">Safety First</h4>
                <p>Your safety and privacy are our top priorities. We implement robust verification and safety measures.</p>
              </div>
              <div>
                <h4 class="text-xl font-medium mb-2">Inclusivity</h4>
                <p>Love knows no boundaries. We welcome people of all backgrounds, orientations, and relationship goals.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">Join Our Community</h3>
            <p>Join millions of users who have found love, friendship, and meaningful connections through LoveConnect. Your perfect match is waiting!</p>
          </section>
        </div>
      `,
      meta_description: 'Learn about LoveConnect\'s mission to help people find meaningful connections and lasting love.',
      meta_keywords: 'about LoveConnect, dating app mission, values, authenticity',
      is_published: true
    },
    {
      slug: 'terms',
      title: 'Terms of Use',
      content: `
        <div class="space-y-8">
          <section>
            <p class="text-sm text-gray-600 mb-6"><strong>Last Updated:</strong> December 2024</p>
            <p class="text-lg mb-6">These Terms of Use govern your use of the LoveConnect mobile application and services.</p>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">1. Acceptance of Terms</h3>
            <p class="mb-4">By accessing and using LoveConnect, you accept and agree to be bound by these Terms of Use.</p>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">2. Eligibility</h3>
            <p class="mb-4">You must be at least 18 years old to use LoveConnect. By using our service, you represent and warrant that you meet this age requirement.</p>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">3. User Accounts</h3>
            <ul class="space-y-2 mb-4">
              <li>• You are responsible for maintaining the confidentiality of your account</li>
              <li>• You must provide accurate and complete information</li>
              <li>• You may not create multiple accounts</li>
              <li>• You may not share your account with others</li>
            </ul>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">4. Prohibited Conduct</h3>
            <p class="mb-2">You agree not to:</p>
            <ul class="space-y-2 mb-4">
              <li>• Use the service for any illegal or unauthorized purpose</li>
              <li>• Harass, abuse, or harm other users</li>
              <li>• Upload false or misleading information</li>
              <li>• Attempt to circumvent our security measures</li>
              <li>• Use automated systems to access the service</li>
            </ul>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">5. Content and Intellectual Property</h3>
            <p class="mb-4">Users retain ownership of their content but grant LoveConnect a license to use, modify, and display it as necessary to provide our services.</p>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">6. Termination</h3>
            <p class="mb-4">We reserve the right to terminate or suspend accounts that violate these terms or for any other reason at our sole discretion.</p>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">7. Contact Us</h3>
            <p>If you have any questions about these Terms of Use, please contact us at legal@loveconnect.app</p>
          </section>
        </div>
      `,
      meta_description: 'LoveConnect Terms of Use - Rules and guidelines for using our dating app service.',
      meta_keywords: 'terms of use, legal, rules, guidelines, LoveConnect',
      is_published: true
    },
    {
      slug: 'privacy',
      title: 'Privacy Policy',
      content: `
        <div class="space-y-8">
          <section>
            <p class="text-sm text-gray-600 mb-6"><strong>Last Updated:</strong> December 2024</p>
            <p class="text-lg mb-6">This Privacy Policy describes how LoveConnect collects, uses, and protects your personal information.</p>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">1. Information We Collect</h3>
            <h4 class="text-xl font-medium mb-2">Information You Provide</h4>
            <ul class="space-y-2 mb-4">
              <li>• Profile information (name, age, photos, bio)</li>
              <li>• Preferences and interests</li>
              <li>• Messages and communications</li>
              <li>• Payment information for premium features</li>
            </ul>
            
            <h4 class="text-xl font-medium mb-2">Information We Collect Automatically</h4>
            <ul class="space-y-2 mb-4">
              <li>• Device information and identifiers</li>
              <li>• Usage data and analytics</li>
              <li>• Location data (when permitted)</li>
              <li>• Log files and technical information</li>
            </ul>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">2. How We Use Your Information</h3>
            <ul class="space-y-2 mb-4">
              <li>• To provide and improve our matching services</li>
              <li>• To facilitate communication between users</li>
              <li>• To ensure safety and prevent fraud</li>
              <li>• To send important updates and notifications</li>
              <li>• To analyze usage patterns and improve our app</li>
            </ul>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">3. Information Sharing</h3>
            <p class="mb-4">We do not sell your personal information. We may share information in the following circumstances:</p>
            <ul class="space-y-2 mb-4">
              <li>• With other users as part of the matching service</li>
              <li>• With service providers who help us operate our app</li>
              <li>• When required by law or to protect safety</li>
              <li>• In connection with a business transfer or merger</li>
            </ul>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">4. Data Security</h3>
            <p class="mb-4">We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits.</p>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">5. Your Rights and Choices</h3>
            <ul class="space-y-2 mb-4">
              <li>• Access and update your profile information</li>
              <li>• Control your privacy settings and visibility</li>
              <li>• Delete your account and associated data</li>
              <li>• Opt out of marketing communications</li>
              <li>• Request a copy of your data</li>
            </ul>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">6. Contact Us</h3>
            <p>For privacy-related questions or concerns, contact us at privacy@loveconnect.app</p>
          </section>
        </div>
      `,
      meta_description: 'LoveConnect Privacy Policy - How we collect, use, and protect your personal information.',
      meta_keywords: 'privacy policy, data protection, personal information, LoveConnect',
      is_published: true
    },
    {
      slug: 'cookies',
      title: 'Cookie Policy',
      content: `
        <div class="space-y-8">
          <section>
            <p class="text-sm text-gray-600 mb-6"><strong>Last Updated:</strong> December 2024</p>
            <p class="text-lg mb-6">This Cookie Policy explains how LoveConnect uses cookies and similar technologies.</p>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">1. What Are Cookies?</h3>
            <p class="mb-4">Cookies are small text files stored on your device when you visit our website or use our mobile app. They help us provide you with a better user experience.</p>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h3>
            
            <h4 class="text-xl font-medium mb-2">Essential Cookies</h4>
            <p class="mb-4">These cookies are necessary for our website to function properly and cannot be disabled. They include:</p>
            <ul class="space-y-2 mb-4">
              <li>• Authentication cookies to keep you logged in</li>
              <li>• Security cookies to protect against fraud</li>
              <li>• Session cookies to maintain your preferences</li>
            </ul>

            <h4 class="text-xl font-medium mb-2">Analytics Cookies</h4>
            <p class="mb-4">These help us understand how users interact with our website:</p>
            <ul class="space-y-2 mb-4">
              <li>• Usage statistics and page views</li>
              <li>• Performance monitoring</li>
              <li>• Error tracking and debugging</li>
            </ul>

            <h4 class="text-xl font-medium mb-2">Functional Cookies</h4>
            <p class="mb-4">These enhance your experience by remembering your preferences:</p>
            <ul class="space-y-2 mb-4">
              <li>• Language and region settings</li>
              <li>• Theme preferences (light/dark mode)</li>
              <li>• Customized interface settings</li>
            </ul>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">3. Third-Party Cookies</h3>
            <p class="mb-4">We may use third-party services that set their own cookies, including:</p>
            <ul class="space-y-2 mb-4">
              <li>• Analytics providers (Google Analytics)</li>
              <li>• Payment processors</li>
              <li>• Customer support tools</li>
              <li>• Social media integrations</li>
            </ul>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">4. Managing Cookies</h3>
            <p class="mb-4">You can control cookies through your browser settings:</p>
            <ul class="space-y-2 mb-4">
              <li>• Block all cookies (may affect functionality)</li>
              <li>• Delete existing cookies</li>
              <li>• Set preferences for specific sites</li>
              <li>• Receive notifications when cookies are set</li>
            </ul>
            <p class="mb-4">Note: Disabling essential cookies may prevent you from using certain features of our service.</p>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">5. Mobile App Data</h3>
            <p class="mb-4">Our mobile app may use similar technologies to cookies, including:</p>
            <ul class="space-y-2 mb-4">
              <li>• Local storage for app preferences</li>
              <li>• Device identifiers for analytics</li>
              <li>• Push notification tokens</li>
            </ul>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">6. Updates to This Policy</h3>
            <p class="mb-4">We may update this Cookie Policy periodically. Changes will be posted on this page with an updated effective date.</p>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">7. Contact Us</h3>
            <p>If you have questions about our use of cookies, contact us at privacy@loveconnect.app</p>
          </section>
        </div>
      `,
      meta_description: 'LoveConnect Cookie Policy - How we use cookies and similar technologies on our website and app.',
      meta_keywords: 'cookie policy, cookies, tracking, website data, LoveConnect',
      is_published: true
    },
    {
      slug: 'help',
      title: 'Help & Support',
      content: `
        <div class="space-y-8">
          <section>
            <h2 class="text-3xl font-bold mb-4">How Can We Help You?</h2>
            <p class="text-lg mb-6">Find answers to common questions and get the support you need to make the most of LoveConnect.</p>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
            
            <div class="space-y-6">
              <div>
                <h4 class="text-xl font-medium mb-2">How does the matching algorithm work?</h4>
                <p class="mb-4">Our smart matching system analyzes your preferences, interests, and behavior to suggest compatible profiles. The more you use the app, the better our recommendations become.</p>
              </div>

              <div>
                <h4 class="text-xl font-medium mb-2">Is LoveConnect free to use?</h4>
                <p class="mb-4">Yes! LoveConnect offers a free tier with basic matching and messaging features. We also offer premium subscriptions with additional features like unlimited likes and advanced filters.</p>
              </div>

              <div>
                <h4 class="text-xl font-medium mb-2">How do I report inappropriate behavior?</h4>
                <p class="mb-4">You can report any user by tapping the three dots on their profile and selecting "Report." We take all reports seriously and investigate them promptly.</p>
              </div>

              <div>
                <h4 class="text-xl font-medium mb-2">Can I change my location?</h4>
                <p class="mb-4">Yes, you can update your location in the app settings. Premium users can also set their location to anywhere in the world with our Passport feature.</p>
              </div>

              <div>
                <h4 class="text-xl font-medium mb-2">How do I delete my account?</h4>
                <p class="mb-4">Go to Settings > Account > Delete Account. Please note that this action is permanent and cannot be undone. All your data will be permanently removed.</p>
              </div>

              <div>
                <h4 class="text-xl font-medium mb-2">Why am I not getting matches?</h4>
                <p class="mb-4">Try updating your profile with recent photos and a compelling bio. Also, consider expanding your age range and distance preferences. Our support team can provide personalized profile tips!</p>
              </div>
            </div>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">Safety Tips</h3>
            <ul class="space-y-2 mb-4">
              <li>• Always meet in public places for first dates</li>
              <li>• Trust your instincts and report suspicious behavior</li>
              <li>• Don't share personal information too quickly</li>
              <li>• Let friends know about your dating plans</li>
              <li>• Use the in-app video chat before meeting in person</li>
            </ul>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">Technical Support</h3>
            <p class="mb-4">Experiencing technical issues? Try these steps:</p>
            <ol class="space-y-2 mb-4 list-decimal list-inside">
              <li>Update the app to the latest version</li>
              <li>Restart your device</li>
              <li>Check your internet connection</li>
              <li>Clear the app cache (Android) or reinstall (iOS)</li>
            </ol>
          </section>

          <section>
            <h3 class="text-2xl font-semibold mb-4">Contact Support</h3>
            <p class="mb-4">Still need help? Our support team is here for you:</p>
            <ul class="space-y-2 mb-4">
              <li>• <strong>Email:</strong> support@loveconnect.app</li>
              <li>• <strong>In-App Support:</strong> Go to Settings > Help & Support</li>
              <li>• <strong>Response Time:</strong> Within 24 hours</li>
            </ul>
            <p>We're committed to helping you find love and have a great experience with LoveConnect!</p>
          </section>
        </div>
      `,
      meta_description: 'Get help with LoveConnect - FAQs, safety tips, and support for your dating app experience.',
      meta_keywords: 'help, support, FAQ, dating app help, LoveConnect support',
      is_published: true
    }
  ],
  navigationItems: [
    { label: 'Home', slug: 'landing', order_index: 0, is_visible: true },
    { label: 'About', slug: 'about', order_index: 1, is_visible: true },
    { label: 'Help', slug: 'help', order_index: 2, is_visible: true },
    { label: 'Privacy', slug: 'privacy', order_index: 3, is_visible: true },
    { label: 'Terms', slug: 'terms', order_index: 4, is_visible: true },
    { label: 'Cookies', slug: 'cookies', order_index: 5, is_visible: true }
  ]
};

export const initializeData = async (): Promise<void> => {
  try {
    // Check if data already exists
    const existingPages = await db.select().from(pagesTable).execute();
    
    if (existingPages.length > 0) {
      console.log('Data already exists, skipping initialization');
      return;
    }

    console.log('🌱 Initializing database with seed data...');

    // Seed pages
    for (const pageData of seedData.pages) {
      await db.insert(pagesTable).values(pageData).execute();
    }
    console.log(`✅ Seeded ${seedData.pages.length} pages`);

    // Seed navigation items
    for (const navItem of seedData.navigationItems) {
      await db.insert(navigationItemsTable).values(navItem).execute();
    }
    console.log(`✅ Seeded ${seedData.navigationItems.length} navigation items`);

    console.log('🎉 Database initialization completed successfully!');
  } catch (error) {
    // If error is duplicate key, data already exists - ignore
    if (error instanceof Error && error.message.includes('duplicate key')) {
      console.log('Data already exists, skipping initialization');
      return;
    }
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};