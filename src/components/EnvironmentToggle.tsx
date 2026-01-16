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
  const options = [
    { id: "water" as EnvironmentView, label: "Water", icon: Droplet },
    { id: "air" as EnvironmentView, label: "Air", icon: Wind },
    { id: "waste" as EnvironmentView, label: "Waste", icon: Trash2 },
  ];

  return (
    <div className={`flex items-center gap-1 p-1 bg-card/80 backdrop-blur-sm rounded-lg border shadow-sm ${className}`}>
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = view === option.id;
        return (
          <Button
            key={option.id}
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange(option.id)}
            className={`gap-2 transition-all ${
              isActive 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "hover:bg-muted"
            }`}
          >
            <Icon className="w-4 h-4" />
            {showLabel && <span className="hidden sm:inline">{option.label}</span>}
          </Button>
        );
      })}
    </div>
  );
};

export default EnvironmentToggle;
