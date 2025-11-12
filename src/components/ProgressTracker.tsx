import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Target, 
  Zap,
  CheckCircle2
} from "lucide-react";

interface ProgressTrackerProps {
  applicationsSubmitted: number;
  interviewsScheduled: number;
  offersReceived: number;
  profileCompletion: number;
}

const ProgressTracker = ({ 
  applicationsSubmitted = 0, 
  interviewsScheduled = 0, 
  offersReceived = 0,
  profileCompletion = 0 
}: ProgressTrackerProps) => {
  
  // Calculate journey progress (0-100)
  const calculateJourneyProgress = () => {
    const weights = {
      applications: applicationsSubmitted * 10,
      interviews: interviewsScheduled * 25,
      offers: offersReceived * 40,
      profile: profileCompletion * 0.25
    };
    return Math.min(100, weights.applications + weights.interviews + weights.offers + weights.profile);
  };

  const journeyProgress = calculateJourneyProgress();

  const milestones = [
    {
      label: "Getting Started",
      threshold: 0,
      achieved: true,
      icon: CheckCircle2,
      color: "text-success"
    },
    {
      label: "Active Applicant",
      threshold: 25,
      achieved: journeyProgress >= 25,
      icon: Zap,
      color: "text-primary"
    },
    {
      label: "In Conversations",
      threshold: 50,
      achieved: journeyProgress >= 50,
      icon: Target,
      color: "text-accent"
    },
    {
      label: "Career Launch",
      threshold: 75,
      achieved: journeyProgress >= 75,
      icon: TrendingUp,
      color: "text-success"
    }
  ];

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Your Pathlyft Journey</CardTitle>
            <CardDescription>Track your progress toward employment</CardDescription>
          </div>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {Math.round(journeyProgress)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual Progress Bar */}
        <div className="space-y-2">
          <div className="relative">
            <Progress value={journeyProgress} className="h-3" />
            <div 
              className="absolute top-0 h-3 w-3 rounded-full bg-primary border-2 border-background transition-all"
              style={{ left: `calc(${journeyProgress}% - 6px)` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {journeyProgress < 25 && "Just getting started! Keep applying to boost your progress."}
            {journeyProgress >= 25 && journeyProgress < 50 && "Great momentum! Your applications are working."}
            {journeyProgress >= 50 && journeyProgress < 75 && "Excellent progress! Interviews are the next step."}
            {journeyProgress >= 75 && "Amazing! You're very close to landing your job!"}
          </p>
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {milestones.map((milestone) => {
            const IconComponent = milestone.icon;
            return (
              <div 
                key={milestone.label}
                className={`text-center p-3 rounded-lg border transition-all ${
                  milestone.achieved 
                    ? 'bg-primary/5 border-primary/20' 
                    : 'bg-muted/30 border-border opacity-50'
                }`}
              >
                <div className={`flex justify-center mb-2 ${milestone.achieved ? milestone.color : 'text-muted-foreground'}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <p className="text-xs font-medium">{milestone.label}</p>
              </div>
            );
          })}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{applicationsSubmitted}</p>
            <p className="text-xs text-muted-foreground">Applications</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{interviewsScheduled}</p>
            <p className="text-xs text-muted-foreground">Interviews</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{offersReceived}</p>
            <p className="text-xs text-muted-foreground">Offers</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
