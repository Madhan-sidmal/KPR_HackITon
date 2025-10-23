import { Droplet, Wind, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type EnvironmentView = "water" | "air" | "waste";

interface EnvironmentToggleProps {
  view: EnvironmentView;
  onViewChange: (view: EnvironmentView) => void;
  className?: string;
  showLabel?: boolean;
}

const EnvironmentToggle = ({ view, onViewChange, className = "", showLabel = true }: EnvironmentToggleProps) => {
  return (
    <div className={`flex items-center gap-2 p-1 bg-card/80 backdrop-blur-sm rounded-lg border shadow-sm ${className}`}>
      <Button
        variant={view === "water" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("water")}
        className={`gap-2 transition-all ${
          view === "water" 
            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600" 
            : "hover:bg-blue-50 dark:hover:bg-blue-950"
        }`}
      >
        <Droplet className="w-4 h-4" />
        {showLabel && <span className="hidden sm:inline">Water</span>}
      </Button>
      
      <Button
        variant={view === "air" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("air")}
        className={`gap-2 transition-all ${
          view === "air" 
            ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600" 
            : "hover:bg-yellow-50 dark:hover:bg-yellow-950"
        }`}
      >
        <Wind className="w-4 h-4" />
        {showLabel && <span className="hidden sm:inline">Air</span>}
      </Button>
      
      <Button
        variant={view === "waste" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("waste")}
        className={`gap-2 transition-all ${
          view === "waste" 
            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600" 
            : "hover:bg-green-50 dark:hover:bg-green-950"
        }`}
      >
        <Trash2 className="w-4 h-4" />
        {showLabel && <span className="hidden sm:inline">Waste</span>}
      </Button>
    </div>
  );
};

export default EnvironmentToggle;
