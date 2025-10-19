import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Heart, Users, ArrowRight } from "lucide-react";

const GetInvolvedHub = () => {
  const actions = [
    {
      title: "Report an Issue",
      description: "Spotted a polluted waterbody or drainage problem? Help us identify areas that need attention.",
      icon: AlertCircle,
      color: "from-red-500 to-orange-500",
      href: "/citizen#report",
      stats: "Earn 25 EcoPoints",
      action: "Report Now"
    },
    {
      title: "Join a Campaign",
      description: "Participate in local cleanup drives, tree planting, and restoration activities near you.",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      href: "/citizen#challenges",
      stats: "45 active campaigns",
      action: "Browse Campaigns"
    },
    {
      title: "Donate Now",
      description: "Support verified restoration projects. Every contribution is tracked on blockchain for transparency.",
      icon: Heart,
      color: "from-pink-500 to-purple-500",
      href: "/marketplace#donate",
      stats: "Starting from ₹100",
      action: "Donate"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Get Involved Action Hub</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take action today and make a difference in water restoration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.title}
                className="hover:shadow-water transition-all duration-300 hover:-translate-y-2 group overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${action.color}`} />
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">{action.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{action.stats}</span>
                  </div>
                  <Button 
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary"
                    onClick={() => window.location.href = action.href}
                  >
                    {action.action}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Impact Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="text-4xl font-bold text-primary mb-2">2,840</div>
            <div className="text-sm text-muted-foreground">Issues Reported</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5">
            <div className="text-4xl font-bold text-secondary mb-2">12,450</div>
            <div className="text-sm text-muted-foreground">Active Volunteers</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5">
            <div className="text-4xl font-bold text-accent mb-2">₹2.4Cr</div>
            <div className="text-sm text-muted-foreground">Funds Raised</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedHub;