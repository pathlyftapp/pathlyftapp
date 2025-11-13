import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileText, Sparkles, Download, Eye, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResumeCentre = () => {
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      toast({
        title: "Resume Generated!",
        description: "Your AI-powered resume has been created successfully.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Resume Centre
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and edit AI-powered resumes tailored for each job
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* AI Features Banner */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Resume Builder</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Our AI analyzes job descriptions and automatically tailors your resume to highlight
                relevant skills and experience, increasing your chances of getting interviews.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">ATS-Optimized</Badge>
                <Badge variant="secondary">Job-Specific Tailoring</Badge>
                <Badge variant="secondary">Keyword Optimization</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Resume Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Resume Information</CardTitle>
            <CardDescription>
              Enter your details and let AI optimize your resume
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" placeholder="John Doe" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input id="title" placeholder="Software Developer" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                placeholder="Write a brief summary of your professional background..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Work Experience</Label>
              <Textarea
                id="experience"
                placeholder="List your work experience..."
                rows={6}
              />
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Textarea
                id="education"
                placeholder="List your education..."
                rows={3}
              />
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="React, TypeScript, Node.js, etc."
              />
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full"
              disabled={generating}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {generating ? "Generating..." : "Generate AI Resume"}
            </Button>
          </CardContent>
        </Card>

        {/* Resume Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Resume Preview</CardTitle>
            <CardDescription>
              See how your resume will look to employers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 border border-border rounded-lg p-6 min-h-[600px]">
              <div className="space-y-4">
                <div className="text-center border-b border-border pb-4">
                  <h2 className="text-2xl font-bold">Your Name</h2>
                  <p className="text-muted-foreground">Professional Title</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    email@example.com • (555) 123-4567 • City, State
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Professional Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    Your professional summary will appear here...
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Your work experience will be listed here...
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Education</h3>
                  <p className="text-sm text-muted-foreground">
                    Your education details will appear here...
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Skill 1</Badge>
                    <Badge variant="outline">Skill 2</Badge>
                    <Badge variant="outline">Skill 3</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Resumes */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Resumes</CardTitle>
          <CardDescription>
            Access and manage your previously generated resumes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/5 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Frontend Developer Resume</p>
                  <p className="text-sm text-muted-foreground">Last updated 2 days ago</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeCentre;
