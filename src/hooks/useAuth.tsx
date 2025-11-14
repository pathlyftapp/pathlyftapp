import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

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
    // Check for existing mock session in localStorage
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signInWithGoogle = async () => {
    console.log('Mock Google sign-in - Backend not connected');
  };

  const signInWithLinkedIn = async () => {
    console.log('Mock LinkedIn sign-in - Backend not connected');
  };

  const signInWithEmail = async (email: string, password: string) => {
    // Mock authentication
    const mockUser: User = {
      id: 'mock-user-' + Date.now(),
      email: email,
      name: email.split('@')[0],
      avatar: '',
      linkedin_connected: false,
      applications_used: 0,
      is_subscribed: false,
    };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    navigate('/dashboard');
    return { error: null };
  };

  const signUpWithEmail = async (email: string, password: string) => {
    // Mock sign up
    return signInWithEmail(email, password);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('mockUser');
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
