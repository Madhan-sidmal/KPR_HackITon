import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Search, Filter, Layers, Droplet, Wind } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnvironmentToggle, { EnvironmentView } from "@/components/EnvironmentToggle";
import { useState } from "react";

const MapPage = () => {
  const [view, setView] = useState<EnvironmentView>("combined");
  const [waterLayers, setWaterLayers] = useState({
    quality: true,
    pollution: true,
    projects: true,
    lulc: true,
    groundwater: true,
  });
  const [airLayers, setAirLayers] = useState({
    stations: true,
    pm25: true,
    pm10: true,
    emissions: true,
    fires: true,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">National Environmental Map</h1>
            <p className="text-muted-foreground">Explore India's environmental data in real-time</p>
          </div>
          <EnvironmentToggle view={view} onViewChange={setView} />
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <Card className="lg:col-span-1 p-4 h-fit">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Map Layers
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Search Location</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="State / District" className="pl-9" />
                </div>
              </div>

              {/* Water Layers */}
              {(view === "water" || view === "combined") && (
                <div className="space-y-3 pb-4 border-b">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Droplet className="w-4 h-4 text-blue-600" />
                    Water Data Layers
                  </div>
                  <div className="space-y-2 pl-6">
                    {[
                      { key: "quality", label: "Water Quality Sensors" },
                      { key: "pollution", label: "Pollution Hotspots" },
                      { key: "projects", label: "Restoration Projects" },
                      { key: "lulc", label: "LULC Data" },
                      { key: "groundwater", label: "Groundwater Levels" },
                    ].map((layer) => (
                      <div key={layer.key} className="flex items-center gap-2">
                        <Checkbox
                          id={`water-${layer.key}`}
                          checked={waterLayers[layer.key as keyof typeof waterLayers]}
                          onCheckedChange={(checked) =>
                            setWaterLayers({ ...waterLayers, [layer.key]: checked })
                          }
                        />
                        <label
                          htmlFor={`water-${layer.key}`}
                          className="text-sm cursor-pointer"
                        >
                          {layer.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Air Layers */}
              {(view === "air" || view === "combined") && (
                <div className="space-y-3 pb-4 border-b">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Wind className="w-4 h-4 text-purple-600" />
                    Air Quality Layers
                  </div>
                  <div className="space-y-2 pl-6">
                    {[
                      { key: "stations", label: "CPCB Monitoring Stations" },
                      { key: "pm25", label: "PM2.5 Heatmap" },
                      { key: "pm10", label: "PM10 Heatmap" },
                      { key: "emissions", label: "Industrial Emissions" },
                      { key: "fires", label: "Crop Burning Alerts" },
                    ].map((layer) => (
                      <div key={layer.key} className="flex items-center gap-2">
                        <Checkbox
                          id={`air-${layer.key}`}
                          checked={airLayers[layer.key as keyof typeof airLayers]}
                          onCheckedChange={(checked) =>
                            setAirLayers({ ...airLayers, [layer.key]: checked })
                          }
                        />
                        <label
                          htmlFor={`air-${layer.key}`}
                          className="text-sm cursor-pointer"
                        >
                          {layer.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Synergy Features */}
              {view === "combined" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <Badge className="bg-emerald-500">NEW</Badge>
                    Correlation Mode
                  </div>
                  <div className="pl-6 space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="correlation" defaultChecked />
                      <label htmlFor="correlation" className="text-sm cursor-pointer">
                        Show Pollution Overlap Zones
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
              <div className="text-center space-y-4 z-10">
                <div className="flex items-center justify-center gap-4 mb-4">
                  {view === "water" && <Droplet className="w-16 h-16 text-blue-500 opacity-50" />}
                  {view === "air" && <Wind className="w-16 h-16 text-purple-500 opacity-50" />}
                  {view === "combined" && (
                    <>
                      <Droplet className="w-12 h-12 text-blue-500 opacity-50" />
                      <Wind className="w-12 h-12 text-purple-500 opacity-50" />
                    </>
                  )}
                </div>
                <p className="text-xl font-semibold">
                  {view === "water" && "Water Quality Map"}
                  {view === "air" && "Air Quality Map"}
                  {view === "combined" && "Unified Environmental Map"}
                </p>
                <p className="text-muted-foreground">Interactive map visualization</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Real-time {view === "combined" ? "environmental" : view} data from sensors across India
                </p>
                <Badge variant="secondary" className="mt-4">
                  Mapbox Integration Ready
                </Badge>
              </div>
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 h-full">
                  {[...Array(64)].map((_, i) => (
                    <div key={i} className="border border-primary/20" />
                  ))}
                </div>
              </div>
            </Card>

            {/* Legend */}
            <Card className="mt-4 p-4">
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium">Legend:</span>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-sm">Excellent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Good</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  <span className="text-sm">Needs Attention</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="text-sm">Critical</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MapPage;
