import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, AlertTriangle, TrendingUp, Recycle } from "lucide-react";

const WasteQualitySnapshot = () => {
  const wasteData = [
    { city: "Mumbai", recyclingRate: 45, status: "moderate", collected: "85%", alerts: 2 },
    { city: "Delhi", recyclingRate: 38, status: "poor", collected: "78%", alerts: 5 },
    { city: "Bangalore", recyclingRate: 52, status: "good", collected: "90%", alerts: 1 },
    { city: "Chennai", recyclingRate: 48, status: "moderate", collected: "82%", alerts: 3 },
    { city: "Kolkata", recyclingRate: 35, status: "poor", collected: "75%", alerts: 4 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600 bg-green-100 dark:bg-green-950";
      case "moderate":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-950";
      case "poor":
        return "text-red-600 bg-red-100 dark:bg-red-950";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-green-600" />
              Waste Management Dashboard
            </CardTitle>
            <CardDescription>Real-time waste collection and recycling metrics across major cities</CardDescription>
          </div>
          <Badge className="bg-green-500 text-white">
            <TrendingUp className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {wasteData.map((city) => (
            <Card key={city.city} className="border-l-4 border-l-green-500 hover:shadow-lg transition-all">
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg">{city.city}</h4>
                  <Badge className={getStatusColor(city.status)}>
                    {city.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Recycle className="w-3 h-3" />
                      Recycling Rate
                    </span>
                    <span className="font-semibold text-green-600">{city.recyclingRate}%</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Trash2 className="w-3 h-3" />
                      Collected
                    </span>
                    <span className="font-semibold">{city.collected}</span>
                  </div>

                  {city.alerts > 0 && (
                    <div className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 dark:bg-orange-950 px-2 py-1 rounded">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{city.alerts} overflow alerts</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">43.6%</div>
            <div className="text-sm text-muted-foreground">National Avg Recycling</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">82%</div>
            <div className="text-sm text-muted-foreground">Collection Coverage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">15</div>
            <div className="text-sm text-muted-foreground">Active Alerts</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteQualitySnapshot;
