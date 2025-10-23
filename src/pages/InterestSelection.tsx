import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Wind, Trash2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEnvironment } from "@/contexts/EnvironmentContext";
import { EnvironmentView } from "@/components/EnvironmentToggle";

const InterestSelection = () => {
  const navigate = useNavigate();
  const { setEnvironment } = useEnvironment();

  const environmentOptions = [
    {
      id: "water" as EnvironmentView,
      title: "Water Management",
      tagline: "From Drought to Revival",
      description: "Monitor water bodies, track restoration projects, and combat water scarcity across India",
      icon: Droplet,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      stats: ["12,430 Water Bodies", "1,240 Restored", "285 Active NGOs"],
    },
    {
      id: "air" as EnvironmentView,
      title: "Air Quality",
      tagline: "From Smog to Sky",
      description: "Track AQI levels, identify pollution sources, and improve air quality in your region",
      icon: Wind,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
      stats: ["850 AQI Stations", "145 Cities", "Real-time Monitoring"],
    },
    {
      id: "waste" as EnvironmentView,
      title: "Waste Management",
      tagline: "From Plastic to Purpose",
      description: "Participate in cleanup drives, track recycling rates, and promote circular economy",
      icon: Trash2,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950",
      stats: ["43.6% Recycling Rate", "82% Coverage", "Clean India Mission"],
    },
  ];

  const handleSelection = (environmentId: EnvironmentView) => {
    setEnvironment(environmentId);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to JeevaDhara
          </h1>
          <p className="text-xl text-muted-foreground mb-2">India's Environmental Intelligence Network</p>
          <p className="text-lg text-muted-foreground">Which environmental domain inspires you most?</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {environmentOptions.map((option, index) => (
            <Card
              key={option.id}
              className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleSelection(option.id)}
            >
              <CardHeader className={`${option.bgColor} transition-colors`}>
                <div className="flex justify-between items-start mb-4">
                  <option.icon className="w-12 h-12" />
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardTitle className="text-2xl">{option.title}</CardTitle>
                <CardDescription className="text-base font-medium">{option.tagline}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <p className="text-muted-foreground">{option.description}</p>
                
                <div className="space-y-2">
                  {option.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full bg-gradient-to-r ${option.color} text-white hover:opacity-90 transition-opacity`}
                >
                  Choose {option.title}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => {
              setEnvironment("water"); // Default
              navigate("/");
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip for now • Explore all domains
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterestSelection;
