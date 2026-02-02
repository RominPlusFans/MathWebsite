import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Coffee, Zap, Crown, Check, ArrowRight, Gift, MessageCircle } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Access to all basic content',
    icon: Gift,
    features: [
      'Access to all lecture notes',
      'Basic LaTeX rendering',
      'Community support',
      'Weekly newsletter',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Supporter',
    price: '$5',
    period: '/month',
    description: 'Support the creation of new content',
    icon: Heart,
    features: [
      'Everything in Free',
      'Early access to new content',
      'Discord community access',
      'Name in credits',
      'Downloadable PDFs',
    ],
    cta: 'Become a Supporter',
    featured: true,
  },
  {
    name: 'Premium',
    price: '$15',
    period: '/month',
    description: 'Full learning experience',
    icon: Crown,
    features: [
      'Everything in Supporter',
      '1-on-1 Q&A sessions',
      'Custom problem sets',
      'Priority email support',
      'Exclusive video content',
    ],
    cta: 'Go Premium',
    featured: false,
  },
];

const oneTimeOptions = [
  { amount: 5, description: 'Buy me a coffee' },
  { amount: 10, description: 'Support a new video' },
  { amount: 25, description: 'Fund a full lecture note' },
  { amount: 50, description: 'Sponsor a series' },
];

export function Support() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#1a1a1a] pt-24 pb-16">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4a373]/10 
                        border border-[#d4a373]/30 mb-6">
            <Heart className="w-4 h-4 text-[#d4a373]" />
            <span className="text-sm text-[#d4a373] font-medium">Support the Mission</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Help Us Create More Content
          </h1>
          <p className="text-[#b0b0b0] text-lg max-w-2xl mx-auto">
            Your support helps us create high-quality mathematical content, produce video 
            explanations, and keep the platform accessible to everyone.
          </p>
        </div>

        {/* Subscription Tiers */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Monthly Support</h2>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            style={{ perspective: '1500px' }}
          >
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl p-8 transition-all duration-500 ${
                    tier.featured
                      ? 'bg-[#2a2a2a] border-2 border-[#fbbf24] md:scale-105 md:-translate-y-4'
                      : 'bg-[#2a2a2a] border border-[#404040] hover:border-[#d4a373]'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Featured Badge */}
                  {tier.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#fbbf24] rounded-full">
                      <span className="text-sm font-semibold text-[#1a1a1a] flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                      tier.featured ? 'bg-[#fbbf24]/20' : 'bg-[#d4a373]/10'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${tier.featured ? 'text-[#fbbf24]' : 'text-[#d4a373]'}`}
                    />
                  </div>

                  {/* Name & Price */}
                  <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-[#b0b0b0]">{tier.period}</span>
                  </div>
                  <p className="text-sm text-[#b0b0b0] mb-6">{tier.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3 text-sm">
                        <Check
                          className={`w-5 h-5 flex-shrink-0 ${
                            tier.featured ? 'text-[#fbbf24]' : 'text-[#4ade80]'
                          }`}
                        />
                        <span className="text-[#b0b0b0]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`block w-full py-3 px-6 rounded-lg font-semibold text-center 
                              transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                                tier.featured
                                  ? 'bg-[#fbbf24] text-[#1a1a1a] hover:bg-[#fcd34d]'
                                  : 'bg-[#d4a373] text-[#1a1a1a] hover:bg-[#e4b383]'
                              }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* One-Time Support */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-4">One-Time Support</h2>
          <p className="text-[#b0b0b0] text-center mb-8">
            Prefer to make a one-time contribution? Choose an amount that works for you.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {oneTimeOptions.map((option) => (
              <button
                key={option.amount}
                onClick={() => setSelectedAmount(option.amount)}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  selectedAmount === option.amount
                    ? 'bg-[#d4a373]/10 border-[#d4a373]'
                    : 'bg-[#2a2a2a] border-[#404040] hover:border-[#505050]'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Coffee className="w-5 h-5 text-[#d4a373]" />
                  <span className="text-2xl font-bold text-white">${option.amount}</span>
                </div>
                <p className="text-sm text-[#b0b0b0]">{option.description}</p>
              </button>
            ))}
          </div>

          {selectedAmount && (
            <div className="mt-6 text-center">
              <button className="btn-primary inline-flex items-center gap-2">
                Support ${selectedAmount}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Other Ways to Support */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6 text-center">
            <MessageCircle className="w-10 h-10 text-[#d4a373] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Share Feedback</h3>
            <p className="text-sm text-[#b0b0b0] mb-4">
              Help us improve by sharing your thoughts and suggestions.
            </p>
            <Link
              to="/contact"
              className="text-[#d4a373] hover:text-white transition-colors text-sm"
            >
              Send Feedback →
            </Link>
          </div>

          <div className="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6 text-center">
            <Heart className="w-10 h-10 text-[#d4a373] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Spread the Word</h3>
            <p className="text-sm text-[#b0b0b0] mb-4">
              Share our content with friends, classmates, and colleagues.
            </p>
            <button className="text-[#d4a373] hover:text-white transition-colors text-sm">
              Share Now →
            </button>
          </div>

          <div className="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6 text-center">
            <Zap className="w-10 h-10 text-[#d4a373] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Contribute</h3>
            <p className="text-sm text-[#b0b0b0] mb-4">
              Have expertise to share? Contribute notes or video content.
            </p>
            <Link
              to="/contribute"
              className="text-[#d4a373] hover:text-white transition-colors text-sm"
            >
              Learn More →
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Can I cancel my subscription anytime?',
                a: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through Stripe.',
              },
              {
                q: 'Is there a student discount?',
                a: 'Yes! Students with a valid .edu email can get 50% off any subscription tier. Contact us for details.',
              },
              {
                q: 'How do I access premium content?',
                a: 'Once you subscribe, premium content will be automatically unlocked across the platform.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
                <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                <p className="text-[#b0b0b0] text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
