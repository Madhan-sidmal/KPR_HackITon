import { useNavigate } from "react-router-dom";
import { useEnvironment } from "@/contexts/EnvironmentContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, FlaskConical, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type PortalRole = "government" | "ngo" | "research" | "citizen";

const PortalSelectionPage = () => {
  const navigate = useNavigate();
  const { environment } = useEnvironment();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate("/auth");
      } else {
        setUser(user);
      }
    });
  }, [navigate]);

  const portals = [
    {
      id: "government" as PortalRole,
      title: "Government Portal",
      description: "Monitor progress, manage restoration programs, and analyze data",
      icon: Building2,
      route: "/government-portal",
      features: ["Real-time Dashboards", "Policy Management", "Analytics & Reports", "Resource Allocation"]
    },
    {
      id: "ngo" as PortalRole,
      title: "NGO Portal",
      description: "Create and manage environmental projects, recruit volunteers",
      icon: Users,
      route: "/ngo-portal",
      features: ["Project Management", "Volunteer Coordination", "Impact Tracking", "Funding Management"]
    },
    {
      id: "research" as PortalRole,
      title: "Research Portal",
      description: "Access datasets, analyze patterns, and contribute research",
      icon: FlaskConical,
      route: "/research-portal",
      features: ["Open Datasets", "Analysis Tools", "Collaboration Hub", "Publications"]
    },
    {
      id: "citizen" as PortalRole,
      title: "Citizen Portal",
      description: "Report issues, earn EcoPoints, join drives, and make a difference",
      icon: User,
      route: "/citizen-portal",
      features: ["Report Issues", "Join Challenges", "Earn Rewards", "Track Impact"]
    }
  ];

  const environmentColors = {
    water: "from-blue-500 to-cyan-500",
    air: "from-yellow-500 to-amber-500",
    waste: "from-green-500 to-emerald-500"
  };

  const environmentLabels = {
    water: "Water Management",
    air: "Air Quality",
    waste: "Waste Management"
  };

  const handlePortalSelect = async (portalId: PortalRole, route: string) => {
    if (!user) {
      toast.error("Please sign in to continue");
      navigate("/auth");
      return;
    }

    setLoading(true);

    // Update user role in database
    const { error } = await supabase
      .from("user_roles")
      .upsert({
        user_id: user.id,
        role: portalId,
        updated_at: new Date().toISOString()
      });

    setLoading(false);

    if (error) {
      toast.error("Failed to save role preference");
      console.error(error);
      return;
    }

    toast.success(`Welcome to ${portalId} portal!`);
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-green-900/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className={`px-4 py-2 rounded-full bg-gradient-to-r ${environmentColors[environment]} text-white text-sm font-semibold`}>
              {environmentLabels[environment]}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Select Your Role
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose how you want to contribute to India's environmental restoration
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Card 
                key={portal.id}
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handlePortalSelect(portal.id, portal.route)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${environmentColors[environment]} flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{portal.title}</CardTitle>
                  <CardDescription className="text-base">
                    {portal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {portal.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${environmentColors[environment]}`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full"
                    disabled={loading}
                  >
                    Enter Portal
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/interest-selection")}
          >
            ← Change Environment Focus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortalSelectionPage;
