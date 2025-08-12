import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Privacy Policy 🔒
        </h1>
        <p className="text-lg text-gray-600">
          Your privacy is important to us. This policy explains how we collect, use, and protect your data.
        </p>
        <p className="text-sm text-gray-500">
          Last updated: December 15, 2024
        </p>
      </div>

      <Card className="border-pink-100">
        <CardContent className="p-8 space-y-8">
          
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>👋</span> Introduction
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                LoveConnect, Inc. ("we," "us," or "our") respects your privacy and is committed 
                to protecting your personal information. This Privacy Policy explains how we 
                collect, use, share, and protect your information when you use our mobile 
                dating application ("LoveConnect" or "the App").
              </p>
              <p>
                By using LoveConnect, you consent to the collection and use of your information 
                as described in this Privacy Policy. If you do not agree with our practices, 
                please do not use our service.
              </p>
            </div>
          </section>

          <Separator />

          {/* Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>📊</span> Information We Collect
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700">Profile Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name, age, and basic demographic information</li>
                  <li>Photos and profile descriptions</li>
                  <li>Preferences and interests</li>
                  <li>Location data (with your permission)</li>
                  <li>Education and occupation details</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700">Usage Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>App interactions and feature usage</li>
                  <li>Messages and communications (for safety purposes)</li>
                  <li>Match preferences and activity</li>
                  <li>Device information and IP address</li>
                  <li>Log data and analytics</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700">Social Media Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Information from connected social accounts (if you choose to link them)</li>
                  <li>Public profile information from social platforms</li>
                  <li>Friend lists (only to prevent matches with existing connections)</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator />

          {/* How We Use Your Information */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>🎯</span> How We Use Your Information
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Create and maintain your profile</li>
                <li>Provide matching recommendations using our algorithm</li>
                <li>Facilitate communication between users</li>
                <li>Improve our services and develop new features</li>
                <li>Ensure safety and prevent fraud or abuse</li>
                <li>Send important updates and notifications</li>
                <li>Provide customer support</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p>
                <strong>We do not sell your personal information to third parties.</strong>
              </p>
            </div>
          </section>

          <Separator />

          {/* Information Sharing */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>🤝</span> When We Share Information
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>We may share your information in the following circumstances:</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">With Other Users</h3>
                  <p className="text-sm">Your profile information is visible to other users as part of the matching process.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Service Providers</h3>
                  <p className="text-sm">With trusted third-party services that help us operate the app (hosting, analytics, payment processing).</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Legal Requirements</h3>
                  <p className="text-sm">When required by law, court order, or to protect safety and prevent harm.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Business Transfers</h3>
                  <p className="text-sm">In connection with mergers, acquisitions, or asset sales (with user notification).</p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Data Security */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>🛡️</span> Data Security
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>We implement industry-standard security measures to protect your information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and monitoring</li>
                <li>Access controls and employee training</li>
                <li>Secure payment processing through certified providers</li>
                <li>Profile verification systems</li>
              </ul>
              <p>
                While we take security seriously, no system is 100% secure. We encourage 
                users to take their own precautions when sharing personal information.
              </p>
            </div>
          </section>

          <Separator />

          {/* Your Rights and Choices */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>⚙️</span> Your Rights and Choices
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>You have the following rights regarding your personal information:</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Access and Portability</h3>
                  <p className="text-sm">Request a copy of your personal data in a portable format.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Correction</h3>
                  <p className="text-sm">Update or correct inaccurate information in your profile settings.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Deletion</h3>
                  <p className="text-sm">Delete your account and associated data at any time through the app settings.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Location Settings</h3>
                  <p className="text-sm">Control location sharing through your device settings.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Communication Preferences</h3>
                  <p className="text-sm">Opt out of marketing communications while retaining essential service notifications.</p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Data Retention */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>📅</span> Data Retention
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>We retain your information for as long as necessary to provide our services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Profile data: Until you delete your account</li>
                <li>Messages: 1 year after account deletion (for safety purposes)</li>
                <li>Usage analytics: 2 years in anonymized form</li>
                <li>Legal compliance data: As required by applicable law</li>
              </ul>
              <p>
                When you delete your account, we remove your profile and personal information 
                within 30 days, except where retention is required for legal or safety reasons.
              </p>
            </div>
          </section>

          <Separator />

          {/* International Transfers */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>🌍</span> International Data Transfers
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                LoveConnect operates globally, and your information may be processed in 
                countries other than your own. We ensure appropriate safeguards are in 
                place for international transfers, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Standard contractual clauses approved by regulators</li>
                <li>Adequacy decisions for certain countries</li>
                <li>Your explicit consent where required</li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* Children's Privacy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>👶</span> Children's Privacy
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                LoveConnect is not intended for users under 18 years of age. We do not 
                knowingly collect personal information from children under 18. If we 
                become aware that we have collected information from a child under 18, 
                we will take steps to delete such information promptly.
              </p>
            </div>
          </section>

          <Separator />

          {/* Contact Information */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>📧</span> Contact Us
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                If you have questions about this Privacy Policy or wish to exercise 
                your rights, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><strong>Email:</strong> privacy@loveconnect.app</p>
                <p><strong>Data Protection Officer:</strong> dpo@loveconnect.app</p>
                <p><strong>Address:</strong> LoveConnect, Inc.<br />
                Privacy Team<br />
                123 Love Street, Suite 456<br />
                San Francisco, CA 94105</p>
              </div>
            </div>
          </section>

        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500 pt-8">
        We're committed to protecting your privacy and being transparent about our practices. 💖
      </div>
    </div>
  );
}