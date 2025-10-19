import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Clock, Zap } from "lucide-react";

interface ChallengeCardProps {
  title: string;
  description: string;
  points: number;
  progress: number;
  deadline: string;
  difficulty: "easy" | "medium" | "hard";
  icon: string;
}

const ChallengeCard = ({
  title,
  description,
  points,
  progress,
  deadline,
  difficulty,
  icon,
}: ChallengeCardProps) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="interactive-card overflow-hidden group">
      <CardContent className="pt-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{icon}</div>
            <div>
              <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {title}
              </h4>
              <Badge
                className={`${getDifficultyColor()} text-white text-xs mt-1`}
              >
                {difficulty.toUpperCase()}
              </Badge>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
            <Zap className="w-3 h-3 mr-1" />+{points} pts
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        {/* Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {deadline}
          </div>
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            {progress > 0 ? "Continue" : "Start"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
