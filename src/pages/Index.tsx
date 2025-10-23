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
import { useState } from "react";
import type { EnvironmentView } from "@/components/EnvironmentToggle";

const Index = () => {
  const navigate = useNavigate();
  const [selectedEnvironment, setSelectedEnvironment] = useState<EnvironmentView | null>(null);

  const portals = [
    {
      title: "Government Portal",
      description: "Access state-wise analytics, approve partnerships, and view AI-driven policy insights",
      icon: Building2,
      color: "from-blue-500 to-cyan-500",
      href: "/government",
      features: ["State Analytics", "NGO Approvals", "AI Policy Insights", "Hotspot Maps"]
    },
    {
      title: "NGO Portal",
      description: "Manage restoration projects, track funding, and collaborate with researchers",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      href: "/ngo",
      features: ["Project Mapping", "Donor Analytics", "Impact Feed", "Photo/Video Upload"]
    },
    {
      title: "Research Portal",
      description: "Access datasets, publish AI models, and share research insights",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      href: "/research",
      features: ["Dataset Library", "AI Model Repository", "Research Publications", "Auto-Insights Feed"]
    },
    {
      title: "Citizen Portal",
      description: "Earn EcoPoints, join challenges, and report local water issues",
      icon: UserCircle,
      color: "from-orange-500 to-yellow-500",
      href: "/citizen",
      features: ["EcoPoints & Badges", "Geo-tagged Reporting", "Local Map Explorer", "Gamified Challenges"]
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
        
        {/* Portal Selection Section */}
        <section id="portals" className={`py-20 bg-muted/30 transition-all duration-500 ${
          selectedEnvironment ? 'opacity-100' : 'opacity-40 pointer-events-none'
        }`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Choose Your Portal</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {selectedEnvironment === "water" && "Access water restoration tools and features for your role"}
                {selectedEnvironment === "air" && "Access air quality monitoring tools and features for your role"}
                {selectedEnvironment === "waste" && "Access waste management tools and features for your role"}
                {!selectedEnvironment && "Select an environmental focus above to continue"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portals.map((portal) => {
                const Icon = portal.icon;
                return (
                  <Card 
                    key={portal.title} 
                    className="hover:shadow-water transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                    onClick={() => navigate(portal.href)}
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
    </div>
  );
};

export default Index;
