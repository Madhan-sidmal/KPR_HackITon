import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

interface LiveStatsCounterProps {
  endValue: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  formatter?: (value: number) => string;
  icon?: React.ReactNode;
}

const LiveStatsCounter = ({ 
  endValue, 
  duration = 2000, 
  prefix = "", 
  suffix = "",
  formatter,
  icon
}: LiveStatsCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 60;
    const increment = endValue / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [endValue, duration]);

  const displayValue = formatter ? formatter(count) : count.toLocaleString();

  return (
    <div className="flex items-center gap-2 animate-fade-in">
      {icon}
      <span className="text-3xl md:text-4xl font-bold">
        {prefix}{displayValue}{suffix}
      </span>
      <TrendingUp className="w-4 h-4 text-green-600 animate-pulse" />
    </div>
  );
};

export default LiveStatsCounter;
