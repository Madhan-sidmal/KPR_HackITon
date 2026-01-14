import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Wind, Trash2, Users, Sprout, TrendingUp, ArrowRight, Sparkles, Wheat, Store } from "lucide-react";
import { useEffect, useState } from "react";
import ConnectedPlanetBackground from "./ConnectedPlanetBackground";
import { useNavigate } from "react-router-dom";
const StorytellingHero = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    farmers: 0,
    hectares: 0,
    waterbodies: 0,
    aqi: 0
  });
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    const finalStats = {
      farmers: 245000,
      hectares: 1850000,
      waterbodies: 12430,
      aqi: 145
    };
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        farmers: Math.floor(finalStats.farmers * progress),
        hectares: Math.floor(finalStats.hectares * progress),
        waterbodies: Math.floor(finalStats.waterbodies * progress),
        aqi: Math.floor(finalStats.aqi * progress)
      });
      if (step >= steps) {
        clearInterval(timer);
        setStats(finalStats);
      }
    }, interval);
    return () => clearInterval(timer);
  }, []);
  const stories = [{
    id: "farming",
    icon: Wheat,
    title: "Sustainable Farming",
    tagline: "From Degradation to Regeneration",
    stat: `${(stats.hectares / 1000000).toFixed(1)}M+ Hectares`,
    statLabel: "Under Sustainable Practice",
    description: "Empowering farmers with AI-driven crop advisories, organic practices, and carbon credit tracking for a greener agricultural future.",
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10"
  }, {
    id: "market",
    icon: Store,
    title: "Farm-to-Market",
    tagline: "Fair Prices, Direct Trade",
    stat: `${(stats.farmers / 1000).toFixed(0)}K+`,
    statLabel: "Farmers Connected",
    description: "Real-time mandi prices, supply chain transparency, and direct buyer connections eliminating middlemen for better farmer income.",
    color: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-500/10 to-amber-500/10"
  }, {
    id: "environment",
    icon: Droplet,
    title: "Environmental Intelligence",
    tagline: "Air, Water & Ecosystem Health",
    stat: `${stats.waterbodies.toLocaleString()}`,
    statLabel: "Resources Monitored",
    description: "Unified monitoring of water bodies, air quality across 145+ cities, and waste management to protect the environment that sustains agriculture.",
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10"
  }];
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Connected Planet Background Animation */}
      <ConnectedPlanetBackground />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Main Heading */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-block mb-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium">India's Sustainable Agriculture & Environment Intelligence Network</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                KrishiDhara
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-muted-foreground">
              Sustainable Farming • Fair Markets • Healthy Environment
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A unified platform connecting farmers, NGOs, government, and researchers to build sustainable agriculture and protect India's environment
            </p>
          </div>

          {/* Three Story Panels */}
          <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
            {stories.map((story, index) => {
            const Icon = story.icon;
            return <Card key={story.id} className={`group hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${story.bgGradient} border-2`} style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${story.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      {story.id === "farming" && "🌾"} 
                      {story.id === "market" && "🏪"} 
                      {story.id === "environment" && "🌊"} 
                      {story.title}
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold">
                      {story.tagline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-background/50 rounded-lg">
                      <div className="text-3xl font-bold">{story.stat}</div>
                      <div className="text-sm text-muted-foreground">{story.statLabel}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {story.description}
                    </p>
                  </CardContent>
                </Card>;
          })}
          </div>

          {/* CTA Buttons */}
          

          {/* Combined Impact Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 animate-fade-in">
            <div className="glass-card rounded-2xl p-6 space-y-2 hover:shadow-water transition-all duration-300">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <Sprout className="w-6 h-6" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {(stats.farmers / 1000).toFixed(0)}K+
              </div>
              <div className="text-sm text-muted-foreground">Farmers Connected</div>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-2 hover:shadow-water transition-all duration-300">
              <div className="flex items-center justify-center gap-2 text-orange-600">
                <Wheat className="w-6 h-6" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {(stats.hectares / 1000000).toFixed(1)}M+
              </div>
              <div className="text-sm text-muted-foreground">Hectares Monitored</div>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-2 hover:shadow-water transition-all duration-300">
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Droplet className="w-6 h-6" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {stats.waterbodies.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Water Bodies Tracked</div>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-2 hover:shadow-water transition-all duration-300">
              <div className="flex items-center justify-center gap-2 text-accent">
                <Users className="w-6 h-6" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {stats.aqi}
              </div>
              <div className="text-sm text-muted-foreground">Cities AQI Monitored</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Effect at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,50 C300,100 600,0 900,50 C1050,75 1200,50 1200,50 L1200,120 L0,120 Z" fill="hsl(var(--primary))" fillOpacity="0.05" className="animate-wave" />
          <path d="M0,70 C300,20 600,100 900,70 C1050,50 1200,70 1200,70 L1200,120 L0,120 Z" fill="hsl(var(--primary))" fillOpacity="0.1" className="animate-wave" style={{
          animationDelay: "-2s"
        }} />
        </svg>
      </div>
    </section>;
};
export default StorytellingHero;