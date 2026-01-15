import Navbar from "@/components/Navbar";
import StorytellingHero from "@/components/StorytellingHero";
import Footer from "@/components/Footer";
import InteractiveMap from "@/components/InteractiveMap";
import UnifiedStatsCounter from "@/components/UnifiedStatsCounter";
import GetInvolvedHub from "@/components/GetInvolvedHub";
import AIAssistant from "@/components/AIAssistant";
import AirQualitySnapshot from "@/components/AirQualitySnapshot";
import WasteQualitySnapshot from "@/components/WasteQualitySnapshot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, Brain, UserCircle, ArrowRight, Droplet, Wind, Globe, Target, TrendingUp, Zap, Shield, Network, BarChart3, Sparkles, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { EnvironmentView } from "@/components/EnvironmentToggle";
import AuthModal from "@/components/AuthModal";
import { useUserRole } from "@/hooks/useUserRole";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const [selectedEnvironment, setSelectedEnvironment] = useState<EnvironmentView | null>(null);
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
            "/research": "research",
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
      "/research": "research",
      "/citizen": "citizen"
    };

    if (roleMap[href] === userRole) {
      navigate(href);
    } else {
      toast.error(`Please log in with a ${roleMap[href]} account to access this portal`);
      setShowAuthModal(true);
    }
  };

  const roleOptions = [
    {
      title: "Public User",
      description: "Report issues, explore environmental data, and join community actions",
      icon: UserCircle,
      color: "from-orange-500 to-yellow-500",
      role: "public_user",
      features: ["Report Issues", "Explore Map", "Join Actions", "View Impact"]
    },
    {
      title: "Action Partner",
      description: "NGOs & CSR teams: Validate and take action on reported issues",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      role: "action_partner",
      features: ["Validate Issues", "Execute Actions", "Track Progress", "Collaborate"]
    },
    {
      title: "Authority",
      description: "Government bodies: Acknowledge, respond, and mark resolutions",
      icon: Building2,
      color: "from-blue-500 to-cyan-500",
      role: "authority",
      features: ["Respond to Issues", "Mark Resolved", "View Analytics", "Policy Insights"]
    },
  ];

  const environmentOptions = [
    {
      value: "water" as EnvironmentView,
      title: "Water Management",
      description: "Monitor water bodies, track restoration projects, and manage water quality nationwide",
      icon: Droplet,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-600"
    },
    {
      value: "air" as EnvironmentView,
      title: "Air Quality",
      description: "Track AQI, PM2.5, pollution sources, and air quality improvements across India",
      icon: Wind,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-600"
    },
    {
      value: "waste" as EnvironmentView,
      title: "Waste Management",
      description: "Monitor solid waste, recycling initiatives, and circular economy projects",
      icon: Trash2,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-600"
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <StorytellingHero />
        
        {/* Environment Selection Section */}
        <section id="environment-selector" className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Choose Your Environmental Focus</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Select the environmental domain you're most interested in to see relevant portals and features
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {environmentOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedEnvironment === option.value;
                return (
                  <Card 
                    key={option.value}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                      isSelected ? 'ring-2 ring-primary shadow-xl scale-105' : ''
                    }`}
                    onClick={() => {
                      setSelectedEnvironment(option.value);
                      setTimeout(() => {
                        document.getElementById('portals')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 300);
                    }}
                  >
                    <CardHeader>
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 mx-auto transition-transform ${
                        isSelected ? 'scale-110' : 'group-hover:scale-105'
                      }`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-center">{option.title}</CardTitle>
                      <CardDescription className="text-center pt-2">
                        {option.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Button 
                        className={`w-full ${
                          isSelected 
                            ? `bg-gradient-to-r ${option.color} text-white` 
                            : 'bg-muted'
                        }`}
                        variant={isSelected ? "default" : "outline"}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {selectedEnvironment && (
              <div className="text-center mt-8 animate-fade-in">
                <p className="text-muted-foreground mb-4">Great choice! Now select your role below ↓</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Unified Dashboard CTA */}
        <section id="portals" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">One Platform, Three Roles</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Same unified dashboard for everyone. Your role determines your actions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              {roleOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Card key={option.title} className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 mx-auto`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-center">{option.title}</CardTitle>
                      <CardDescription className="text-center">{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {option.features.map((feature) => (
                          <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-water"
                onClick={() => navigate("/dashboard")}
              >
                Open Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
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

        {/* National Dashboard Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Live National Dashboard</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real-time insights into India's environmental health ecosystem
              </p>
            </div>

            <UnifiedStatsCounter />

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <AirQualitySnapshot />
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-blue-600" />
                    Water Quality Overview
                  </CardTitle>
                  <CardDescription>Active restoration projects nationwide</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Lakes Restored</span>
                      <span className="text-2xl font-bold text-primary">1,240</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Rivers Cleaned</span>
                      <span className="text-2xl font-bold text-secondary">85</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">NGOs Active</span>
                      <span className="text-2xl font-bold text-accent">285</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-green-600" />
                    Waste Management Status
                  </CardTitle>
                  <CardDescription>Nationwide recycling and cleanup metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Recycling Rate</span>
                      <span className="text-2xl font-bold text-green-600">43.6%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Collection Coverage</span>
                      <span className="text-2xl font-bold text-primary">82%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Cleanup Drives</span>
                      <span className="text-2xl font-bold text-secondary">342</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <WasteQualitySnapshot />
            </div>

            <div className="mt-12 text-center">
              <Button 
                size="lg" 
                onClick={() => navigate("/map")}
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-water"
              >
                Explore Interactive Map
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
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
