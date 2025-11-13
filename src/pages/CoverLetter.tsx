import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, Sparkles, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CoverLetter = () => {
  const [generating, setGenerating] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!jobDescription || !companyName) {
      toast({
        title: "Missing Information",
        description: "Please provide both company name and job description.",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGeneratedLetter(`Dear Hiring Manager at ${companyName},

I am writing to express my strong interest in the position described. With my background in software development and proven track record of delivering high-quality solutions, I am confident I would be a valuable addition to your team.

Throughout my career, I have developed expertise in modern web technologies and demonstrated ability to adapt to new challenges. My experience aligns well with the requirements outlined in your job description, particularly in areas of full-stack development and collaborative problem-solving.

I am particularly excited about the opportunity to contribute to ${companyName}'s mission and work with a team that values innovation and excellence. I am confident that my skills, enthusiasm, and commitment to continuous learning make me an ideal candidate for this role.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team's success.

Best regards,
[Your Name]`);
      toast({
        title: "Cover Letter Generated!",
        description: "Your personalized cover letter is ready.",
      });
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast({
      title: "Copied!",
      description: "Cover letter copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Mail className="h-8 w-8 text-primary" />
            Cover Letter Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate personalized cover letters with AI for each application
          </p>
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
              <h3 className="text-lg font-semibold mb-2">AI-Powered Cover Letters</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Our AI creates compelling, personalized cover letters that highlight your strengths
                and align with the specific job requirements, helping you stand out from other applicants.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Personalized Content</Badge>
                <Badge variant="secondary">Job-Specific</Badge>
                <Badge variant="secondary">Professional Tone</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Provide information about the position you're applying for
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="e.g., Tech Innovations Inc"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position Title</Label>
              <Input
                id="position"
                placeholder="e.g., Frontend Developer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here..."
                rows={12}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="key-points">Key Points to Highlight (Optional)</Label>
              <Textarea
                id="key-points"
                placeholder="Any specific achievements or skills you want to emphasize..."
                rows={4}
              />
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full"
              disabled={generating}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {generating ? "Generating..." : "Generate Cover Letter"}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Letter Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Cover Letter</CardTitle>
                <CardDescription>
                  Review and customize your AI-generated cover letter
                </CardDescription>
              </div>
              {generatedLetter && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!generatedLetter ? (
              <div className="bg-muted/30 border border-border rounded-lg p-8 min-h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Your generated cover letter will appear here
                  </p>
                </div>
              </div>
            ) : (
              <Textarea
                value={generatedLetter}
                onChange={(e) => setGeneratedLetter(e.target.value)}
                className="min-h-[500px] font-serif"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Cover Letter Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Be Specific</h4>
              <p className="text-sm text-muted-foreground">
                Reference specific requirements from the job description and explain how you meet them.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Show Enthusiasm</h4>
              <p className="text-sm text-muted-foreground">
                Express genuine interest in the role and company. Research their values and mission.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Keep It Concise</h4>
              <p className="text-sm text-muted-foreground">
                Aim for 3-4 paragraphs. Be clear and direct about why you're the right fit.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoverLetter;
