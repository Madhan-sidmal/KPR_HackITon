import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Network, TrendingUp, AlertTriangle, Info, ArrowRight } from "lucide-react";

const EnvironmentalCorrelationEngine = () => {
  const correlations = [
    {
      id: 1,
      title: "High AQI → Water Contamination Pattern",
      region: "Delhi NCR",
      confidence: 89,
      severity: "high",
      description: "Spike in PM2.5 levels correlates with increased heavy metal deposits in Yamuna River samples",
      timeframe: "Last 14 days",
      recommendation: "Immediate water quality testing in affected zones"
    },
    {
      id: 2,
      title: "Industrial Emissions → Groundwater Depletion",
      region: "Gujarat Industrial Belt",
      confidence: 76,
      severity: "medium",
      description: "Factory emissions patterns align with accelerated groundwater level drops in 5km radius",
      timeframe: "Last 30 days",
      recommendation: "Audit industrial water usage and air filters"
    },
    {
      id: 3,
      title: "Traffic Pollution → Lake pH Changes",
      region: "Bangalore Tech Corridor",
      confidence: 82,
      severity: "medium",
      description: "Vehicle exhaust increase during peak hours shows correlation with lake acidification",
      timeframe: "Last 7 days",
      recommendation: "Monitor traffic zones near water bodies"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Network className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Environmental Correlation Engine</CardTitle>
                <CardDescription>AI-discovered patterns between air and water pollution events</CardDescription>
              </div>
            </div>
            <Badge className="bg-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              Live Analysis
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 p-4 bg-white/50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{correlations.length}</div>
              <div className="text-sm text-muted-foreground">Active Correlations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">12</div>
              <div className="text-sm text-muted-foreground">Regions Monitored</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">82%</div>
              <div className="text-sm text-muted-foreground">Avg Confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {correlations.map((correlation) => (
          <Card key={correlation.id} className={`border-l-4 ${
            correlation.severity === 'high' 
              ? 'border-l-destructive' 
              : 'border-l-orange-500'
          }`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-lg">{correlation.title}</h4>
                    <Badge variant={correlation.severity === 'high' ? 'destructive' : 'outline'}>
                      {correlation.severity === 'high' ? 'High Priority' : 'Medium Priority'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      {correlation.region}
                    </span>
                    <span>•</span>
                    <span>{correlation.timeframe}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Confidence</div>
                  <div className="text-2xl font-bold text-primary">{correlation.confidence}%</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">{correlation.description}</p>
              <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-sm font-medium text-primary">{correlation.recommendation}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">View Full Analysis</Button>
                <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                  Alert Authorities
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnvironmentalCorrelationEngine;
