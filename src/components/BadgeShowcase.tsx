import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, Droplet, Users, Leaf, Heart, Zap, Award, Shield } from "lucide-react";

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
  progress?: number;
}

const BadgeShowcase = () => {
  const badges: BadgeItem[] = [
    {
      id: "1",
      name: "Water Guardian",
      description: "Restored your first waterbody",
      icon: <Droplet className="w-8 h-8" />,
      earned: true,
      rarity: "epic",
    },
    {
      id: "2",
      name: "Cleanup Hero",
      description: "Participated in 10 cleanup drives",
      icon: <Shield className="w-8 h-8" />,
      earned: true,
      rarity: "rare",
    },
    {
      id: "3",
      name: "Eco Champion",
      description: "Reached 5000 EcoPoints",
      icon: <Trophy className="w-8 h-8" />,
      earned: true,
      rarity: "common",
    },
    {
      id: "4",
      name: "Community Leader",
      description: "Recruited 50+ volunteers",
      icon: <Users className="w-8 h-8" />,
      earned: false,
      rarity: "legendary",
      progress: 45,
    },
    {
      id: "5",
      name: "Green Thumb",
      description: "Planted 100 trees",
      icon: <Leaf className="w-8 h-8" />,
      earned: false,
      rarity: "rare",
      progress: 67,
    },
    {
      id: "6",
      name: "Generous Donor",
      description: "Donated ₹10,000+",
      icon: <Heart className="w-8 h-8" />,
      earned: false,
      rarity: "epic",
      progress: 32,
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "from-gray-400 to-gray-600";
      case "rare":
        return "from-blue-400 to-blue-600";
      case "epic":
        return "from-purple-400 to-purple-600";
      case "legendary":
        return "from-yellow-400 to-orange-500";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-400";
      case "rare":
        return "border-blue-400";
      case "epic":
        return "border-purple-400";
      case "legendary":
        return "border-yellow-400 animate-pulse-glow";
      default:
        return "border-gray-400";
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {badges.map((badge, index) => (
        <Card
          key={badge.id}
          className={`interactive-card overflow-hidden ${
            badge.earned ? "opacity-100" : "opacity-60"
          } animate-scale-in`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="pt-6">
            {/* Badge Icon */}
            <div className="relative mb-4">
              <div
                className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${getRarityColor(
                  badge.rarity
                )} flex items-center justify-center text-white border-4 ${getRarityBorder(
                  badge.rarity
                )} ${badge.earned ? "" : "grayscale"} transition-all group-hover:scale-110`}
              >
                {badge.icon}
              </div>
              {badge.earned && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <Badge className="bg-green-600 text-white">
                    <Award className="w-3 h-3 mr-1" />
                    Earned
                  </Badge>
                </div>
              )}
            </div>

            {/* Badge Info */}
            <div className="text-center space-y-2">
              <h4 className="font-bold text-lg">{badge.name}</h4>
              <Badge variant="outline" className={`border-${badge.rarity}`}>
                {badge.rarity.toUpperCase()}
              </Badge>
              <p className="text-sm text-muted-foreground">{badge.description}</p>

              {/* Progress for locked badges */}
              {!badge.earned && badge.progress !== undefined && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span className="font-semibold">{badge.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getRarityColor(
                        badge.rarity
                      )} transition-all`}
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BadgeShowcase;
