import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type UserTier = 'free' | 'supporter' | 'premium';

export interface User {
  id: string;
  email: string;
  name: string;
  tier: UserTier;
  subscribedUntil?: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  upgradeTier: (tier: UserTier) => void;
  hasAccess: (requiredTier: UserTier) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demonstration
const MOCK_USERS: Record<string, User> = {
  'premium@example.com': {
    id: '1',
    email: 'premium@example.com',
    name: 'Premium User',
    tier: 'premium',
    subscribedUntil: new Date('2025-12-31'),
  },
  'supporter@example.com': {
    id: '2',
    email: 'supporter@example.com',
    name: 'Supporter User',
    tier: 'supporter',
    subscribedUntil: new Date('2025-12-31'),
  },
  'free@example.com': {
    id: '3',
    email: 'free@example.com',
    name: 'Free User',
    tier: 'free',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const mockUser = MOCK_USERS[email.toLowerCase()];
    if (mockUser && password === 'password') {
      setUser(mockUser);
    } else if (email && password) {
      // Create a free user for any other login
      setUser({
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        tier: 'free',
      });
    } else {
      throw new Error('Invalid credentials');
    }
  }, []);

  const signup = useCallback(async (email: string, _password: string, name: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setUser({
      id: Date.now().toString(),
      email,
      name,
      tier: 'free',
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const upgradeTier = useCallback((tier: UserTier) => {
    if (user) {
      setUser({
        ...user,
        tier,
        subscribedUntil: tier !== 'free' ? new Date('2025-12-31') : undefined,
      });
    }
  }, [user]);

  const hasAccess = useCallback((requiredTier: UserTier): boolean => {
    if (!user) return requiredTier === 'free';
    
    const tierLevels: Record<UserTier, number> = {
      free: 0,
      supporter: 1,
      premium: 2,
    };
    
    return tierLevels[user.tier] >= tierLevels[requiredTier];
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        upgradeTier,
        hasAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
