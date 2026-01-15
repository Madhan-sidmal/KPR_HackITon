import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplet, Sprout, Leaf, Sun, Calendar } from "lucide-react";

type RiskLevel = "low" | "medium" | "high";

interface ResourceImpactViewProps {
  drinkingWaterRisk: RiskLevel;
  irrigationImpact: RiskLevel;
  soilHealthRisk: RiskLevel;
  cropStressLevel: RiskLevel;
  seasonalRelevance: string;
  className?: string;
}

const getRiskColor = (risk: RiskLevel) => {
  switch (risk) {
    case "low":
      return "bg-green-100 text-green-800 border-green-300";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "high":
      return "bg-red-100 text-red-800 border-red-300";
  }
};

const getRiskBadgeVariant = (risk: RiskLevel) => {
  switch (risk) {
    case "low":
      return "outline";
    case "medium":
      return "secondary";
    case "high":
      return "destructive";
  }
};

const ResourceImpactView = ({
  drinkingWaterRisk,
  irrigationImpact,
  soilHealthRisk,
  cropStressLevel,
  seasonalRelevance,
  className = "",
}: ResourceImpactViewProps) => {
  const impacts = [
    {
      label: "Drinking Water Risk",
      value: drinkingWaterRisk,
      icon: Droplet,
      description: "Impact on potable water sources",
    },
    {
      label: "Irrigation Impact",
      value: irrigationImpact,
      icon: Sprout,
      description: "Effect on agricultural water supply",
    },
    {
      label: "Soil Health Risk",
      value: soilHealthRisk,
      icon: Leaf,
      description: "Degradation of soil quality",
    },
    {
      label: "Crop Stress Level",
      value: cropStressLevel,
      icon: Sun,
      description: "Stress on crop growth and yield",
    },
  ];

  return (
    <Card className={`border-2 border-dashed border-amber-300 bg-amber-50/50 dark:bg-amber-950/20 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-amber-800 dark:text-amber-200">
          <Leaf className="w-5 h-5" />
          Resource Impact on Agriculture
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          How this environmental issue affects agricultural systems
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {impacts.map((impact) => {
            const Icon = impact.icon;
            return (
              <div
                key={impact.label}
                className={`p-3 rounded-lg border ${getRiskColor(impact.value)} transition-all hover:shadow-sm`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{impact.label}</span>
                </div>
                <Badge variant={getRiskBadgeVariant(impact.value)} className="capitalize">
                  {impact.value}
                </Badge>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
            Seasonal Relevance:
          </span>
          <Badge variant="outline" className="bg-white dark:bg-blue-900">
            {seasonalRelevance}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground italic">
          💡 Protecting this environmental resource directly safeguards agricultural productivity in the region.
        </p>
      </CardContent>
    </Card>
  );
};

export default ResourceImpactView;
