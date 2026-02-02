import { useState } from 'react';
import { useAuth, type UserTier } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { Lock, Crown, Heart, ArrowRight, Sparkles } from 'lucide-react';

interface PaywallProps {
  requiredTier: UserTier;
  children: React.ReactNode;
  preview?: React.ReactNode;
}

export function Paywall({ requiredTier, children, preview }: PaywallProps) {
  const { user, hasAccess, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // User has access - show content
  if (hasAccess(requiredTier)) {
    return <>{children}</>;
  }

  const tierInfo = {
    free: { icon: Lock, name: 'Free', color: 'text-gray-400', bgColor: 'bg-gray-400/10' },
    supporter: { 
      icon: Heart, 
      name: 'Supporter', 
      color: 'text-[#d4a373]', 
      bgColor: 'bg-[#d4a373]/10',
      price: '$5/month'
    },
    premium: { 
      icon: Crown, 
      name: 'Premium', 
      color: 'text-[#fbbf24]', 
      bgColor: 'bg-[#fbbf24]/10',
      price: '$15/month'
    },
  };

  const info = tierInfo[requiredTier];
  const Icon = info.icon;

  return (
    <>
      {/* Preview Content (if provided) */}
      {preview && (
        <div className="relative">
          {preview}
          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
        </div>
      )}

      {/* Paywall Overlay */}
      <div className="relative -mt-16 z-10">
        <div className="bg-[#2a2a2a] border border-[#404040] rounded-2xl p-8 text-center">
          {/* Icon */}
          <div className={`w-16 h-16 mx-auto mb-4 rounded-xl ${info.bgColor} flex items-center justify-center`}>
            <Icon className={`w-8 h-8 ${info.color}`} />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2">
            {isAuthenticated ? 'Upgrade Required' : 'Premium Content'}
          </h3>

          {/* Description */}
          <p className="text-[#b0b0b0] mb-6 max-w-md mx-auto">
            {isAuthenticated 
              ? `This content is exclusive to ${info.name} subscribers. Upgrade your account to unlock it.`
              : `Sign in and subscribe to ${info.name} to access this premium content.`
            }
          </p>

          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {requiredTier === 'supporter' && (
              <>
                <span className="px-3 py-1 text-xs bg-[#1a1a1a] text-[#b0b0b0] rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Early Access
                </span>
                <span className="px-3 py-1 text-xs bg-[#1a1a1a] text-[#b0b0b0] rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  PDF Downloads
                </span>
              </>
            )}
            {requiredTier === 'premium' && (
              <>
                <span className="px-3 py-1 text-xs bg-[#1a1a1a] text-[#b0b0b0] rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  1-on-1 Q&A
                </span>
                <span className="px-3 py-1 text-xs bg-[#1a1a1a] text-[#b0b0b0] rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Custom Problems
                </span>
                <span className="px-3 py-1 text-xs bg-[#1a1a1a] text-[#b0b0b0] rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Exclusive Videos
                </span>
              </>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setShowAuthModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a373] text-[#1a1a1a] 
                     rounded-lg font-semibold hover:bg-[#e4b383] transition-colors"
          >
            {isAuthenticated ? `Upgrade to ${info.name}` : 'Unlock Content'}
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Price */}
          {'price' in info && (
            <p className="mt-4 text-sm text-[#b0b0b0]">
              Starting at <span className={info.color}>{info.price}</span>
            </p>
          )}

          {/* Current tier indicator */}
          {isAuthenticated && user && (
            <p className="mt-4 text-xs text-[#505050]">
              Your current plan: <span className="capitalize">{user.tier}</span>
            </p>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultView={isAuthenticated ? 'upgrade' : 'login'}
        requiredTier={requiredTier}
      />
    </>
  );
}

// Simpler version for inline paywall (e.g., for specific sections)
interface InlinePaywallProps {
  requiredTier: UserTier;
  featureName: string;
}

export function InlinePaywall({ requiredTier, featureName }: InlinePaywallProps) {
  const { hasAccess, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (hasAccess(requiredTier)) return null;

  return (
    <>
      <div 
        onClick={() => setShowAuthModal(true)}
        className="flex items-center gap-3 p-4 bg-[#d4a373]/5 border border-dashed border-[#d4a373]/30 
                 rounded-lg cursor-pointer hover:bg-[#d4a373]/10 transition-colors"
      >
        <Lock className="w-5 h-5 text-[#d4a373]" />
        <div className="flex-1">
          <p className="text-sm text-white">
            {featureName} is locked
          </p>
          <p className="text-xs text-[#b0b0b0]">
            {isAuthenticated ? 'Upgrade to unlock' : 'Sign in to access'}
          </p>
        </div>
        <ArrowRight className="w-4 h-4 text-[#d4a373]" />
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultView={isAuthenticated ? 'upgrade' : 'login'}
        requiredTier={requiredTier}
      />
    </>
  );
}
