import Navbar from "@/components/Navbar";
import StorytellingHero from "@/components/StorytellingHero";
import Footer from "@/components/Footer";
import InteractiveMap from "@/components/InteractiveMap";

import GetInvolvedHub from "@/components/GetInvolvedHub";
import AIAssistant from "@/components/AIAssistant";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, Brain, UserCircle, ArrowRight, Target, TrendingUp, Zap, Shield, Network, BarChart3, Sparkles, Droplet, Wind, Trash2, Activity, MapPinned } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthModal from "@/components/AuthModal";
import { useUserRole } from "@/hooks/useUserRole";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [targetPortal, setTargetPortal] = useState<string>("");
  const { userRole, loading } = useUserRole();

  useEffect(() => {
    const checkAndRedirect = async () => {
      if (loading) return;

      const storedTarget = localStorage.getItem('targetPortal');
      
      if (userRole && storedTarget) {
        try {
          // Check email verification
          const { data: { user } } = await supabase.auth.getUser();
          
          if (!user) {
            localStorage.removeItem('targetPortal');
            return;
          }

          // Check if email is verified
          if (!user.email_confirmed_at) {
            toast.error("Please verify your email to continue");
            navigate("/verify-email");
            return;
          }

          // Check if profile is complete
          const { data: profile } = await supabase
            .from("profiles")
            .select("name")
            .eq("id", user.id)
            .single();

          if (!profile?.name) {
            toast.error("Please complete your profile to continue");
            navigate("/complete-profile");
            return;
          }

          // Check role match
          const roleMap: Record<string, string> = {
            "/government": "government",
            "/ngo": "ngo",
            "/citizen": "citizen"
          };

          if (roleMap[storedTarget] === userRole) {
            localStorage.removeItem('targetPortal');
            navigate(storedTarget);
          } else {
            toast.error(`You need a ${roleMap[storedTarget]} account to access this portal`);
            localStorage.removeItem('targetPortal');
          }
        } catch (error) {
          console.error("Error checking redirect:", error);
          localStorage.removeItem('targetPortal');
        }
      }
    };

    checkAndRedirect();
  }, [userRole, loading, navigate]);

  const handlePortalClick = (href: string) => {
    if (!userRole) {
      setTargetPortal(href);
      localStorage.setItem('targetPortal', href);
      setShowAuthModal(true);
      return;
    }

    const roleMap: Record<string, string> = {
      "/government": "government",
      "/ngo": "ngo",
      "/citizen": "citizen"
    };

    if (roleMap[href] === userRole) {
      navigate(href);
    } else {
      toast.error(`Please log in with a ${roleMap[href]} account to access this portal`);
      setShowAuthModal(true);
    }
  };

  const allPortals = [
    {
      title: "Government Portal",
      description: "Access state-wise analytics, approve partnerships, and view AI-driven policy insights",
      icon: Building2,
      color: "from-blue-500 to-cyan-500",
      href: "/government",
      role: "government",
      features: ["State Analytics", "NGO Approvals", "AI Policy Insights", "Hotspot Maps"]
    },
    {
      title: "NGO Portal",
      description: "Manage restoration projects, track funding, and collaborate with researchers",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      href: "/ngo",
      role: "ngo",
      features: ["Project Mapping", "Donor Analytics", "Impact Feed", "Photo/Video Upload"]
    },
    {
      title: "Citizen Portal",
      description: "Earn EcoPoints, join challenges, and report local water issues",
      icon: UserCircle,
      color: "from-orange-500 to-yellow-500",
      href: "/citizen",
      role: "citizen",
      features: ["EcoPoints & Badges", "Geo-tagged Reporting", "Local Map Explorer", "Gamified Challenges"]
    },
  ];

  // Filter portals based on user role - show only matching portal when logged in
  const portals = userRole 
    ? allPortals.filter(portal => portal.role === userRole)
    : allPortals;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <StorytellingHero />
        
        
        {/* Portal Selection Section */}
        <section id="portals" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Choose Your Portal</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Select your role to access specialized environmental tools and features
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {portals.map((portal) => {
                const Icon = portal.icon;
                return (
                  <Card 
                    key={portal.title} 
                    className="hover:shadow-water transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                    onClick={() => handlePortalClick(portal.href)}
                  >
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${portal.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{portal.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {portal.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {portal.features.map((feature) => (
                          <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary" variant="outline">
                        Access Portal
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Flagship Features Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Ecosystem Intelligence Features</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                AI-powered environmental governance, real-time monitoring, and nationwide action
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Environmental Correlation Engine */}
              <Card 
                className="glass-card hover:shadow-water transition-all cursor-pointer group"
                onClick={() => navigate("/correlation-engine")}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Network className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Correlation Engine</CardTitle>
                  <CardDescription>
                    AI discovers links between air pollution and water quality events for proactive intervention
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Holistic Eco-Health Score */}
              <Card 
                className="glass-card hover:shadow-water transition-all cursor-pointer group"
                onClick={() => navigate("/eco-health-score")}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Eco-Health Score</CardTitle>
                  <CardDescription>
                    Single unified score combining air, water, and green cover metrics for every district
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Policy Simulator */}
              <Card 
                className="glass-card hover:shadow-water transition-all cursor-pointer group"
                onClick={() => navigate("/policy-simulator")}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Policy Simulator</CardTitle>
                  <CardDescription>
                    Model socio-economic and environmental impact of policies before implementation
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Smart Impact Scoring */}
              <Card className="glass-card hover:shadow-water transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Impact Scoring AI</CardTitle>
                  <CardDescription>
                    Data-backed effectiveness scores for restoration work, crucial for performance-based funding
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Blockchain Transparency */}
              <Card className="glass-card hover:shadow-water transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Donation Transparency</CardTitle>
                  <CardDescription>
                    Blockchain ledger ensures every rupee donated is traceable from donor to final expenditure
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Predictive Sandbox */}
              <Card className="glass-card hover:shadow-water transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center mb-3">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Predictive Sandbox</CardTitle>
                  <CardDescription>
                    Live environment for scientists to test AI models against real-time environmental data
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">How JeevaDhara Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A unified platform for environmental monitoring, restoration, and action across three critical domains
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center mx-auto hover:scale-110 transition-transform cursor-pointer">
                  <Droplet className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Water Monitoring</h3>
                <p className="text-muted-foreground">
                  Track water quality, restoration progress, and water body health across India
                </p>
              </div>

              <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-950 flex items-center justify-center mx-auto hover:scale-110 transition-transform cursor-pointer">
                  <Wind className="w-10 h-10 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold">Air Quality Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor AQI, PM2.5, PM10, and pollution sources in real-time
                </p>
              </div>

              <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mx-auto hover:scale-110 transition-transform cursor-pointer">
                  <Trash2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Waste Management</h3>
                <p className="text-muted-foreground">
                  Track recycling rates, cleanup drives, and circular economy initiatives
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Explore the Platform</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Access real-time environmental data and make an impact
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Live Impact Dashboard Card */}
              <Card 
                className="group cursor-pointer hover:shadow-water transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                onClick={() => navigate("/live-impact")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Live Impact Dashboard</CardTitle>
                  <CardDescription className="text-base">
                    Real-time environmental data, issue resolutions, donations, and milestones across India
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Real-time Updates</span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Air Quality</span>
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Water Data</span>
                    <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm">Waste Metrics</span>
                  </div>
                  <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary">
                    View Live Dashboard
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Interactive Map Card */}
              <Card 
                className="group cursor-pointer hover:shadow-water transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                onClick={() => navigate("/map")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MapPinned className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Interactive Map</CardTitle>
                  <CardDescription className="text-base">
                    Explore environmental hotspots, restoration projects, and pollution sources across the nation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Geo-tagged Data</span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Hotspot Maps</span>
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Project Locations</span>
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-600 rounded-full text-sm">Issue Tracking</span>
                  </div>
                  <Button variant="outline" className="w-full group-hover:bg-gradient-to-r group-hover:from-secondary group-hover:to-accent group-hover:text-white group-hover:border-transparent">
                    Explore Map
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Get Involved Hub */}
        <GetInvolvedHub />

        {/* Quick Actions */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Take Action Today</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join our community and start making an impact
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card 
                className="interactive-card cursor-pointer"
                onClick={() => navigate("/community")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Join Challenges
                  </CardTitle>
                  <CardDescription>
                    Participate in eco-challenges and earn rewards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    View Challenges
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="interactive-card cursor-pointer"
                onClick={() => navigate("/knowledge")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-secondary" />
                    Learn More
                  </CardTitle>
                  <CardDescription>
                    Explore success stories and research insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Knowledge Hub
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="interactive-card cursor-pointer"
                onClick={() => navigate("/marketplace")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Support Projects
                  </CardTitle>
                  <CardDescription>
                    Donate to projects or purchase eco-products
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Marketplace
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      {/* AI Assistant */}
      <AIAssistant />
      
      <Footer />

      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
};

export default Index;
