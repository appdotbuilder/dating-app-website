import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Help & Support 🆘
        </h1>
        <p className="text-xl text-gray-600">
          We're here to help! Find answers to common questions and get support for LoveConnect.
        </p>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Need Help Right Away? 🚀</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white h-auto p-4 flex flex-col space-y-2">
                <span className="text-2xl">💬</span>
                <div>
                  <div className="font-semibold">Live Chat</div>
                  <div className="text-xs opacity-90">Available 24/7</div>
                </div>
              </Button>
              
              <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50 h-auto p-4 flex flex-col space-y-2">
                <span className="text-2xl">📧</span>
                <div>
                  <div className="font-semibold">Email Support</div>
                  <div className="text-xs">support@loveconnect.app</div>
                </div>
              </Button>
              
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 h-auto p-4 flex flex-col space-y-2">
                <span className="text-2xl">📱</span>
                <div>
                  <div className="font-semibold">In-App Help</div>
                  <div className="text-xs">Settings → Help Center</div>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Frequently Asked Questions 📝
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          
          {/* Getting Started */}
          <AccordionItem value="getting-started" className="border border-pink-100 rounded-lg px-6">
            <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-pink-600">
              🚀 Getting Started with LoveConnect
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-gray-600">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700">How do I create an account?</h4>
                  <p className="text-sm">Download the app, sign up with your phone number or social media account, and follow the guided setup to create your profile.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">What information do I need to provide?</h4>
                  <p className="text-sm">Basic info like name, age, location, and some photos. You can add more details about your interests and preferences to improve matches.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Is my profile automatically published?</h4>
                  <p className="text-sm">Your profile is only visible to others after you complete setup and enable discovery in your settings.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Matching */}
          <AccordionItem value="matching" className="border border-pink-100 rounded-lg px-6">
            <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-pink-600">
              💕 Matching & Discovery
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-gray-600">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700">How does the matching algorithm work?</h4>
                  <p className="text-sm">Our AI considers your preferences, interests, location, activity patterns, and compatibility factors to suggest the best matches.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Why am I not getting matches?</h4>
                  <p className="text-sm">Try updating your photos, expanding your distance or age range, or being more active on the app. Complete profiles get more matches!</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Can I undo a swipe?</h4>
                  <p className="text-sm">Premium users can use the "Rewind" feature to undo accidental swipes. Free users get one rewind per day.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Messaging */}
          <AccordionItem value="messaging" className="border border-pink-100 rounded-lg px-6">
            <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-pink-600">
              💬 Messaging & Communication
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-gray-600">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700">When can I start messaging someone?</h4>
                  <p className="text-sm">You can message someone once you both have liked each other (created a "match").</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Are there message limits?</h4>
                  <p className="text-sm">No limits on messages with your matches! However, we monitor messages for safety and may restrict accounts that send inappropriate content.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Can I send photos in messages?</h4>
                  <p className="text-sm">Yes, but all media is monitored for safety. Inappropriate content will result in account restrictions.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Safety */}
          <AccordionItem value="safety" className="border border-pink-100 rounded-lg px-6">
            <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-pink-600">
              🛡️ Safety & Privacy
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-gray-600">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700">How do you verify profiles?</h4>
                  <p className="text-sm">We use photo verification, social media linking, and phone number verification. Verified profiles get a blue checkmark.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">How do I report someone?</h4>
                  <p className="text-sm">Tap the menu (•••) on their profile or message thread and select "Report." We investigate all reports within 24 hours.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Can I block someone?</h4>
                  <p className="text-sm">Yes, you can block users from their profile or message thread. Blocked users cannot see your profile or contact you.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Premium Features */}
          <AccordionItem value="premium" className="border border-pink-100 rounded-lg px-6">
            <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-pink-600">
              ⭐ Premium Features & Subscriptions
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-gray-600">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700">What does Premium include?</h4>
                  <p className="text-sm">Unlimited likes, rewinds, see who liked you, boost your profile, advanced filters, and read receipts.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">How much does Premium cost?</h4>
                  <p className="text-sm">Pricing varies by region and subscription length. Check the app for current pricing in your area.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Can I cancel my subscription?</h4>
                  <p className="text-sm">Yes, cancel anytime through your device's subscription settings. Premium features remain active until the end of your billing period.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Technical Issues */}
          <AccordionItem value="technical" className="border border-pink-100 rounded-lg px-6">
            <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-pink-600">
              🔧 Technical Issues
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-gray-600">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700">The app isn't loading properly</h4>
                  <p className="text-sm">Try force-closing and reopening the app, checking your internet connection, or restarting your device.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">I'm not receiving notifications</h4>
                  <p className="text-sm">Check your device notification settings and ensure LoveConnect notifications are enabled in your phone settings.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Photos won't upload</h4>
                  <p className="text-sm">Ensure photos are under 10MB and in JPG/PNG format. Check that the app has camera/photo access permissions.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>

      {/* Safety Tips */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>🔰</span> Dating Safety Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700">🏟️ Meeting in Person</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Always meet in public places first</li>
                <li>Tell a friend about your plans</li>
                <li>Drive yourself or use your own transportation</li>
                <li>Trust your instincts</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700">💬 Online Safety</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Don't share personal information too early</li>
                <li>Be cautious of users asking for money</li>
                <li>Report suspicious behavior</li>
                <li>Video chat before meeting in person</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50">
        <CardContent className="p-8 text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Still Need Help? 💭
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our support team is available 24/7 to help you with any questions or issues. 
            We typically respond to emails within 2 hours and live chat is instant!
          </p>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                💬 Start Live Chat
              </Button>
              <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">
                📧 Email Support
              </Button>
            </div>
            
            <div className="text-sm text-gray-500 space-y-1">
              <p><strong>Email:</strong> support@loveconnect.app</p>
              <p><strong>Response time:</strong> Usually within 2 hours</p>
              <p><strong>Languages:</strong> English, Spanish, French, German</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}