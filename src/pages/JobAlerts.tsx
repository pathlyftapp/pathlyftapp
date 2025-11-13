import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, MessageSquare, Smartphone, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JobAlerts = () => {
  const [inApp, setInApp] = useState(true);
  const [email, setEmail] = useState(true);
  const [whatsapp, setWhatsapp] = useState(false);
  const [sms, setSms] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved!",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bell className="h-8 w-8 text-primary" />
          Job Alerts
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage how you receive job notifications across multiple channels
        </p>
      </div>

      {/* Active Alerts Summary */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Active Alert Channels</h3>
              <p className="text-sm text-muted-foreground">
                You're receiving alerts through {[inApp, email, whatsapp, sms].filter(Boolean).length} channel(s)
              </p>
            </div>
            <div className="flex gap-2">
              {inApp && <Badge variant="secondary"><Bell className="h-3 w-3 mr-1" /> App</Badge>}
              {email && <Badge variant="secondary"><Mail className="h-3 w-3 mr-1" /> Email</Badge>}
              {whatsapp && <Badge variant="secondary"><MessageSquare className="h-3 w-3 mr-1" /> WhatsApp</Badge>}
              {sms && <Badge variant="secondary"><Smartphone className="h-3 w-3 mr-1" /> SMS</Badge>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>
            Choose how you want to receive job alerts and updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* In-App Notifications */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <Label htmlFor="in-app" className="text-base font-medium">
                  In-App Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get instant alerts within the app
                </p>
              </div>
            </div>
            <Switch
              id="in-app"
              checked={inApp}
              onCheckedChange={setInApp}
            />
          </div>

          {/* Email Notifications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-base font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
              </div>
              <Switch
                id="email"
                checked={email}
                onCheckedChange={setEmail}
              />
            </div>
            {email && (
              <div className="ml-16 space-y-2">
                <Label htmlFor="email-address">Email Address</Label>
                <Input
                  id="email-address"
                  type="email"
                  placeholder="you@example.com"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* WhatsApp Notifications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label htmlFor="whatsapp" className="text-base font-medium">
                    WhatsApp Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get alerts on WhatsApp
                  </p>
                </div>
              </div>
              <Switch
                id="whatsapp"
                checked={whatsapp}
                onCheckedChange={setWhatsapp}
              />
            </div>
            {whatsapp && (
              <div className="ml-16 space-y-2">
                <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
                <Input
                  id="whatsapp-number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* SMS Notifications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label htmlFor="sms" className="text-base font-medium">
                    SMS/Text Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive text messages for urgent alerts
                  </p>
                </div>
              </div>
              <Switch
                id="sms"
                checked={sms}
                onCheckedChange={setSms}
              />
            </div>
            {sms && (
              <div className="ml-16 space-y-2">
                <Label htmlFor="sms-number">Phone Number</Label>
                <Input
                  id="sms-number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Alert Frequency */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Frequency</CardTitle>
          <CardDescription>
            Control how often you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Instant Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified immediately when new matching jobs are found
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Daily Digest</Label>
              <p className="text-sm text-muted-foreground">
                Receive a daily summary of all new opportunities
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Weekly Report</Label>
              <p className="text-sm text-muted-foreground">
                Get a comprehensive weekly overview
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} size="lg" className="w-full">
        <Check className="h-4 w-4 mr-2" />
        Save Notification Settings
      </Button>
    </div>
  );
};

export default JobAlerts;
