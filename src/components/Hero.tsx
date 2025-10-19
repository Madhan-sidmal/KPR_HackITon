import { Button } from "@/components/ui/button";
import { Droplet, Users, Building2, TrendingUp, Wind, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-water-landscape.jpg";
import ConnectedPlanetBackground from "./ConnectedPlanetBackground";

const Hero = () => {
  const [stats, setStats] = useState({
    waterbodies: 12430,
    ngos: 285,
    citizens: 1200000,
    airStations: 850,
  });

  useEffect(() => {
    // Animate numbers on mount
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const finalStats = { waterbodies: 12430, ngos: 285, citizens: 1200000, airStations: 850 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setStats({
        waterbodies: Math.floor(finalStats.waterbodies * progress),
        ngos: Math.floor(finalStats.ngos * progress),
        citizens: Math.floor(finalStats.citizens * progress),
        airStations: Math.floor(finalStats.airStations * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats(finalStats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M+`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K+`;
    return num.toLocaleString();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Connected Planet Background Animation */}
      <ConnectedPlanetBackground />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Main Heading */}
          <div className="space-y-4">
            <div className="inline-block mb-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Droplet className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Water</span>
                <span className="text-muted-foreground">+</span>
                <Wind className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">Air</span>
                <Zap className="w-4 h-4 text-accent" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
                Guardians of Tomorrow
              </span>
              <br />
              <span className="text-3xl md:text-5xl">India's Environmental Intelligence Platform</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Real-time air and water quality monitoring, AI-powered insights, and nationwide citizen action for a healthier India
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a href="#portals">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-water transition-all duration-300 hover:scale-105"
              >
                <Droplet className="mr-2 h-5 w-5" />
                Access Portals
              </Button>
            </a>
            <a href="/map">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary hover:bg-primary/10"
              >
                <Wind className="mr-2 h-5 w-5" />
                Explore Live Environmental Map
              </Button>
            </a>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
            <div className="glass-card rounded-2xl p-6 space-y-2 hover:shadow-water transition-all duration-300">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Droplet className="w-6 h-6" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {formatNumber(stats.waterbodies)}
              </div>
              <div className="text-sm text-muted-foreground">Water Bodies Tracked</div>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-2 hover:shadow-water transition-all duration-300">
              <div className="flex items-center justify-center gap-2 text-secondary">
                <Wind className="w-6 h-6" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {formatNumber(stats.airStations)}
              </div>
              <div className="text-sm text-muted-foreground">Air Quality Stations</div>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-2 hover:shadow-water transition-all duration-300">
              <div className="flex items-center justify-center gap-2 text-secondary">
                <Building2 className="w-6 h-6" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {formatNumber(stats.ngos)}
              </div>
              <div className="text-sm text-muted-foreground">Active NGOs</div>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-2 hover:shadow-water transition-all duration-300">
              <div className="flex items-center justify-center gap-2 text-accent">
                <Users className="w-6 h-6" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {formatNumber(stats.citizens)}
              </div>
              <div className="text-sm text-muted-foreground">Citizens Engaged</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Effect at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 C300,100 600,0 900,50 C1050,75 1200,50 1200,50 L1200,120 L0,120 Z"
            fill="hsl(var(--primary))"
            fillOpacity="0.05"
            className="animate-wave"
          />
          <path
            d="M0,70 C300,20 600,100 900,70 C1050,50 1200,70 1200,70 L1200,120 L0,120 Z"
            fill="hsl(var(--primary))"
            fillOpacity="0.1"
            className="animate-wave"
            style={{ animationDelay: "-2s" }}
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
