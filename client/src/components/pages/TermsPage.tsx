import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Terms of Use 📋
        </h1>
        <p className="text-lg text-gray-600">
          Please read these terms carefully before using LoveConnect
        </p>
        <p className="text-sm text-gray-500">
          Last updated: December 15, 2024
        </p>
      </div>

      <Card className="border-pink-100">
        <CardContent className="p-8 space-y-8">
          
          {/* Acceptance */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>✅</span> Acceptance of Terms
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                By downloading, installing, or using the LoveConnect mobile application ("the App"), 
                you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these 
                Terms, please do not use the App.
              </p>
              <p>
                These Terms constitute a legally binding agreement between you and LoveConnect, Inc. 
                ("we," "us," or "our"). We may update these Terms from time to time, and continued 
                use of the App constitutes acceptance of any changes.
              </p>
            </div>
          </section>

          <Separator />

          {/* Eligibility */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>🔞</span> Eligibility
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                You must be at least 18 years old to use LoveConnect. By using the App, you 
                represent and warrant that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You are at least 18 years of age</li>
                <li>You have the legal capacity to enter into these Terms</li>
                <li>You are not prohibited from using the service under applicable law</li>
                <li>You have not been previously banned from using LoveConnect</li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* User Conduct */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>👤</span> User Conduct and Responsibilities
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>You agree to use LoveConnect responsibly and respectfully. You must not:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Create fake profiles or provide false information</li>
                <li>Harass, bully, or threaten other users</li>
                <li>Share inappropriate, offensive, or illegal content</li>
                <li>Spam or send unsolicited commercial messages</li>
                <li>Use the App for commercial purposes without permission</li>
                <li>Attempt to circumvent security measures</li>
                <li>Share personal contact information in public profiles</li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* Account Security */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>🔐</span> Account Security
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                You are responsible for maintaining the security of your account and password. 
                You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use a strong, unique password for your account</li>
                <li>Keep your login credentials confidential</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Log out of your account when using shared devices</li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* Content and Privacy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>📝</span> Content and Privacy
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                By using LoveConnect, you grant us the right to use, modify, and display the 
                content you share on the platform for the purpose of providing our services. 
                This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Profile photos and descriptions</li>
                <li>Messages and interactions (for safety monitoring)</li>
                <li>Usage data for improving our matching algorithm</li>
              </ul>
              <p>
                We respect your privacy and handle your data according to our Privacy Policy. 
                You retain ownership of your content and can delete it at any time.
              </p>
            </div>
          </section>

          <Separator />

          {/* Subscription and Payments */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>💳</span> Subscription and Payments
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                LoveConnect offers both free and premium features. Premium subscriptions:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Are billed through your app store account</li>
                <li>Auto-renew unless cancelled before the renewal date</li>
                <li>Can be cancelled at any time through your device settings</li>
                <li>Do not provide refunds for partial periods</li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* Limitation of Liability */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>⚖️</span> Limitation of Liability
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                LoveConnect is provided "as is" without warranties. We are not responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The conduct or actions of other users</li>
                <li>Any meetings or relationships formed through the App</li>
                <li>Temporary service interruptions or technical issues</li>
                <li>Loss of data or content</li>
              </ul>
              <p>
                You use LoveConnect at your own risk and discretion. Always meet in public 
                places and take appropriate safety precautions.
              </p>
            </div>
          </section>

          <Separator />

          {/* Termination */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>🚪</span> Termination
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                Either party may terminate this agreement at any time. We may suspend or 
                terminate your account if you violate these Terms. Upon termination:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your access to the App will be revoked</li>
                <li>Your profile and data may be deleted</li>
                <li>Premium subscriptions will continue until expiration</li>
                <li>These Terms will remain in effect for applicable provisions</li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* Contact Information */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>📞</span> Contact Us
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                If you have questions about these Terms of Use, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><strong>Email:</strong> legal@loveconnect.app</p>
                <p><strong>Address:</strong> LoveConnect, Inc.<br />
                123 Love Street, Suite 456<br />
                San Francisco, CA 94105</p>
              </div>
            </div>
          </section>

        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500 pt-8">
        By using LoveConnect, you acknowledge that you have read and understood these Terms of Use. 💖
      </div>
    </div>
  );
}