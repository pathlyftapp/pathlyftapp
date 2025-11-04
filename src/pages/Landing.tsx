import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sparkles, Zap, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">JobApply AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about">
              <Button variant="ghost">About Us</Button>
            </Link>
            <ThemeToggle />
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Land Your Dream Job with AI
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Designed for BYU Pathway students. Let AI tailor your resume, find perfect job matches, 
          and automatically apply across LinkedIn, Indeed, Upwork, and more.
        </p>
        <Link to="/auth">
          <Button size="lg" className="text-lg px-8">
            Start Applying for Free
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground mt-4">
          5 free AI applications • No credit card required
        </p>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">AI Resume Tailoring</h3>
            <p className="text-sm text-muted-foreground">
              Automatically customize your resume for each job posting
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Auto-Apply</h3>
            <p className="text-sm text-muted-foreground">
              Apply to multiple platforms simultaneously - LinkedIn, Indeed, Upwork, Fiverr
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Smart Matching</h3>
            <p className="text-sm text-muted-foreground">
              AI finds jobs that match your skills and career goals
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent mb-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Track Progress</h3>
            <p className="text-sm text-muted-foreground">
              Monitor all applications in one beautiful dashboard
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Job Search?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of BYU Pathway students who have found their dream jobs with JobApply AI
          </p>
          <Link to="/auth">
            <Button size="lg">Sign In with Google</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
