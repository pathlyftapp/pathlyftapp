import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Briefcase, MapPin, DollarSign, Clock, TrendingUp } from "lucide-react";

const mockJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Innovations Inc",
    location: "Remote",
    salary: "$70k - $90k",
    matchScore: 95,
    type: "Full-time",
    posted: "2 days ago",
    skills: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "2",
    title: "Web Developer",
    company: "Digital Solutions",
    location: "New York, NY",
    salary: "$65k - $85k",
    matchScore: 88,
    type: "Full-time",
    posted: "1 week ago",
    skills: ["JavaScript", "React", "Node.js"],
  },
  {
    id: "3",
    title: "Junior React Developer",
    company: "StartUp Studios",
    location: "Remote",
    salary: "$55k - $70k",
    matchScore: 82,
    type: "Full-time",
    posted: "3 days ago",
    skills: ["React", "CSS", "Git"],
  },
];

const AIJobMatch = () => {
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            AI Job Match
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover jobs perfectly matched to your skills and experience
          </p>
        </div>
        <Button onClick={handleAnalyze} disabled={analyzing}>
          <Sparkles className="h-4 w-4 mr-2" />
          {analyzing ? "Analyzing..." : "Find Matches"}
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground mt-1">+12 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Match Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="inline h-3 w-3" /> +5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">Fresh opportunities</p>
          </CardContent>
        </Card>
      </div>

      {/* Job Matches */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Top Matches for You</h2>
        {mockJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                  </CardDescription>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  {job.matchScore}% Match
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Match Score</span>
                  <span className="font-medium">{job.matchScore}%</span>
                </div>
                <Progress value={job.matchScore} className="h-2" />
              </div>

              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.posted}
                  </span>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
                <Button>Apply Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIJobMatch;
