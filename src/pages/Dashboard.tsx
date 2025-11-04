import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { 
  Sparkles, 
  LogOut, 
  Linkedin, 
  Briefcase, 
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Settings,
  Lightbulb
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockApplications = [
  {
    id: "1",
    jobTitle: "Frontend Developer",
    company: "Tech Startup Inc",
    platform: "LinkedIn",
    status: "pending",
    appliedDate: "2025-01-15",
    matchScore: 92,
  },
  {
    id: "2",
    jobTitle: "React Developer",
    company: "Digital Agency",
    platform: "Indeed",
    status: "interviewed",
    appliedDate: "2025-01-10",
    matchScore: 88,
  },
  {
    id: "3",
    jobTitle: "Web Developer",
    company: "E-commerce Co",
    platform: "Upwork",
    status: "rejected",
    appliedDate: "2025-01-05",
    matchScore: 75,
  },
];

const motivationalQuotes = [
  "Your next opportunity is one application away! 🚀",
  "Every application brings you closer to your dream job! 💪",
  "Persistence is key - keep applying! ⭐",
  "Your skills are valuable - let employers see them! 🌟",
  "Success is a journey, not a destination. Keep going! 🎯",
];

const Dashboard = () => {
  const { user, logout, connectLinkedIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [motivation] = useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  if (!user) {
    navigate("/auth");
    return null;
  }

  const freeApplicationsLeft = Math.max(0, 5 - user.applicationsUsed);
  const canApply = user.isSubscribed || freeApplicationsLeft > 0;

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged out",
      description: "Come back soon!",
    });
  };

  const handleConnectLinkedIn = () => {
    connectLinkedIn();
    toast({
      title: "LinkedIn Connected!",
      description: "Your profile data has been synced",
    });
  };

  const handleStartApplying = () => {
    if (!canApply) {
      toast({
        title: "Upgrade Required",
        description: "You've used all free applications. Please subscribe to continue.",
        variant: "destructive",
      });
      navigate("/subscription");
      return;
    }
    navigate("/applications");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "interviewed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "interviewed":
        return "bg-primary/10 text-primary border-primary/20";
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">JobApply AI</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Let's find your dream job today</p>
        </div>

        {/* Motivation Card */}
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="flex items-center gap-3 py-4">
            <Lightbulb className="h-6 w-6 text-primary" />
            <p className="text-sm font-medium">{motivation}</p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Applications Left Card */}
          <Card>
            <CardHeader>
              <CardTitle>Free Applications</CardTitle>
              <CardDescription>
                {user.isSubscribed ? "Unlimited" : `${freeApplicationsLeft} of 5 remaining`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!user.isSubscribed && (
                <>
                  <Progress value={(freeApplicationsLeft / 5) * 100} className="mb-4" />
                  <Link to="/subscription">
                    <Button variant="outline" className="w-full">
                      Upgrade to Unlimited
                    </Button>
                  </Link>
                </>
              )}
              {user.isSubscribed && (
                <Badge className="w-full justify-center py-2">Premium Member</Badge>
              )}
            </CardContent>
          </Card>

          {/* LinkedIn Connection Card */}
          <Card>
            <CardHeader>
              <CardTitle>LinkedIn Profile</CardTitle>
              <CardDescription>
                {user.linkedinConnected ? "Connected" : "Not connected"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!user.linkedinConnected ? (
                <Button 
                  onClick={handleConnectLinkedIn} 
                  variant="outline" 
                  className="w-full"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  Connect LinkedIn
                </Button>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Profile synced successfully</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Apply Card */}
          <Card>
            <CardHeader>
              <CardTitle>AI Job Search</CardTitle>
              <CardDescription>Start applying with AI</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleStartApplying} className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Find & Apply to Jobs
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Recent Applications
            </CardTitle>
            <CardDescription>Track your job application progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{app.jobTitle}</h3>
                      <Badge variant="outline" className={getStatusColor(app.status)}>
                        {getStatusIcon(app.status)}
                        <span className="ml-1 capitalize">{app.status}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{app.company}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-muted-foreground">{app.platform}</span>
                      <span className="text-xs text-muted-foreground">
                        Applied: {new Date(app.appliedDate).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-primary">
                        {app.matchScore}% match
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/applications">
              <Button variant="outline" className="w-full mt-4">
                View All Applications
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
