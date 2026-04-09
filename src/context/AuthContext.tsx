import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { supabase } from '../lib/supabase';
import type { AuthUser } from '../types';

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>; 
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.getSession();
        if (isMounted) {
          if (error) {
            console.error('Auth error:', error);
            setUser(null);
          } else {
            const sessionUser = data.session?.user;
            setUser(sessionUser ? { id: sessionUser.id, email: sessionUser.email ?? '' } : null);
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load session:', err);
        if (isMounted) {
          setUser(null);
          setIsLoading(false);
        }
      }
    }

    loadSession();

    let unsubscribe: (() => void) | undefined;

    try {
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        const sessionUser = session?.user;
        setUser(sessionUser ? { id: sessionUser.id, email: sessionUser.email ?? '' } : null);
      });
      unsubscribe = listener?.subscription.unsubscribe;
    } catch (err) {
      console.error('Failed to set up auth listener:', err);
    }

    return () => {
      isMounted = false;
      unsubscribe?.();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      signIn: async (email: string, password: string) => {
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          return { error: error.message };
        }
        const sessionUser = data.user;
        setUser(sessionUser ? { id: sessionUser.id, email: sessionUser.email ?? '' } : null);
        return { error: undefined };
      },
      signUp: async (email: string, password: string) => {
        const { error, data } = await supabase.auth.signUp({ email, password });
        if (error) {
          return { error: error.message };
        }
        const sessionUser = data.user;
        setUser(sessionUser ? { id: sessionUser.id, email: sessionUser.email ?? '' } : null);
        return { error: undefined };
      },
      signOut: async () => {
        await supabase.auth.signOut();
        setUser(null);
      },
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
