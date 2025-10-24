import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  MapPin, 
  Trophy, 
  Camera,
  Award,
  Target,
  TrendingUp,
  Upload,
  Heart,
  Leaf,
  MessageSquare,
  ThumbsUp,
  Share2,
  DollarSign,
  Map,
  Zap,
  Flame
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChallengeCard from "@/components/ChallengeCard";
import BadgeShowcase from "@/components/BadgeShowcase";
import AirQualityMap from "@/components/AirQualityMap";
import ImpactTiers from "@/components/ImpactTiers";

const CitizenPortal = () => {
  const [activeTab, setActiveTab] = useState("home");
  
  const userStats = {
    ecoPoints: 2450,
    rank: 124,
    badges: ["Water Guardian", "Cleanup Hero", "Donor"],
    nextMilestone: 3000,
  };

  const challenges = [
    { 
      title: "Clean 1 Pond", 
      description: "Join a cleanup drive and restore a local pond",
      points: 100, 
      progress: 75, 
      deadline: "3 days left",
      difficulty: "medium" as const,
      icon: "💧"
    },
    { 
      title: "Plant 5 Trees", 
      description: "Participate in tree planting event",
      points: 50, 
      progress: 40, 
      deadline: "1 week left",
      difficulty: "easy" as const,
      icon: "🌳"
    },
    { 
      title: "Report 3 Issues", 
      description: "Help identify waterbodies that need attention",
      points: 75, 
      progress: 33, 
      deadline: "5 days left",
      difficulty: "easy" as const,
      icon: "📸"
    },
    { 
      title: "Donate ₹500", 
      description: "Support restoration projects financially",
      points: 150, 
      progress: 0, 
      deadline: "2 weeks left",
      difficulty: "medium" as const,
      icon: "💝"
    },
    { 
      title: "Recruit 10 Friends", 
      description: "Grow the community by inviting friends",
      points: 200, 
      progress: 0, 
      deadline: "1 month left",
      difficulty: "hard" as const,
      icon: "👥"
    },
  ];

  const nearbyLocations = [
    { name: "Ulsoor Lake", distance: "2.3 km", status: "Good", lastUpdated: "2 days ago" },
    { name: "Sankey Tank", distance: "4.1 km", status: "Needs Attention", lastUpdated: "1 week ago" },
    { name: "Hebbal Lake", distance: "5.8 km", status: "Excellent", lastUpdated: "1 day ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Top Gamification Bar */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent py-4 sticky top-16 z-30 border-b shadow-lg animate-shimmer">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 animate-pulse-glow">
                <Zap className="w-6 h-6 text-yellow-300" />
                <span className="text-white font-semibold">EcoPoints:</span>
                <span className="text-3xl font-bold text-white">{userStats.ecoPoints}</span>
                <Leaf className="w-5 h-5 text-green-300 animate-float" />
              </div>
              <Badge className="bg-white/20 backdrop-blur text-white border-white/30 px-3 py-1">
                <Trophy className="w-4 h-4 mr-1 text-yellow-300" />
                Rank #{userStats.rank}
              </Badge>
              <Badge className="bg-white/20 backdrop-blur text-white border-white/30 px-3 py-1">
                <Award className="w-4 h-4 mr-1" />
                {userStats.badges.length} Badges
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Flame className="w-5 h-5 text-orange-300 animate-pulse" />
              <span className="text-sm font-medium">
                {userStats.nextMilestone - userStats.ecoPoints} points to next milestone
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        {/* Home View */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome, Citizen!</h1>
          <p className="text-muted-foreground">Track your impact and join local initiatives</p>
        </div>

        {/* Local Water Status Banner */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="mb-2">Auto-detected Location: Bangalore</Badge>
                <h2 className="text-2xl font-bold mb-1">Your Local Water Status</h2>
                <p className="text-muted-foreground">Current condition: Good • 3 nearby lakes tracked</p>
              </div>
              <Button 
                className="bg-gradient-to-r from-primary to-secondary"
                onClick={() => setActiveTab("map")}
              >
                <Map className="w-4 h-4 mr-2" />
                View Map
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <Leaf className="w-6 h-6 text-primary" />
                <div className="text-3xl font-bold">{userStats.ecoPoints}</div>
              </div>
              <div className="text-sm text-muted-foreground">EcoPoints 🌱</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <div className="text-3xl font-bold">#{userStats.rank}</div>
              </div>
              <div className="text-sm text-muted-foreground">Regional Rank</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold mb-1">{userStats.badges.length}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-2">Next Milestone</div>
              <Progress value={(userStats.ecoPoints / userStats.nextMilestone) * 100} className="mb-2" />
              <div className="text-xs text-muted-foreground">{userStats.nextMilestone - userStats.ecoPoints} points to go</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-4xl grid-cols-6">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="map">Explore Map</TabsTrigger>
            <TabsTrigger value="tiers">Impact Tiers</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="report">Report Issue</TabsTrigger>
            <TabsTrigger value="badges">My Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Nearby Waterbodies
                  </CardTitle>
                  <CardDescription>Water status in your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {nearbyLocations.map((location, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div>
                          <div className="font-semibold">{location.name}</div>
                          <div className="text-sm text-muted-foreground">{location.distance} • Updated {location.lastUpdated}</div>
                        </div>
                        <Badge variant={location.status === "Good" || location.status === "Excellent" ? "outline" : "destructive"}>
                          {location.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Feed</CardTitle>
                  <CardDescription>Latest updates from your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { user: "Priya S.", action: "cleaned Ulsoor Lake", points: 100, time: "2h ago" },
                      { user: "Rajesh K.", action: "donated ₹5000", points: 50, time: "5h ago" },
                      { user: "Lakshmi I.", action: "reported pollution issue", points: 25, time: "1d ago" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                          {activity.user.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-semibold">{activity.user}</span> {activity.action}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-primary">+{activity.points} points</span>
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Nearby Restoration Drives</CardTitle>
                <CardDescription>Join local cleanup and restoration events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "Bellandur Lake Cleanup", date: "This Saturday", volunteers: 45, location: "5.2 km away" },
                    { name: "Tree Planting Drive", date: "Next Sunday", volunteers: 32, location: "3.8 km away" },
                  ].map((event, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-soft transition-all">
                      <h4 className="font-semibold mb-2">{event.name}</h4>
                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <p className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {event.volunteers} volunteers registered
                        </p>
                        <p className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </p>
                        <p className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {event.date}
                        </p>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                        Register Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Explore Map Tab */}
          <TabsContent value="map" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-primary" />
                  Explore Local Waterbodies
                </CardTitle>
                <CardDescription>Interactive map of water bodies near you with real-time status</CardDescription>
              </CardHeader>
              <CardContent className="h-[600px]">
                <AirQualityMap />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact Tiers Tab */}
          <TabsContent value="tiers" className="animate-fade-in">
            <ImpactTiers />
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6 animate-fade-in">
            {/* Active Challenges */}
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Your Active Challenges
                </CardTitle>
                <CardDescription>Track your progress and earn EcoPoints</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge, index) => (
                <ChallengeCard
                  key={index}
                  title={challenge.title}
                  description={challenge.description}
                  points={challenge.points}
                  progress={challenge.progress}
                  deadline={challenge.deadline}
                  difficulty={challenge.difficulty}
                  icon={challenge.icon}
                />
              ))}
            </div>

            {/* Level Progress */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">Level 12</h3>
                    <p className="text-muted-foreground">Eco Champion</p>
                  </div>
                  <Trophy className="w-12 h-12 text-yellow-500 animate-pulse" />
                </div>
                <Progress value={(userStats.ecoPoints % 1000) / 10} className="h-3 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {1000 - (userStats.ecoPoints % 1000)} EcoPoints to Level 13
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="report">
            <Card>
              <CardHeader>
                <CardTitle>Report an Issue</CardTitle>
                <CardDescription>Help us identify waterbodies that need attention (Geo-tagged)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Location (Auto-detected: Bangalore)" />
                  <Input placeholder="Waterbody Name" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Latitude" />
                  <Input placeholder="Longitude" />
                </div>
                <Textarea placeholder="Describe the issue..." rows={4} />
                <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Upload photo (Geo-tagged)</p>
                  <p className="text-xs text-muted-foreground mt-1">Max 10MB • JPG, PNG</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Report (+25 EcoPoints)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="animate-fade-in">
            <div className="mb-6">
              <Card className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-primary/10">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Trophy className="w-16 h-16 mx-auto mb-3 text-yellow-500" />
                    <h3 className="text-2xl font-bold mb-1">Badges Gallery</h3>
                    <p className="text-muted-foreground">You've earned {userStats.badges.length} badges!</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {userStats.badges.map((badge) => (
                <Card key={badge} className="text-center hover:shadow-water transition-all">
                  <CardContent className="pt-6">
                    <Award className="w-12 h-12 mx-auto mb-2 text-yellow-500" />
                    <div className="font-semibold">{badge}</div>
                    <Badge variant="outline" className="mt-2">Earned</Badge>
                  </CardContent>
                </Card>
              ))}
              {[
                "Data Reporter ⭐",
                "Tree Planter 🌳",
                "Workshop Attendee 🎓",
              ].map((badge) => (
                <Card key={badge} className="text-center opacity-50">
                  <CardContent className="pt-6">
                    <Award className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <div className="font-semibold text-muted-foreground">{badge}</div>
                    <Badge variant="outline" className="mt-2">Locked</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default CitizenPortal;
