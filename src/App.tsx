import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import ActivityFeed from "./pages/ActivityFeed";
import Profile from "./pages/Profile";
import Subscription from "./pages/Subscription";
import About from "./pages/About";
import AIJobMatch from "./pages/AIJobMatch";
import JobAlerts from "./pages/JobAlerts";
import ResumeCentre from "./pages/ResumeCentre";
import CoverLetter from "./pages/CoverLetter";
import InspirationCorner from "./pages/InspirationCorner";
import NotFound from "./pages/NotFound";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sparkles, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return null;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

function AppLayout() {
  const { user, loading, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  // Public routes that don't need authentication
  const publicRoutes = ["/", "/auth", "/about"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // Show public routes without sidebar
  if (isPublicRoute) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
      </Routes>
    );
  }

  // Show protected routes with sidebar for authenticated users
  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen={false}>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex h-14 items-center gap-2 sm:gap-4 px-3 sm:px-4">
                <SidebarTrigger className="hover:bg-accent rounded-md -ml-1 sm:ml-0" />
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-bold text-base sm:text-lg truncate">Pathlyft</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <ThemeToggle />
                  <Button variant="ghost" size="icon" onClick={handleLogout} className="h-9 w-9 sm:h-10 sm:w-10">
                    <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
              <div className="container mx-auto p-3 sm:p-4 md:p-6">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/applications" element={<Applications />} />
                  <Route path="/activity" element={<ActivityFeed />} />
                  <Route path="/ai-match" element={<AIJobMatch />} />
                  <Route path="/alerts" element={<JobAlerts />} />
                  <Route path="/resume" element={<ResumeCentre />} />
                  <Route path="/cover-letter" element={<CoverLetter />} />
                  <Route path="/inspiration" element={<InspirationCorner />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/subscription" element={<Subscription />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="pathlyft-theme">
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/*" element={<AppLayout />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
