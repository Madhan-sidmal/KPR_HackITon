import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnvironmentToggle, { EnvironmentView } from "@/components/EnvironmentToggle";
import Leaderboard from "@/components/Leaderboard";
import EcoFeed from "@/components/EcoFeed";
import { useState } from "react";
import { 
  Trophy, 
  Target, 
  Users, 
  Calendar,
  MapPin,
  Award,
  TrendingUp,
  Plus,
  MessageSquare,
  Heart,
  Share2
} from "lucide-react";

const CommunityHub = () => {
  const [view, setView] = useState<EnvironmentView>("combined");

  const challenges = [
    {
      id: 1,
      title: "Water Body Cleanup Drive",
      category: "water",
      location: "Multiple Cities",
      participants: 2340,
      deadline: "15 days left",
      points: 500,
      difficulty: "Medium",
      description: "Join nationwide cleanup drives for lakes and rivers"
    },
    {
      id: 2,
      title: "Tree Plantation Marathon",
      category: "air",
      location: "Delhi NCR",
      participants: 1820,
      deadline: "7 days left",
      points: 750,
      difficulty: "Easy",
      description: "Plant 10,000 trees to combat air pollution"
    },
    {
      id: 3,
      title: "Eco-Warrior Challenge",
      category: "combined",
      location: "Nationwide",
      participants: 5680,
      deadline: "30 days left",
      points: 1000,
      difficulty: "Hard",
      description: "Complete water and air quality improvement tasks"
    }
  ];

  const filteredChallenges = view === "combined" 
    ? challenges 
    : challenges.filter(c => c.category === view || c.category === "combined");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Community Hub</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Unite. Act. Transform.
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Join thousands of eco-warriors making real impact across India
          </p>
          
          <EnvironmentToggle view={view} onViewChange={setView} className="justify-center" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-slide-up">
          {[
            { label: "Active Challenges", value: "28", icon: Target },
            { label: "Total Participants", value: "45,230", icon: Users },
            { label: "Points Earned", value: "2.8M", icon: Award },
            { label: "Cities Covered", value: "142", icon: MapPin }
          ].map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="challenges" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="challenges" className="gap-2">
              <Target className="w-4 h-4" />
              EcoChallenges
            </TabsTrigger>
            <TabsTrigger value="feed" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              EcoFeed
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Available Challenges</h2>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Challenge
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge) => (
                <Card key={challenge.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={
                        challenge.category === 'water' ? 'bg-blue-500' :
                        challenge.category === 'air' ? 'bg-purple-500' :
                        'bg-emerald-500'
                      }>
                        {challenge.category.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{challenge.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {challenge.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground">Participants</p>
                        <p className="text-lg font-semibold flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {challenge.participants}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">EcoPoints</p>
                        <p className="text-lg font-semibold flex items-center gap-1 text-primary">
                          <Award className="w-4 h-4" />
                          {challenge.points}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{challenge.deadline}</span>
                    </div>

                    <Button className="w-full">
                      Join Challenge
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* EcoFeed Tab */}
          <TabsContent value="feed" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Community Updates</h2>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Share Update
              </Button>
            </div>
            <EcoFeed />
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Leaderboard />
          </TabsContent>
        </Tabs>

        {/* Campaign Builder CTA */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-none animate-slide-up">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Start Your Own Campaign</CardTitle>
            <CardDescription>
              Rally your community around a local environmental cause
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
              <TrendingUp className="w-5 h-5 mr-2" />
              Launch Campaign
            </Button>
            <Button size="lg" variant="outline">
              View Campaign Guide
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityHub;
