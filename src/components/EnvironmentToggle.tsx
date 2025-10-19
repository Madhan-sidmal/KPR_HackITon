import { Droplet, Wind, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export type EnvironmentView = "water" | "air" | "combined";

interface EnvironmentToggleProps {
  view: EnvironmentView;
  onViewChange: (view: EnvironmentView) => void;
  className?: string;
}

const EnvironmentToggle = ({ view, onViewChange, className = "" }: EnvironmentToggleProps) => {
  return (
    <div className={`flex items-center gap-2 p-1 bg-muted rounded-lg ${className}`}>
      <Button
        variant={view === "water" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("water")}
        className={`gap-2 transition-all ${
          view === "water" 
            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" 
            : "hover:bg-blue-50"
        }`}
      >
        <Droplet className="w-4 h-4" />
        <span className="hidden sm:inline">Water</span>
      </Button>
      
      <Button
        variant={view === "air" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("air")}
        className={`gap-2 transition-all ${
          view === "air" 
            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" 
            : "hover:bg-purple-50"
        }`}
      >
        <Wind className="w-4 h-4" />
        <span className="hidden sm:inline">Air</span>
      </Button>
      
      <Button
        variant={view === "combined" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("combined")}
        className={`gap-2 transition-all ${
          view === "combined" 
            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white" 
            : "hover:bg-emerald-50"
        }`}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">Combined</span>
      </Button>
    </div>
  );
};

export default EnvironmentToggle;
