import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wind, AlertTriangle, ThermometerSun, CloudRain } from "lucide-react";

interface AirQualityCardProps {
  city: string;
  aqi: number;
  pm25: number;
  pm10: number;
  temperature?: number;
  humidity?: number;
}

const getAQIStatus = (aqi: number) => {
  if (aqi <= 50) return { label: "Good", color: "bg-green-500", textColor: "text-green-600" };
  if (aqi <= 100) return { label: "Moderate", color: "bg-yellow-500", textColor: "text-yellow-600" };
  if (aqi <= 200) return { label: "Unhealthy", color: "bg-orange-500", textColor: "text-orange-600" };
  if (aqi <= 300) return { label: "Very Unhealthy", color: "bg-red-500", textColor: "text-red-600" };
  return { label: "Hazardous", color: "bg-purple-500", textColor: "text-purple-600" };
};

const AirQualityCard = ({ city, aqi, pm25, pm10, temperature, humidity }: AirQualityCardProps) => {
  const status = getAQIStatus(aqi);

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-primary" />
            {city}
          </CardTitle>
          <Badge className={`${status.color} text-white`}>{status.label}</Badge>
        </div>
        <CardDescription>Real-time Air Quality Index</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold ${status.textColor}">{aqi}</span>
            <span className="text-sm text-muted-foreground">AQI</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">PM2.5</p>
              <p className="text-lg font-semibold">{pm25} μg/m³</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">PM10</p>
              <p className="text-lg font-semibold">{pm10} μg/m³</p>
            </div>
          </div>

          {(temperature || humidity) && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              {temperature && (
                <div className="flex items-center gap-2">
                  <ThermometerSun className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">{temperature}°C</span>
                </div>
              )}
              {humidity && (
                <div className="flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{humidity}%</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityCard;
