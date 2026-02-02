import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { User, LogOut, Crown, Settings, ChevronDown } from 'lucide-react';

export function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated) {
    return (
      <>
        <button
          onClick={() => setShowAuthModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-[#b0b0b0] hover:text-white transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="hidden sm:inline">Sign In</span>
        </button>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultView="login"
        />
      </>
    );
  }

  const tierColors = {
    free: 'text-gray-400',
    supporter: 'text-[#d4a373]',
    premium: 'text-[#fbbf24]',
  };

  const tierBadges = {
    free: '',
    supporter: 'bg-[#d4a373]/10 text-[#d4a373]',
    premium: 'bg-[#fbbf24]/10 text-[#fbbf24]',
  };

  return (
    <>
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2a2a2a] transition-colors"
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#d4a373]/20 flex items-center justify-center">
            <span className="text-sm font-medium text-[#d4a373]">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Name & Tier */}
          <div className="hidden sm:block text-left">
            <p className="text-sm text-white leading-tight">{user?.name}</p>
            <p className={`text-xs capitalize ${tierColors[user?.tier || 'free']}`}>
              {user?.tier}
            </p>
          </div>

          <ChevronDown className={`w-4 h-4 text-[#b0b0b0] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-[#2a2a2a] border border-[#404040] 
                        rounded-xl shadow-xl overflow-hidden z-50">
            {/* User Info */}
            <div className="p-4 border-b border-[#404040]">
              <p className="text-white font-medium">{user?.name}</p>
              <p className="text-sm text-[#b0b0b0]">{user?.email}</p>
              <span className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full capitalize
                             ${tierBadges[user?.tier || 'free']}`}>
                {user?.tier} Plan
              </span>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {user?.tier !== 'premium' && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left
                           text-[#fbbf24] hover:bg-[#fbbf24]/10 transition-colors"
                >
                  <Crown className="w-4 h-4" />
                  <span className="text-sm">Upgrade</span>
                </button>
              )}

              <button
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left
                         text-[#b0b0b0] hover:bg-[#404040] hover:text-white transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">Settings</span>
              </button>

              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left
                         text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultView="upgrade"
      />
    </>
  );
}
