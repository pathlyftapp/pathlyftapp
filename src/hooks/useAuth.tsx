import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
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
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithLinkedIn: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  connectLinkedIn: () => Promise<void>;
  incrementApplications: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const signInWithLinkedIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'linkedin' });
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const connectLinkedIn = async () => {
    if (!user) return;
    const updatedUser = { ...user, linkedin_connected: true };
    setUser(updatedUser);
    localStorage.setItem('mockUser', JSON.stringify(updatedUser));
  };

  const incrementApplications = async () => {
    if (!user) return;
    const updatedUser = { ...user, applications_used: (user.applications_used || 0) + 1 };
    setUser(updatedUser);
    localStorage.setItem('mockUser', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithLinkedIn,
        signInWithEmail,
        signUpWithEmail,
        logout,
        connectLinkedIn,
        incrementApplications,
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
