import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, Users, Award, BookOpen, ExternalLink } from "lucide-react";

const quotes = [
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
];

const successStories = [
  {
    name: "Sarah Johnson",
    title: "From Student to Software Engineer",
    company: "Google",
    story: "After completing the BYU Pathway program, Sarah landed her dream job at Google. She credits her success to persistent applications and tailoring her resume for each opportunity.",
    image: "SJ",
  },
  {
    name: "Michael Chen",
    title: "Career Transition Success",
    company: "Microsoft",
    story: "Michael successfully transitioned from retail to tech with the help of AI-powered job matching. Within 3 months, he secured a position at Microsoft.",
    image: "MC",
  },
  {
    name: "Emily Rodriguez",
    title: "Multiple Job Offers",
    company: "Amazon",
    story: "By using the autonomous application system, Emily received 5 interview invitations and 2 job offers within her first month of searching.",
    image: "ER",
  },
];

const articles = [
  {
    title: "10 Tips for Acing Your Next Job Interview",
    category: "Career Advice",
    readTime: "5 min read",
  },
  {
    title: "How to Stand Out in a Competitive Job Market",
    category: "Job Search",
    readTime: "7 min read",
  },
  {
    title: "Building Your Professional Network Effectively",
    category: "Networking",
    readTime: "6 min read",
  },
  {
    title: "Resume Red Flags Employers Notice Immediately",
    category: "Resume Tips",
    readTime: "4 min read",
  },
];

const InspirationCorner = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Lightbulb className="h-8 w-8 text-primary" />
          Inspiration Corner
        </h1>
        <p className="text-muted-foreground mt-2">
          Stay motivated with success stories, tips, and career advice
        </p>
      </div>

      {/* Daily Motivation */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="inline-flex p-3 bg-primary/10 rounded-full">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <blockquote className="text-xl font-medium italic">
              "{quotes[0].text}"
            </blockquote>
            <p className="text-sm text-muted-foreground">— {quotes[0].author}</p>
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Award className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Success Stories</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {successStories.map((story, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {story.image}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{story.name}</CardTitle>
                    <CardDescription className="text-sm">{story.company}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="mb-3">
                  {story.title}
                </Badge>
                <p className="text-sm text-muted-foreground">{story.story}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Career Articles */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Career Articles & Tips</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {articles.map((article, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Badge variant="outline">{article.category}</Badge>
                    <CardTitle className="text-lg mt-2">{article.title}</CardTitle>
                    <CardDescription>{article.readTime}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Read Article
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Community Success Metrics
          </CardTitle>
          <CardDescription>
            See how the Pathlyft community is achieving their career goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">2,847</div>
              <p className="text-sm text-muted-foreground">Jobs Secured</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">15,392</div>
              <p className="text-sm text-muted-foreground">Applications Sent</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">89%</div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">4,521</div>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivational Quotes Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {quotes.slice(1).map((quote, index) => (
          <Card key={index} className="bg-muted/30">
            <CardContent className="pt-6">
              <blockquote className="text-lg italic mb-2">
                "{quote.text}"
              </blockquote>
              <p className="text-sm text-muted-foreground">— {quote.author}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InspirationCorner;
