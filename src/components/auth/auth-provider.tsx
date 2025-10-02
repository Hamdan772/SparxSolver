
"use client";

import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ModernAppShell from '../layout/modern-app-shell';

type MockUser = {
  email: string;
  displayName?: string;
};

type AuthContextType = {
  user: MockUser | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PROTECTED_PAGES = ['/dashboard', '/role-play', '/conversation-starters', '/friendship-advice', '/public-speaking', '/confidence-building', '/achieved-goals', '/progress'];
const PUBLIC_PAGES = ['/'];

const exampleUser: MockUser = { email: 'user@example.com', displayName: 'Example User' };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const session = localStorage.getItem('mockUser');
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;

    const isAuthPage = PROTECTED_PAGES.some(p => pathname.startsWith(p));
    const isPublicPage = PUBLIC_PAGES.includes(pathname);

    if (!user && isAuthPage) {
      router.push('/');
    } else if (user && isPublicPage) {
      router.push('/dashboard');
    }
  }, [user, loading, pathname, router]);

  const signIn = async () => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));
    setUser(exampleUser);
    localStorage.setItem('mockUser', JSON.stringify(exampleUser));
    router.push('/dashboard');
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));
    setUser(null);
    localStorage.removeItem('mockUser');
    router.push('/');
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-background">
        <div className="text-xl text-foreground">Loading...</div>
      </div>
    );
  }
  
  const isAuthPage = PROTECTED_PAGES.some(p => pathname.startsWith(p));
  
  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
        {user && isAuthPage ? <ModernAppShell>{children}</ModernAppShell> : children}
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
