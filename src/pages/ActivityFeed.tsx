import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { 
  Sparkles, 
  ArrowLeft,
  Briefcase,
  TrendingUp,
  Users,
  Award,
  Bell,
  Building2,
  CheckCircle2,
  Clock,
  UserCheck
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockActivityItems = [
  {
    id: "1",
    type: "job_match",
    title: "New Job Match Found!",
    description: "Senior React Developer at TechCorp matches your profile at 95%",
    company: "TechCorp Inc",
    timestamp: "2 hours ago",
    icon: Briefcase,
    color: "text-primary"
  },
  {
    id: "2",
    type: "application_update",
    title: "Application Status Updated",
    description: "Your application for Frontend Developer at Digital Agency moved to interview stage",
    company: "Digital Agency",
    timestamp: "5 hours ago",
    icon: CheckCircle2,
    color: "text-success"
  },
  {
    id: "3",
    type: "recommendation",
    title: "Employee Success Story",
    description: "Sarah M. just got hired at Google through Pathlyft! 🎉",
    company: "Google",
    timestamp: "1 day ago",
    icon: Award,
    color: "text-accent"
  },
  {
    id: "4",
    type: "placement",
    title: "Successful Placement",
    description: "5 BYU Pathway students placed this week across top companies",
    timestamp: "2 days ago",
    icon: Users,
    color: "text-primary"
  },
  {
    id: "5",
    type: "job_match",
    title: "Trending Opportunities",
    description: "15 new remote opportunities matching your skills posted today",
    timestamp: "2 days ago",
    icon: TrendingUp,
    color: "text-warning"
  },
  {
    id: "6",
    type: "application_update",
    title: "Application Viewed",
    description: "Microsoft recruiter viewed your application for Cloud Engineer",
    company: "Microsoft",
    timestamp: "3 days ago",
    icon: Clock,
    color: "text-muted-foreground"
  },
  {
    id: "7",
    type: "recommendation",
    title: "Profile Boost",
    description: "Your profile was recommended to 12 hiring managers this week",
    timestamp: "4 days ago",
    icon: UserCheck,
    color: "text-primary"
  },
  {
    id: "8",
    type: "job_match",
    title: "New Job Match Found!",
    description: "Full Stack Developer at StartupHub matches your profile at 88%",
    company: "StartupHub",
    timestamp: "5 days ago",
    icon: Briefcase,
    color: "text-primary"
  },
  {
    id: "9",
    type: "placement",
    title: "Team Announcement",
    description: "Pathlyft reached 1,000 successful placements milestone!",
    timestamp: "1 week ago",
    icon: Award,
    color: "text-accent"
  },
];

const ActivityFeed = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Bell className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Activity Feed</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
            All Updates
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
            Job Matches
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
            Applications
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
            Success Stories
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
            Placements
          </Badge>
        </div>

        {/* Activity Stream */}
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {mockActivityItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Card 
                  key={item.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary/20 hover:border-l-primary"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className={`flex-shrink-0 ${item.color}`}>
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <IconComponent className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{item.title}</h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {item.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        {item.company && (
                          <div className="flex items-center gap-2 mt-3">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{item.company}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ActivityFeed;
