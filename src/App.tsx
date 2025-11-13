import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function AppLayout() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  // Routes that shouldn't have sidebar
  const publicRoutes = ["/", "/auth", "/about"];
  const isPublicRoute = publicRoutes.includes(window.location.pathname);

  if (isPublicRoute || !user) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4">
              <SidebarTrigger className="hover:bg-accent rounded-md" />
              <div className="flex items-center gap-2 flex-1">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">Pathlyft</span>
              </div>
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
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
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="pathlyft-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
