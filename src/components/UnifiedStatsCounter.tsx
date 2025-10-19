import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Droplet, Wind, Users, TrendingUp, Award, Activity } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  color: string;
}

const StatItem = ({ icon, label, value, suffix = "", color }: StatItemProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-br from-background to-muted/30 border border-border/50 animate-slide-up">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold">
          {displayValue.toLocaleString()}
          {suffix}
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

const UnifiedStatsCounter = () => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        National Environmental Dashboard
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatItem
          icon={<Droplet className="w-6 h-6 text-blue-600" />}
          label="Water Bodies Monitored"
          value={8547}
          color="bg-blue-100"
        />
        
        <StatItem
          icon={<Wind className="w-6 h-6 text-purple-600" />}
          label="Average National AQI"
          value={127}
          color="bg-purple-100"
        />
        
        <StatItem
          icon={<Users className="w-6 h-6 text-green-600" />}
          label="Active Volunteers"
          value={45230}
          color="bg-green-100"
        />
        
        <StatItem
          icon={<TrendingUp className="w-6 h-6 text-orange-600" />}
          label="Restoration Projects"
          value={1247}
          color="bg-orange-100"
        />
        
        <StatItem
          icon={<Award className="w-6 h-6 text-yellow-600" />}
          label="EcoPoints Earned"
          value={2847500}
          color="bg-yellow-100"
        />
        
        <StatItem
          icon={<Activity className="w-6 h-6 text-teal-600" />}
          label="Data Points Collected"
          value={9824567}
          color="bg-teal-100"
        />
      </div>
    </Card>
  );
};

export default UnifiedStatsCounter;
