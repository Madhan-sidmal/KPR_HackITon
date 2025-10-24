import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const GOOGLE_MAPS_API_KEY = "AIzaSyBb7DMCAKF6oOivtCmCrAfUp_kb8P_-jHM";

interface AQILocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  aqi: number;
  status: string;
}

const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return "#4ade80"; // Good - Green
  if (aqi <= 100) return "#facc15"; // Moderate - Yellow
  if (aqi <= 150) return "#fb923c"; // Unhealthy for sensitive - Orange
  if (aqi <= 200) return "#ef4444"; // Unhealthy - Red
  if (aqi <= 300) return "#a855f7"; // Very Unhealthy - Purple
  return "#7f1d1d"; // Hazardous - Maroon
};

const getAQIStatus = (aqi: number): string => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};

// Sample AQI data for major Indian cities
const aqiLocations: AQILocation[] = [
  { id: "1", name: "Delhi", lat: 28.6139, lng: 77.2090, aqi: 312, status: "Hazardous" },
  { id: "2", name: "Mumbai", lat: 19.0760, lng: 72.8777, aqi: 156, status: "Unhealthy" },
  { id: "3", name: "Bangalore", lat: 12.9716, lng: 77.5946, aqi: 87, status: "Moderate" },
  { id: "4", name: "Kolkata", lat: 22.5726, lng: 88.3639, aqi: 203, status: "Very Unhealthy" },
  { id: "5", name: "Chennai", lat: 13.0827, lng: 80.2707, aqi: 92, status: "Moderate" },
  { id: "6", name: "Hyderabad", lat: 17.3850, lng: 78.4867, aqi: 124, status: "Unhealthy for Sensitive" },
  { id: "7", name: "Pune", lat: 18.5204, lng: 73.8567, aqi: 98, status: "Moderate" },
  { id: "8", name: "Ahmedabad", lat: 23.0225, lng: 72.5714, aqi: 178, status: "Unhealthy" },
  { id: "9", name: "Jaipur", lat: 26.9124, lng: 75.7873, aqi: 189, status: "Unhealthy" },
  { id: "10", name: "Lucknow", lat: 26.8467, lng: 80.9462, aqi: 245, status: "Very Unhealthy" },
];

const AirQualityMap = () => {
  const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Center of India

  return (
    <div className="w-full h-full">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <div className="relative w-full h-full">
          <Map
            defaultCenter={defaultCenter}
            defaultZoom={5}
            mapId="air-quality-map"
            className="w-full h-full rounded-lg"
            gestureHandling="greedy"
          >
            {aqiLocations.map((location) => (
              <AdvancedMarker
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
              >
                <Pin
                  background={getAQIColor(location.aqi)}
                  borderColor={getAQIColor(location.aqi)}
                  glyphColor="#ffffff"
                >
                  <div className="bg-white rounded-full px-2 py-1 text-xs font-bold shadow-lg">
                    {location.aqi}
                  </div>
                </Pin>
              </AdvancedMarker>
            ))}
          </Map>

          {/* Legend */}
          <Card className="absolute bottom-4 left-4 w-64 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Air Quality Index</CardTitle>
              <CardDescription className="text-xs">Real-time AQI across India</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { range: "0-50", status: "Good", color: "#4ade80" },
                { range: "51-100", status: "Moderate", color: "#facc15" },
                { range: "101-150", status: "Unhealthy (Sensitive)", color: "#fb923c" },
                { range: "151-200", status: "Unhealthy", color: "#ef4444" },
                { range: "201-300", status: "Very Unhealthy", color: "#a855f7" },
                { range: "300+", status: "Hazardous", color: "#7f1d1d" },
              ].map((item) => (
                <div key={item.range} className="flex items-center gap-2 text-xs">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="flex-1">{item.status}</span>
                  <span className="text-muted-foreground">{item.range}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* City Stats */}
          <Card className="absolute top-4 right-4 w-72 shadow-lg max-h-96 overflow-y-auto">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Major Cities</CardTitle>
              <CardDescription className="text-xs">Current air quality status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {aqiLocations.sort((a, b) => b.aqi - a.aqi).map((location) => (
                <div key={location.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{location.name}</p>
                    <p className="text-xs text-muted-foreground">{getAQIStatus(location.aqi)}</p>
                  </div>
                  <Badge 
                    style={{ 
                      backgroundColor: getAQIColor(location.aqi),
                      color: '#ffffff'
                    }}
                    className="font-bold"
                  >
                    {location.aqi}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </APIProvider>
    </div>
  );
};

export default AirQualityMap;
