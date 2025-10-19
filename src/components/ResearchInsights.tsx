import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Download, ExternalLink, FileText } from "lucide-react";

const ResearchInsights = () => {
  const insights = [
    {
      id: 1,
      title: "AI-Driven Groundwater Prediction Model",
      institution: "IIT Delhi",
      author: "Dr. Rajesh Kumar",
      category: "Machine Learning",
      impact: "Used by 14 NGOs",
      description: "Novel approach using satellite imagery and ML to predict groundwater depletion patterns with 89% accuracy.",
      downloads: 1240,
      date: "Jan 2025",
    },
    {
      id: 2,
      title: "LULC Change Analysis: Impact on Water Retention",
      institution: "IIIT Hyderabad",
      author: "Prof. Anita Sharma",
      category: "Remote Sensing",
      impact: "2 states adopted",
      description: "Comprehensive study on land-use changes and their correlation with reduced water retention capacity in urban areas.",
      downloads: 856,
      date: "Dec 2024",
    },
    {
      id: 3,
      title: "Traditional vs Modern: Stepwell Restoration Efficacy",
      institution: "NIT Jaipur",
      author: "Dr. Vikram Singh",
      category: "Conservation",
      impact: "Policy recommendation",
      description: "Comparative analysis showing traditional restoration methods achieve 35% better water quality outcomes.",
      downloads: 623,
      date: "Nov 2024",
    },
  ];

  return (
    <section id="research" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">
            Research & Innovation
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            <Brain className="w-10 h-10 inline-block mr-2 text-secondary" />
            Data-Driven Insights
          </h2>
          <p className="text-lg text-muted-foreground">
            Latest research powering smarter water restoration strategies
          </p>
        </div>

        {/* Research Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight) => (
            <Card
              key={insight.id}
              className="hover:shadow-water transition-all duration-300 group bg-card/50 backdrop-blur"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="outline" className="border-secondary text-secondary">
                    {insight.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{insight.date}</span>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-secondary transition-colors">
                  {insight.title}
                </CardTitle>
                <CardDescription className="space-y-1">
                  <div className="font-medium text-foreground">{insight.author}</div>
                  <div className="text-sm">{insight.institution}</div>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {insight.description}
                </p>

                {/* Impact Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  {insight.impact}
                </div>

                {/* Stats & Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Download className="w-4 h-4" />
                    {insight.downloads} downloads
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-8 px-2">
                      <FileText className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 px-2">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Explore More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-secondary hover:bg-secondary/10"
          >
            <Brain className="w-4 h-4 mr-2" />
            Explore Research Portal
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResearchInsights;
