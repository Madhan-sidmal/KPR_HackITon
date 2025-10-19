import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Award, Star, Crown, Zap, Lock, CheckCircle } from "lucide-react";

const ImpactTiers = () => {
  const currentTier = {
    level: 3,
    name: "Eco Champion",
    points: 2450,
    nextTierPoints: 5000,
    icon: Star
  };

  const tiers = [
    {
      level: 1,
      name: "Eco Starter",
      minPoints: 0,
      maxPoints: 500,
      icon: Zap,
      color: "text-gray-500",
      bgColor: "bg-gray-500/10",
      benefits: [
        "Report environmental issues",
        "Join cleanup drives",
        "Basic EcoFeed access"
      ],
      status: "completed"
    },
    {
      level: 2,
      name: "Eco Defender",
      minPoints: 500,
      maxPoints: 1500,
      icon: Award,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      benefits: [
        "All Starter benefits",
        "Verify citizen reports",
        "Create local awareness campaigns",
        "Access to exclusive challenges"
      ],
      status: "completed"
    },
    {
      level: 3,
      name: "Eco Champion",
      minPoints: 1500,
      maxPoints: 5000,
      icon: Star,
      color: "text-primary",
      bgColor: "bg-primary/10",
      benefits: [
        "All Defender benefits",
        "Lead restoration campaigns",
        "Mentor new members",
        "Priority support from NGOs",
        "Vote on featured projects"
      ],
      status: "current"
    },
    {
      level: 4,
      name: "Eco Guardian",
      minPoints: 5000,
      maxPoints: 15000,
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      benefits: [
        "All Champion benefits",
        "Co-design government campaigns",
        "Access to grant committees",
        "Certified trainer status",
        "Influence policy discussions"
      ],
      status: "locked"
    },
    {
      level: 5,
      name: "Eco Legend",
      minPoints: 15000,
      maxPoints: null,
      icon: Crown,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      benefits: [
        "All Guardian benefits",
        "Advisory board membership",
        "National recognition",
        "Ambassador privileges",
        "Exclusive government collaboration",
        "Lifetime achievement awards"
      ],
      status: "locked"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center`}>
                {currentTier.icon && <currentTier.icon className="w-8 h-8 text-white" />}
              </div>
              <div>
                <CardTitle className="text-3xl">Impact Tier System</CardTitle>
                <CardDescription className="text-base">
                  Unlock new capabilities as you contribute more to the platform
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 p-4 bg-white/50 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Current Tier</div>
              <div className="text-2xl font-bold text-primary">{currentTier.name}</div>
              <div className="text-xs text-muted-foreground">Level {currentTier.level}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Your Points</div>
              <div className="text-2xl font-bold">{currentTier.points.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total earned</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Next Tier</div>
              <div className="text-2xl font-bold text-yellow-500">{currentTier.nextTierPoints - currentTier.points}</div>
              <div className="text-xs text-muted-foreground">points needed</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium">Progress to Next Tier</span>
              <span className="font-bold text-primary">
                {Math.round((currentTier.points / currentTier.nextTierPoints) * 100)}%
              </span>
            </div>
            <Progress value={(currentTier.points / currentTier.nextTierPoints) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Tier Cards */}
      <div className="space-y-4">
        {tiers.map((tier) => (
          <Card key={tier.level} className={`${
            tier.status === "current" ? "ring-2 ring-primary shadow-water" : ""
          } ${tier.status === "locked" ? "opacity-60" : ""} transition-all hover:shadow-soft`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${tier.bgColor} flex items-center justify-center relative`}>
                    <tier.icon className={`w-6 h-6 ${tier.color}`} />
                    {tier.status === "locked" && (
                      <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg">{tier.name}</h4>
                      {tier.status === "current" && (
                        <Badge className="bg-primary">Current</Badge>
                      )}
                      {tier.status === "completed" && (
                        <Badge variant="outline" className="border-green-600 text-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Unlocked
                        </Badge>
                      )}
                      {tier.status === "locked" && (
                        <Badge variant="outline">
                          <Lock className="w-3 h-3 mr-1" />
                          Locked
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Level {tier.level} • {tier.minPoints.toLocaleString()} - {tier.maxPoints ? tier.maxPoints.toLocaleString() : "∞"} points
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <div className="font-medium mb-2 text-sm">Unlocked Capabilities:</div>
                <div className="grid md:grid-cols-2 gap-2">
                  {tier.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        tier.status === "locked" ? "text-muted-foreground" : "text-green-600"
                      }`} />
                      <span className={tier.status === "locked" ? "text-muted-foreground" : ""}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {tier.status === "current" && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <div className="text-sm font-medium text-primary mb-1">
                    🎯 Keep going! You're making an impact
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {tier.maxPoints! - currentTier.points} more points to unlock {tiers[tier.level]?.name || "next tier"}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle>How to Earn Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="font-medium">Complete Challenges</div>
              <div className="text-sm text-muted-foreground">
                Weekly and monthly eco-challenges
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
              <div className="font-medium">Join Events</div>
              <div className="text-sm text-muted-foreground">
                Participate in cleanup drives
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div className="font-medium">Report Issues</div>
              <div className="text-sm text-muted-foreground">
                Help identify problems
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactTiers;