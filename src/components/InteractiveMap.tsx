import { MapPin, Zap, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface MapLocation {
  id: number;
  name: string;
  status: "critical" | "warning" | "good" | "excellent";
  lat: number;
  lng: number;
}

const InteractiveMap = () => {
  const locations: MapLocation[] = [
    { id: 1, name: "Bellandur Lake", status: "warning", lat: 12.9, lng: 77.7 },
    { id: 2, name: "Ulsoor Lake", status: "good", lat: 12.98, lng: 77.61 },
    { id: 3, name: "Hebbal Lake", status: "excellent", lat: 13.04, lng: 77.59 },
    { id: 4, name: "Varthur Lake", status: "critical", lat: 12.93, lng: 77.75 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-red-500";
      case "warning": return "bg-yellow-500";
      case "good": return "bg-blue-500";
      case "excellent": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical": return <AlertTriangle className="w-4 h-4" />;
      case "warning": return <Zap className="w-4 h-4" />;
      case "excellent": return <CheckCircle className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative">
      {/* Map Background */}
      <div className="aspect-video bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-blue-950 dark:via-cyan-950 dark:to-green-950 rounded-lg border-2 border-primary/20 overflow-hidden relative">
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {[...Array(96)].map((_, i) => (
              <div key={i} className="border border-primary/30" />
            ))}
          </div>
        </div>

        {/* Location markers */}
        {locations.map((location, index) => (
          <div
            key={location.id}
            className="absolute group cursor-pointer animate-scale-in"
            style={{
              left: `${(location.lng - 77.5) * 10 + 50}%`,
              top: `${(13.1 - location.lat) * 10 + 50}%`,
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Pulse effect */}
            <div className={`absolute w-8 h-8 rounded-full ${getStatusColor(location.status)} opacity-30 animate-ping`} />
            
            {/* Marker */}
            <div className={`relative w-6 h-6 rounded-full ${getStatusColor(location.status)} flex items-center justify-center text-white shadow-lg hover:scale-125 transition-transform`}>
              {getStatusIcon(location.status)}
            </div>

            {/* Hover card */}
            <Card className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-water">
              <CardContent className="p-3">
                <div className="font-semibold mb-1">{location.name}</div>
                <Badge variant="outline" className={`${getStatusColor(location.status)} text-white border-0`}>
                  {location.status.toUpperCase()}
                </Badge>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Center indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <MapPin className="w-8 h-8 text-primary/40 animate-bounce" />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
        {[
          { status: "excellent", label: "Excellent", color: "bg-green-500" },
          { status: "good", label: "Good", color: "bg-blue-500" },
          { status: "warning", label: "Needs Attention", color: "bg-yellow-500" },
          { status: "critical", label: "Critical", color: "bg-red-500" },
        ].map((item) => (
          <div key={item.status} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <span className="text-sm text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveMap;
