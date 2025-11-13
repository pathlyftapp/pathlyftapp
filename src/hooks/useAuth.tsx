import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  linkedin_connected: boolean;
  applications_used: number;
  is_subscribed: boolean;
}

interface User extends Profile {
  supabaseUser: SupabaseUser;
}

import { AuthError } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithLinkedIn: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUpWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<void>;
  connectLinkedIn: () => Promise<void>;
  incrementApplications: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session?.user) {
          // Defer profile fetch with setTimeout
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserProfile]);

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;

      if (data && session?.user) {
        setUser({
          id: data.id,
          name: data.name || '',
          email: data.email || '',
          avatar: data.avatar || '',
          linkedin_connected: data.linkedin_connected || false,
          applications_used: data.applications_used || 0,
          is_subscribed: data.is_subscribed || false,
          supabaseUser: session.user,
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  };

  const signInWithLinkedIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const connectLinkedIn = async () => {
    if (!user) return;
    
    const { error } = await supabase
      .from('profiles')
      .update({ linkedin_connected: true })
      .eq('id', user.id);

    if (!error) {
      setUser({ ...user, linkedin_connected: true });
    }
  };

  const incrementApplications = async () => {
    if (!user) return;
    
    const newCount = user.applications_used + 1;
    const { error } = await supabase
      .from('profiles')
      .update({ applications_used: newCount })
      .eq('id', user.id);

    if (!error) {
      setUser({ ...user, applications_used: newCount });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signInWithGoogle, 
      signInWithLinkedIn, 
      signInWithEmail, 
      signUpWithEmail, 
      logout, 
      connectLinkedIn, 
      incrementApplications 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
