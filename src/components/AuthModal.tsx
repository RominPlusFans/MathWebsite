import { useState } from 'react';
import { useAuth, type UserTier } from '@/contexts/AuthContext';
import { X, Mail, Lock, User, Check, Crown, Heart, Star } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'signup' | 'upgrade';
  requiredTier?: UserTier;
}

export function AuthModal({ 
  isOpen, 
  onClose, 
  defaultView = 'login',
  requiredTier 
}: AuthModalProps) {
  const [view, setView] = useState<'login' | 'signup' | 'upgrade'>(defaultView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState<UserTier>('supporter');
  
  const { login, signup, upgradeTier } = useAuth();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      onClose();
    } catch {
      setError('Invalid email or password. Try free@example.com / password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await signup(email, password, name);
      onClose();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = () => {
    upgradeTier(selectedTier);
    onClose();
  };

  const tierInfo = {
    free: { icon: Star, name: 'Free', price: '$0', color: 'text-gray-400' },
    supporter: { icon: Heart, name: 'Supporter', price: '$5/mo', color: 'text-[#d4a373]' },
    premium: { icon: Crown, name: 'Premium', price: '$15/mo', color: 'text-[#fbbf24]' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#2a2a2a] border border-[#404040] rounded-2xl w-full max-w-md overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#b0b0b0] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8">
          {view === 'login' && (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-[#b0b0b0] mb-6">Sign in to access your account</p>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#b0b0b0] mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#505050]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#404040] rounded-lg 
                               text-white placeholder:text-[#505050] 
                               focus:outline-none focus:border-[#d4a373] transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-[#b0b0b0] mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#505050]" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#404040] rounded-lg 
                               text-white placeholder:text-[#505050] 
                               focus:outline-none focus:border-[#d4a373] transition-colors"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#d4a373] text-[#1a1a1a] rounded-lg font-semibold
                           hover:bg-[#e4b383] transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#b0b0b0]">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setView('signup')}
                    className="text-[#d4a373] hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>

              {/* Demo credentials */}
              <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg">
                <p className="text-xs text-[#b0b0b0] mb-2">Demo accounts (password: "password"):</p>
                <div className="space-y-1 text-xs">
                  <button 
                    onClick={() => setEmail('premium@example.com')}
                    className="block text-[#d4a373] hover:underline"
                  >
                    premium@example.com (Premium)
                  </button>
                  <button 
                    onClick={() => setEmail('supporter@example.com')}
                    className="block text-[#d4a373] hover:underline"
                  >
                    supporter@example.com (Supporter)
                  </button>
                  <button 
                    onClick={() => setEmail('free@example.com')}
                    className="block text-[#d4a373] hover:underline"
                  >
                    free@example.com (Free)
                  </button>
                </div>
              </div>
            </>
          )}

          {view === 'signup' && (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-[#b0b0b0] mb-6">Start your learning journey</p>
              
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#b0b0b0] mb-2">Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#505050]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#404040] rounded-lg 
                               text-white placeholder:text-[#505050] 
                               focus:outline-none focus:border-[#d4a373] transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-[#b0b0b0] mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#505050]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#404040] rounded-lg 
                               text-white placeholder:text-[#505050] 
                               focus:outline-none focus:border-[#d4a373] transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-[#b0b0b0] mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#505050]" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#404040] rounded-lg 
                               text-white placeholder:text-[#505050] 
                               focus:outline-none focus:border-[#d4a373] transition-colors"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#d4a373] text-[#1a1a1a] rounded-lg font-semibold
                           hover:bg-[#e4b383] transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Creating account...' : 'Create Free Account'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#b0b0b0]">
                  Already have an account?{' '}
                  <button
                    onClick={() => setView('login')}
                    className="text-[#d4a373] hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </>
          )}

          {view === 'upgrade' && (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">Upgrade Required</h2>
              <p className="text-[#b0b0b0] mb-6">
                This content requires a {requiredTier && tierInfo[requiredTier].name} subscription.
              </p>

              <div className="space-y-3 mb-6">
                {(Object.keys(tierInfo) as UserTier[]).filter(t => t !== 'free').map((tier) => {
                  const info = tierInfo[tier];
                  const Icon = info.icon;
                  return (
                    <button
                      key={tier}
                      onClick={() => setSelectedTier(tier)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        selectedTier === tier
                          ? 'bg-[#d4a373]/10 border-[#d4a373]'
                          : 'bg-[#1a1a1a] border-[#404040] hover:border-[#505050]'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedTier === tier ? 'bg-[#d4a373]/20' : 'bg-[#2a2a2a]'
                      }`}>
                        <Icon className={`w-5 h-5 ${info.color}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-white">{info.name}</p>
                        <p className="text-sm text-[#b0b0b0]">{info.price}</p>
                      </div>
                      {selectedTier === tier && (
                        <Check className="w-5 h-5 text-[#d4a373]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleUpgrade}
                className="w-full py-3 bg-[#d4a373] text-[#1a1a1a] rounded-lg font-semibold
                         hover:bg-[#e4b383] transition-colors"
              >
                Upgrade to {tierInfo[selectedTier].name}
              </button>

              <p className="mt-4 text-center text-xs text-[#b0b0b0]">
                This is a demo. In production, this would connect to Stripe.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
