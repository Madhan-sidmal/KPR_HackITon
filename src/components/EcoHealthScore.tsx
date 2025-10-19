import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Droplet, Wind, Trees, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

const EcoHealthScore = () => {
  const districts = [
    {
      name: "Bangalore Urban",
      score: 72,
      trend: "up",
      water: 68,
      air: 71,
      greenCover: 78,
      rank: 12,
      category: "Good"
    },
    {
      name: "Mumbai Suburban",
      score: 58,
      trend: "down",
      water: 54,
      air: 48,
      greenCover: 72,
      rank: 45,
      category: "Moderate"
    },
    {
      name: "Delhi Central",
      score: 45,
      trend: "down",
      water: 52,
      air: 32,
      greenCover: 51,
      rank: 78,
      category: "Poor"
    },
    {
      name: "Pune",
      score: 76,
      trend: "up",
      water: 74,
      air: 69,
      greenCover: 85,
      rank: 8,
      category: "Good"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-orange-600";
    return "text-destructive";
  };

  const getCategoryBadge = (category: string) => {
    if (category === "Good") return "bg-green-600";
    if (category === "Moderate") return "bg-orange-500";
    return "bg-destructive";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-secondary/10 to-accent/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Holistic Eco-Health Score</CardTitle>
                <CardDescription>Unified environmental health metric combining air, water, and green cover</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 p-4 bg-white/50 rounded-lg">
            <div className="text-center">
              <Droplet className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-sm font-medium">Water Quality</div>
              <div className="text-xs text-muted-foreground">0-100 scale</div>
            </div>
            <div className="text-center">
              <Wind className="w-6 h-6 mx-auto mb-2 text-secondary" />
              <div className="text-sm font-medium">Air Quality</div>
              <div className="text-xs text-muted-foreground">0-100 scale</div>
            </div>
            <div className="text-center">
              <Trees className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="text-sm font-medium">Green Cover</div>
              <div className="text-xs text-muted-foreground">0-100 scale</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {districts.map((district) => (
          <Card key={district.name} className="hover:shadow-water transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {district.name}
                    <Badge className={getCategoryBadge(district.category)}>
                      {district.category}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    National Rank: #{district.rank}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${getScoreColor(district.score)}`}>
                    {district.score}
                  </div>
                  <div className="flex items-center gap-1 text-sm mt-1">
                    {district.trend === "up" ? (
                      <>
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">+3.2%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-4 h-4 text-destructive" />
                        <span className="text-destructive">-2.1%</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-1">
                      <Droplet className="w-3 h-3 text-primary" />
                      <span>Water Quality</span>
                    </div>
                    <span className="font-semibold">{district.water}/100</span>
                  </div>
                  <Progress value={district.water} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-1">
                      <Wind className="w-3 h-3 text-secondary" />
                      <span>Air Quality</span>
                    </div>
                    <span className="font-semibold">{district.air}/100</span>
                  </div>
                  <Progress value={district.air} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-1">
                      <Trees className="w-3 h-3 text-accent" />
                      <span>Green Cover</span>
                    </div>
                    <span className="font-semibold">{district.greenCover}/100</span>
                  </div>
                  <Progress value={district.greenCover} className="h-2" />
                </div>
              </div>

              {district.score < 50 && (
                <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-600">
                    This district requires immediate attention and resource allocation
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EcoHealthScore;
