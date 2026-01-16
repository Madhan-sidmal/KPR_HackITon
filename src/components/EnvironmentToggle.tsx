import { Droplet, Wind, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";

export type EnvironmentView = "water" | "air" | "waste";

interface EnvironmentToggleProps {
  view: EnvironmentView;
  onViewChange: (view: EnvironmentView) => void;
  className?: string;
  showLabel?: boolean;
}

const EnvironmentToggle = ({ view, onViewChange, className = "", showLabel = true }: EnvironmentToggleProps) => {
  const options = [
    { 
      id: "water" as EnvironmentView, 
      label: "Water", 
      icon: Droplet,
      activeClass: "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-blue-500/30",
      hoverClass: "hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-950 dark:hover:text-sky-300",
      iconColor: "text-sky-500"
    },
    { 
      id: "air" as EnvironmentView, 
      label: "Air", 
      icon: Wind,
      activeClass: "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30",
      hoverClass: "hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-950 dark:hover:text-amber-300",
      iconColor: "text-amber-500"
    },
    { 
      id: "waste" as EnvironmentView, 
      label: "Waste", 
      icon: Recycle,
      activeClass: "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30",
      hoverClass: "hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950 dark:hover:text-emerald-300",
      iconColor: "text-emerald-500"
    },
  ];

  return (
    <div className={`flex items-center gap-1 p-1.5 bg-card/90 backdrop-blur-md rounded-xl border-2 shadow-lg ${className}`}>
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = view === option.id;
        return (
          <Button
            key={option.id}
            variant="ghost"
            size="sm"
            onClick={() => onViewChange(option.id)}
            className={`gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isActive 
                ? `${option.activeClass} scale-105` 
                : `${option.hoverClass} ${option.iconColor}`
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />
            {showLabel && <span className="hidden sm:inline">{option.label}</span>}
          </Button>
        );
      })}
    </div>
  );
};

export default EnvironmentToggle;
