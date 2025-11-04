import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const pricingTiers = [
  {
    region: "North America",
    price: "$29",
    currency: "USD",
  },
  {
    region: "Europe",
    price: "€25",
    currency: "EUR",
  },
  {
    region: "Asia",
    price: "$19",
    currency: "USD",
  },
  {
    region: "Other Regions",
    price: "$24",
    currency: "USD",
  },
];

const features = [
  "Unlimited AI job applications",
  "Auto-apply across all platforms",
  "AI resume tailoring for every job",
  "Priority customer support",
  "Advanced analytics dashboard",
  "LinkedIn profile optimization",
  "Interview preparation tips",
  "Job match notifications",
];

const Subscription = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleSubscribe = (region: string) => {
    // Simulate subscription
    toast({
      title: "Subscription Processing",
      description: `Processing your ${region} subscription. This is a demo, no actual charge will occur.`,
    });
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
              <span className="text-xl font-bold">Upgrade to Premium</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Unlock Unlimited Job Applications
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop worrying about limits. Apply to as many jobs as you want with AI-powered automation.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingTiers.map((tier) => (
            <Card key={tier.region} className="relative">
              {tier.region === "North America" && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-center">{tier.region}</CardTitle>
                <CardDescription className="text-center text-3xl font-bold text-foreground">
                  {tier.price}
                  <span className="text-sm text-muted-foreground">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => handleSubscribe(tier.region)}
                  disabled={user.isSubscribed}
                >
                  {user.isSubscribed ? "Current Plan" : "Subscribe"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Everything You Get</CardTitle>
            <CardDescription>All premium features included in every plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">How is pricing determined by region?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We use geolocation to automatically detect your region and show you the appropriate pricing. This ensures fair pricing based on local economic conditions.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">What platforms do you support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We support LinkedIn, Indeed, Upwork, Fiverr, and are constantly adding new platforms based on user requests.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
