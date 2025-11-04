import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  linkedinConnected: boolean;
  applicationsUsed: number;
  isSubscribed: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  connectLinkedIn: () => void;
  incrementApplications: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah.johnson@byupathway.edu",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  linkedinConnected: false,
  applicationsUsed: 2,
  isSubscribed: false,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    setUser({
      ...mockUser,
      email,
      name: email.split("@")[0].replace(".", " ").replace(/\b\w/g, l => l.toUpperCase()),
    });
  };

  const logout = () => {
    setUser(null);
  };

  const connectLinkedIn = () => {
    if (user) {
      setUser({ ...user, linkedinConnected: true });
    }
  };

  const incrementApplications = () => {
    if (user) {
      setUser({ ...user, applicationsUsed: user.applicationsUsed + 1 });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, connectLinkedIn, incrementApplications }}>
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
