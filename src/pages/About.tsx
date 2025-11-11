import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { Sparkles, Heart, Target, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Pathlyft</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About Pathlyft</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering BYU Pathway students to land their dream jobs through AI-powered automation
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Our Mission</h3>
              <p className="text-sm text-muted-foreground">
                To eliminate barriers in the job search process by providing AI-powered tools that level the playing field for all students.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Why We Built This</h3>
              <p className="text-sm text-muted-foreground">
                We noticed BYU Pathway students struggling with untailored resumes. We built this to help them compete effectively in the job market.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Who We Serve</h3>
              <p className="text-sm text-muted-foreground">
                BYU Pathway students and anyone looking to streamline their job search with intelligent automation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <Card className="mb-16">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Pathlyft was born from a simple observation: talented BYU Pathway students were being overlooked 
                because they didn't have time to tailor their resumes for every job application. Many were juggling 
                work, studies, and family responsibilities, making it nearly impossible to compete with applicants 
                who could dedicate hours to each application.
              </p>
              <p>
                We built an AI-powered platform that does the heavy lifting—searching for relevant opportunities, 
                tailoring applications to match job requirements, and submitting them automatically across multiple 
                platforms like LinkedIn, Upwork, Fiverr, and Indeed. This gives BYU Pathway students the competitive 
                edge they deserve, allowing them to focus on developing their skills, completing their education, 
                and advancing their careers.
              </p>
              <p>
                Today, Pathlyft serves students across the globe, helping them land interviews at top companies 
                and achieve their career goals. We're proud to be part of their success stories.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-8">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Everyone deserves access to powerful job search tools
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p className="text-sm text-muted-foreground">
                Constantly improving our AI to better serve students
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Integrity</h3>
              <p className="text-sm text-muted-foreground">
                Honest applications that accurately represent your skills
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Support</h3>
              <p className="text-sm text-muted-foreground">
                Here to help at every step of your job search journey
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Job Search?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of students who have already discovered the power of AI-assisted job applications
            </p>
            <Link to="/auth">
              <Button size="lg">Get Started Free</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
