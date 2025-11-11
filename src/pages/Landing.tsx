import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sparkles, Zap, Shield, TrendingUp, CheckCircle2, Users, Award, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Pathlyft</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/about" className="hidden sm:inline">
              <Button variant="ghost" size="sm">About Us</Button>
            </Link>
            <ThemeToggle />
            <Link to="/auth">
              <Button size="sm" className="sm:px-6">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6 text-sm font-medium">
          <Award className="h-4 w-4" />
          Trusted by 10,000+ BYU Pathway Students
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-success to-accent bg-clip-text text-transparent leading-tight">
          Land Your Dream Job<br className="hidden sm:block" /> with AI
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Designed for BYU Pathway students. Let AI tailor your resume, find perfect job matches, 
          and automatically apply across LinkedIn, Indeed, Upwork, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/auth">
            <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
              Start Applying for Free
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Learn More
            </Button>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-success" />
          5 free AI applications • No credit card required
        </p>
      </section>

      {/* Trust Indicators */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          <Card className="p-4 sm:p-6 text-center bg-card border-border hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </Card>
          <Card className="p-4 sm:p-6 text-center bg-card border-border hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">50,000+</div>
            <div className="text-sm text-muted-foreground">Jobs Applied</div>
          </Card>
          <Card className="p-4 sm:p-6 text-center bg-card border-border hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-success mb-2">85%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </Card>
          <Card className="p-4 sm:p-6 text-center bg-card border-border hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">User Rating</div>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful AI tools designed to streamline your job search and maximize your chances of landing interviews
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <Card className="p-6 bg-card border-border hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI Resume Tailoring</h3>
            <p className="text-sm text-muted-foreground">
              Automatically customize your resume for each job posting to match keywords and requirements
            </p>
          </Card>
          
          <Card className="p-6 bg-card border-border hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/20 text-accent mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Auto-Apply</h3>
            <p className="text-sm text-muted-foreground">
              Apply to multiple platforms simultaneously - LinkedIn, Indeed, Upwork, Fiverr, and more
            </p>
          </Card>
          
          <Card className="p-6 bg-card border-border hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Smart Matching</h3>
            <p className="text-sm text-muted-foreground">
              AI analyzes thousands of jobs to find perfect matches based on your skills and career goals
            </p>
          </Card>
          
          <Card className="p-6 bg-card border-border hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/20 text-accent mb-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
            <p className="text-sm text-muted-foreground">
              Monitor all applications, responses, and interviews in one beautiful dashboard
            </p>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-muted/50 py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by Job Seekers</h2>
            <p className="text-muted-foreground">See what our users have to say</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                role: "Software Developer",
                quote: "Got 3 interviews in my first week! The AI resume tailoring is incredible."
              },
              {
                name: "James K.",
                role: "Marketing Manager",
                quote: "Saved me hours of manual applications. Landed my dream job in 2 months!"
              },
              {
                name: "Maria R.",
                role: "Data Analyst",
                quote: "The smart matching feature helped me find opportunities I never would have discovered."
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-6 bg-card border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent">★</span>
                  ))}
                </div>
                <p className="text-sm mb-4 italic">"{testimonial.quote}"</p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <Users className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Job Search?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of BYU Pathway students who have found their dream jobs with Pathlyft
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto">Sign In with Google</Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">Sign In with LinkedIn</Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              No credit card
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              5 free applications
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Cancel anytime
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Landing;
