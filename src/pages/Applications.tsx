import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Applications = () => {
  const { user, incrementApplications } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [jobUrl, setJobUrl] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  if (!user) {
    navigate("/auth");
    return null;
  }

  const freeApplicationsLeft = Math.max(0, 5 - user.applications_used);
  const canApply = user.is_subscribed || freeApplicationsLeft > 0;

  const handleAnalyzeAndApply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canApply) {
      toast({
        title: "Upgrade Required",
        description: "You've used all free applications. Please subscribe to continue.",
        variant: "destructive",
      });
      navigate("/subscription");
      return;
    }

    setIsProcessing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        matchScore: Math.floor(Math.random() * 20) + 80,
        tailoredResume: "Resume has been tailored with relevant keywords and skills",
        platforms: ["LinkedIn", "Indeed"],
        suggestedImprovements: [
          "Highlighted relevant project experience",
          "Added industry-specific keywords",
          "Emphasized technical skills match"
        ],
      };
      
      setAiAnalysis(mockAnalysis);
      setIsProcessing(false);

      // Simulate application submission
      setTimeout(() => {
        incrementApplications();
        toast({
          title: "Application Submitted! 🎉",
          description: `Successfully applied via ${mockAnalysis.platforms.join(" and ")}`,
        });
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }, 1500);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">AI Job Application</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Status Banner */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Applications Remaining</p>
                <p className="text-2xl font-bold text-primary">
                  {user.is_subscribed ? "Unlimited" : freeApplicationsLeft}
                </p>
              </div>
              {!user.is_subscribed && (
                <Link to="/subscription">
                  <Button>Upgrade Now</Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Job Application</CardTitle>
            <CardDescription>
              Paste a job URL and let AI tailor your resume and apply automatically
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAnalyzeAndApply} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="jobUrl">Job Posting URL</Label>
                <Input
                  id="jobUrl"
                  type="url"
                  placeholder="https://linkedin.com/jobs/view/..."
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  required
                  disabled={isProcessing}
                />
                <p className="text-xs text-muted-foreground">
                  Supported: LinkedIn, Indeed, Upwork, Fiverr
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any specific details you'd like to highlight..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  disabled={isProcessing}
                  rows={4}
                />
              </div>

              {!aiAnalysis && (
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isProcessing || !canApply}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      AI is analyzing and applying...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analyze & Apply with AI
                    </>
                  )}
                </Button>
              )}
            </form>

            {/* AI Analysis Results */}
            {aiAnalysis && (
              <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="h-5 w-5" />
                  <h3 className="font-semibold">Application Submitted Successfully!</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                    <span className="text-sm font-medium">Match Score</span>
                    <Badge className="text-lg">{aiAnalysis.matchScore}%</Badge>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Applied via:</p>
                    <div className="flex gap-2">
                      {aiAnalysis.platforms.map((platform: string) => (
                        <Badge key={platform} variant="outline">{platform}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-2">AI Improvements:</p>
                    <ul className="space-y-1">
                      {aiAnalysis.suggestedImprovements.map((improvement: string, idx: number) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-center text-muted-foreground">
                  Redirecting to dashboard...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Text */}
        <Card className="mt-6">
          <CardContent className="py-4">
            <h4 className="font-semibold mb-2 text-sm">How it works:</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Paste the job posting URL from any supported platform</li>
              <li>Our AI analyzes the job requirements and your profile</li>
              <li>Your resume is automatically tailored to match the position</li>
              <li>AI submits applications across all available platforms</li>
              <li>Track all applications in your dashboard</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Applications;
