import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wind, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

const AirQualitySnapshot = () => {
  const cities = [
    { name: "Delhi", aqi: 312, status: "Severe", pm25: 198, pm10: 425, trend: "worsening" },
    { name: "Mumbai", aqi: 156, status: "Moderate", pm25: 89, pm10: 178, trend: "stable" },
    { name: "Bangalore", aqi: 98, status: "Satisfactory", pm25: 52, pm10: 105, trend: "improving" },
    { name: "Chennai", aqi: 124, status: "Moderate", pm25: 71, pm10: 142, trend: "stable" },
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi > 300) return "text-purple-600 bg-purple-100";
    if (aqi > 200) return "text-red-600 bg-red-100";
    if (aqi > 100) return "text-orange-600 bg-orange-100";
    return "text-green-600 bg-green-100";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-purple-600" />
          National Air Quality Snapshot
        </CardTitle>
        <CardDescription>Real-time AQI across major cities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {cities.map((city) => (
            <div key={city.name} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{city.name}</h4>
                  <Badge variant="outline" className={getAQIColor(city.aqi)}>
                    {city.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getAQIColor(city.aqi).split(' ')[0]}`}>
                    {city.aqi}
                  </div>
                  <div className="text-xs text-muted-foreground">AQI</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">PM2.5:</span>
                  <span className="font-semibold ml-1">{city.pm25}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">PM10:</span>
                  <span className="font-semibold ml-1">{city.pm10}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualitySnapshot;