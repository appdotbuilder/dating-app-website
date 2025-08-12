import { Card, CardContent } from '@/components/ui/card';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          About LoveConnect 💖
        </h1>
        <p className="text-xl text-gray-600">
          Connecting hearts, building relationships, creating lasting love stories since 2020.
        </p>
      </div>

      {/* Our Story */}
      <Card className="border-pink-100">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>✨</span> Our Story
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              LoveConnect was born from a simple belief: everyone deserves to find meaningful connections 
              and lasting love. Founded in 2020 by a team of relationship experts, technologists, and 
              hopeless romantics, we set out to create a dating platform that prioritizes genuine 
              compatibility over superficial interactions.
            </p>
            <p>
              What started as a passion project has grown into a thriving community of over 50,000 
              active users who have collectively formed thousands of meaningful relationships. Our 
              success stories continue to inspire us every day, reminding us why we do what we do.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Our Mission */}
      <Card className="border-purple-100">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>🎯</span> Our Mission
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              At LoveConnect, our mission is to foster authentic relationships by connecting people 
              based on shared values, interests, and life goals. We believe that true compatibility 
              goes beyond surface-level attraction – it's about finding someone who truly understands 
              and complements you.
            </p>
            <p>
              We're committed to creating a safe, inclusive, and respectful environment where people 
              from all backgrounds can find love, friendship, and companionship. Our platform is 
              designed to encourage meaningful conversations and genuine connections.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Our Values */}
      <Card className="border-pink-100">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>💝</span> Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <span>🔒</span> Privacy & Safety
              </h3>
              <p className="text-gray-600 text-sm">
                Your personal information and interactions are protected with industry-leading 
                security measures. We verify all profiles and actively monitor for inappropriate behavior.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <span>🌈</span> Inclusivity
              </h3>
              <p className="text-gray-600 text-sm">
                Love knows no boundaries. We welcome people of all orientations, backgrounds, 
                and identities, creating a space where everyone can find their perfect match.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <span>🧠</span> Smart Technology
              </h3>
              <p className="text-gray-600 text-sm">
                Our AI-powered matching algorithm continuously learns from user interactions 
                to provide better, more compatible suggestions over time.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <span>❤️</span> Genuine Connections
              </h3>
              <p className="text-gray-600 text-sm">
                We encourage authentic interactions and meaningful conversations, moving beyond 
                superficial judgments to help you find someone truly compatible.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Our Team */}
      <Card className="border-purple-100">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>👥</span> Our Team
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Behind LoveConnect is a diverse team of relationship experts, software engineers, 
              designers, and customer success specialists who are passionate about helping people 
              find love. Many of our team members have found their own relationships through 
              online dating, giving us firsthand insight into what makes the experience successful.
            </p>
            <p>
              We're based in San Francisco but work with talented individuals from around the 
              world. Our multicultural team brings different perspectives on love and relationships, 
              helping us create a platform that works for everyone.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
        <CardContent className="p-8 space-y-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Get In Touch 📬
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Have questions, feedback, or just want to share your success story? 
              We'd love to hear from you!
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> hello@loveconnect.app</p>
              <p><strong>Support:</strong> support@loveconnect.app</p>
              <p><strong>Press Inquiries:</strong> press@loveconnect.app</p>
            </div>
            <p className="text-sm text-gray-500 pt-4">
              Follow us on social media for dating tips, success stories, and app updates! 
              📱✨
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}