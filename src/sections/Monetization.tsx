import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Zap, Crown, Heart } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Access to all basic content',
    icon: Star,
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

export function Monetization() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#1a1a1a]">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Support the Journey
          </h2>
          <p
            className={`text-[#b0b0b0] text-lg max-w-xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Choose how you'd like to engage with the content
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          style={{ perspective: '1500px' }}
        >
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 transition-all duration-700 ${
                  tier.featured
                    ? 'bg-[#2a2a2a] border-2 border-[#fbbf24] md:scale-105 md:-translate-y-4'
                    : 'bg-[#2a2a2a] border border-[#404040] hover:border-[#d4a373]'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{
                  transitionDelay: isVisible ? `${200 + index * 150}ms` : '0ms',
                  transformStyle: 'preserve-3d',
                }}
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
                    <li
                      key={featureIndex}
                      className={`flex items-start gap-3 text-sm transition-all duration-500 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{
                        transitionDelay: isVisible
                          ? `${400 + index * 150 + featureIndex * 50}ms`
                          : '0ms',
                      }}
                    >
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
                <Link
                  to="/support"
                  className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 ${
                    tier.featured
                      ? 'bg-[#fbbf24] text-[#1a1a1a] hover:bg-[#fcd34d]'
                      : 'bg-[#d4a373] text-[#1a1a1a] hover:bg-[#e4b383]'
                  } hover:-translate-y-0.5 hover:shadow-lg`}
                >
                  {tier.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-sm text-[#b0b0b0]">
            All plans include a 7-day free trial. No credit card required.
          </p>
          <p className="text-sm text-[#b0b0b0] mt-2">
            Cancel anytime. Questions?{' '}
            <Link to="/support" className="text-[#d4a373] hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
