import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Leaderboard = () => {
  const topCitizens = [
    { rank: 1, name: "Priya Sharma", location: "Mumbai", points: 12450, badge: "Water Guardian" },
    { rank: 2, name: "Rajesh Kumar", location: "Bangalore", points: 11280, badge: "Cleanup Hero" },
    { rank: 3, name: "Anita Patel", location: "Ahmedabad", points: 10940, badge: "Donor Champion" },
    { rank: 4, name: "Vikram Singh", location: "Jaipur", points: 9850, badge: "Data Reporter" },
    { rank: 5, name: "Lakshmi Iyer", location: "Chennai", points: 9320, badge: "Volunteer Star" },
  ];

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-700" />;
      default:
        return <Award className="w-5 h-5 text-primary" />;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <section id="leaderboard" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-4">
            <Badge className="bg-accent/10 text-accent hover:bg-accent/20">
              Citizen Leaderboard
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              <Trophy className="w-10 h-10 inline-block mr-2 text-yellow-500" />
              EcoHeroes of India
            </h2>
            <p className="text-lg text-muted-foreground">
              Top contributors making a real difference
            </p>
          </div>

          {/* Leaderboard Card */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Top 5 Citizens</span>
                <Badge variant="outline" className="border-primary text-primary">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Updated Live
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCitizens.map((citizen, index) => (
                  <div
                    key={citizen.rank}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:shadow-soft ${
                      index === 0
                        ? "bg-gradient-to-r from-yellow-500/10 to-primary/10 border border-yellow-500/20"
                        : "bg-muted/30 hover:bg-muted/50"
                    }`}
                  >
                    {/* Rank & Medal */}
                    <div className="flex items-center justify-center w-10 h-10">
                      {getMedalIcon(citizen.rank)}
                    </div>

                    {/* Avatar */}
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                        {getInitials(citizen.name)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground truncate">
                          {citizen.name}
                        </h4>
                        {index === 0 && (
                          <Badge className="bg-yellow-500 text-white text-xs">
                            Top
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{citizen.location}</span>
                        <span>•</span>
                        <span className="text-accent font-medium">{citizen.badge}</span>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">
                        {citizen.points.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">EcoPoints</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View Full Leaderboard */}
              <div className="mt-6 text-center">
                <button className="text-sm text-primary hover:underline font-medium">
                  View Full Leaderboard →
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
