import Navbar from "@/components/Navbar";
import AirQualityMap from "@/components/AirQualityMap";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AirQualityMapPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4 pb-4 h-screen flex flex-col">
        <div className="container mx-auto mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Air Quality Map
            </h1>
            <p className="text-muted-foreground">
              Real-time air quality monitoring across major Indian cities
            </p>
          </div>
        </div>
        <div className="container mx-auto flex-1">
          <AirQualityMap />
        </div>
      </div>
    </div>
  );
};

export default AirQualityMapPage;
