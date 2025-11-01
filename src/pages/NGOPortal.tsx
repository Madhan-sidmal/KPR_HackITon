import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, 
  Plus, 
  MapPin, 
  Users, 
  Heart, 
  TrendingUp,
  CheckCircle,
  Camera,
  MessageSquare,
  Trophy,
  Share2,
  Upload,
  Video,
  MapPinned,
  Droplet,
  Wind,
  Trash2
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImpactReportGenerator from "@/components/ImpactReportGenerator";
import CoalitionBuilder from "@/components/CoalitionBuilder";
import SmartImpactScoring from "@/components/SmartImpactScoring";
import DonationTransparency from "@/components/DonationTransparency";
import { useEnvironment } from "@/contexts/EnvironmentContext";

const NGOPortal = () => {
  const navigate = useNavigate();
  const { environment } = useEnvironment();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  const environmentConfig = {
    water: {
      projects: [
        {
          id: 1,
          name: "Bellandur Lake Restoration",
          location: "Bangalore, Karnataka",
          status: "In Progress",
          progress: 78,
          volunteers: 450,
          funding: { raised: 4200000, goal: 5000000 },
          verified: true,
        },
        {
          id: 2,
          name: "Community Pond Revival",
          location: "Mysore, Karnataka",
          status: "Planning",
          progress: 25,
          volunteers: 120,
          funding: { raised: 800000, goal: 2000000 },
          verified: false,
        },
      ],
      stat1: { label: "Waterbodies Restored", value: 8 },
      icon: Droplet
    },
    air: {
      projects: [
        {
          id: 1,
          name: "City Air Quality Monitoring",
          location: "Delhi NCR",
          status: "In Progress",
          progress: 65,
          volunteers: 320,
          funding: { raised: 3500000, goal: 5000000 },
          verified: true,
        },
        {
          id: 2,
          name: "Green Corridor Development",
          location: "Mumbai, Maharashtra",
          status: "Planning",
          progress: 30,
          volunteers: 180,
          funding: { raised: 1200000, goal: 3000000 },
          verified: false,
        },
      ],
      stat1: { label: "Air Quality Stations", value: 12 },
      icon: Wind
    },
    waste: {
      projects: [
        {
          id: 1,
          name: "Zero Waste Initiative",
          location: "Indore, Madhya Pradesh",
          status: "In Progress",
          progress: 82,
          volunteers: 560,
          funding: { raised: 4800000, goal: 6000000 },
          verified: true,
        },
        {
          id: 2,
          name: "Recycling Hub Setup",
          location: "Pune, Maharashtra",
          status: "Planning",
          progress: 40,
          volunteers: 240,
          funding: { raised: 1800000, goal: 4000000 },
          verified: false,
        },
      ],
      stat1: { label: "Waste Centers Setup", value: 15 },
      icon: Trash2
    }
  };

  const config = environmentConfig[environment];
  const myProjects = config.projects;

  const recentDonors = [
    { name: "Priya Sharma", amount: 5000, date: "2 hours ago" },
    { name: "Tech Corp India", amount: 50000, date: "1 day ago" },
    { name: "Rajesh Kumar", amount: 2500, date: "2 days ago" },
  ];

  const stats = {
    totalRestored: config.stat1.value,
    totalVolunteers: 1240,
    fundsRaised: 12500000,
    rank: 12,
  };

  const monthlyData = [
    { month: 'Jan', volunteers: 800, funds: 800000 },
    { month: 'Feb', volunteers: 950, funds: 1200000 },
    { month: 'Mar', volunteers: 1100, funds: 1500000 },
    { month: 'Apr', volunteers: 1240, funds: 1800000 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        {/* Header with Profile */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl">
                WK
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">Waterkeeper Alliance India</h1>
                  <Badge className="bg-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <p className="text-muted-foreground">Protecting India's water bodies since 2015</p>
              </div>
            </div>
            <Button variant="outline">
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <config.icon className="w-6 h-6 text-primary" />
                <div className="text-3xl font-bold">{stats.totalRestored}</div>
              </div>
              <div className="text-sm text-muted-foreground">{config.stat1.label}</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary mb-1">{stats.totalVolunteers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Volunteers</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-1">₹{(stats.fundsRaised / 100000).toFixed(1)}L</div>
              <div className="text-sm text-muted-foreground">Funds Raised</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <div className="text-3xl font-bold">#{stats.rank}</div>
              </div>
              <div className="text-sm text-muted-foreground">National Rank</div>
            </CardContent>
          </Card>
        </div>

        {/* Map Visualization */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPinned className="w-5 h-5 text-primary" />
              Active Projects Map
            </CardTitle>
            <CardDescription>Geographic view of ongoing restoration projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg border flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-primary" />
                <p className="text-muted-foreground font-medium mb-1">Interactive Project Map</p>
                <p className="text-sm text-muted-foreground">Pinned locations with real-time progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full max-w-6xl grid-cols-8 text-xs">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="scoring">Impact Score</TabsTrigger>
            <TabsTrigger value="transparency">Transparency</TabsTrigger>
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="collaborate">Collaborate</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Active Projects</h2>
              <Button className="bg-gradient-to-r from-primary to-secondary">
                <Plus className="w-4 h-4 mr-2" />
                Add New Project
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {myProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-water transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          {project.name}
                          {project.verified && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              ✓ Gov Verified
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {project.location}
                        </CardDescription>
                      </div>
                      <Badge>{project.status}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion</span>
                        <span className="font-semibold text-primary">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>

                    {/* Funding */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Funding</span>
                        <span className="font-semibold">
                          ₹{(project.funding.raised / 100000).toFixed(1)}L / ₹{(project.funding.goal / 100000).toFixed(1)}L
                        </span>
                      </div>
                      <Progress value={(project.funding.raised / project.funding.goal) * 100} />
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {project.volunteers} volunteers
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        Active
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" className="flex-1">
                        <Camera className="w-4 h-4 mr-2" />
                        Photos
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Video className="w-4 h-4 mr-2" />
                        Video
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Project Form */}
            <Card>
              <CardHeader>
                <CardTitle>Create New Project</CardTitle>
                <CardDescription>Add a new water restoration project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Name</label>
                    <Input placeholder="e.g., Lake Restoration Initiative" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input placeholder="City, State" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Describe your project goals and approach..." rows={4} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Funding Goal (₹)</label>
                    <Input type="number" placeholder="5000000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Waterbody Type</label>
                    <Input placeholder="Lake / River / Pond" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Geo-Location Tagging</label>
                  <div className="flex gap-2">
                    <Input placeholder="Latitude" className="flex-1" />
                    <Input placeholder="Longitude" className="flex-1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload Before/After Photos & Video</label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload photos and short video
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported: JPG, PNG, MP4 (max 50MB)
                    </p>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Project
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact Reports Tab */}
          <TabsContent value="reports">
            <ImpactReportGenerator />
          </TabsContent>

          {/* Impact Scoring Tab */}
          <TabsContent value="scoring">
            <SmartImpactScoring />
          </TabsContent>

          {/* Transparency Tab */}
          <TabsContent value="transparency">
            <DonationTransparency />
          </TabsContent>

          {/* Impact Feed Tab */}
          <TabsContent value="feed">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Impact</CardTitle>
                <CardDescription>Post updates visible to all users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea placeholder="Share your latest restoration update..." rows={4} />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Photo
                    </Button>
                    <Button variant="outline" size="sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location
                    </Button>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-secondary">
                    <Share2 className="w-4 h-4 mr-2" />
                    Post Update
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your recent posts will appear here</p>
            </div>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Growth Analytics</CardTitle>
                <CardDescription>Track your funding and volunteer growth</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="volunteers" fill="#0ea5e9" name="Volunteers" />
                    <Bar dataKey="funds" fill="#22c55e" name="Funds (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Donors</CardTitle>
                <CardDescription>Thank your supporters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentDonors.map((donor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                          {donor.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{donor.name}</div>
                          <div className="text-sm text-muted-foreground">{donor.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">₹{donor.amount.toLocaleString()}</div>
                        <Button variant="link" className="h-auto p-0 text-xs">
                          Send Thanks
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  NGO Rankings
                </CardTitle>
                <CardDescription>Your rank compared to other NGOs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-6 bg-gradient-to-r from-yellow-500/10 to-primary/10 rounded-lg border border-yellow-500/20 text-center">
                  <div className="text-5xl font-bold text-primary mb-2">#{stats.rank}</div>
                  <p className="text-muted-foreground">Your Current Rank</p>
                  <p className="text-sm text-green-600 mt-2">↑ Up 3 positions this month</p>
                </div>
                <div className="text-center text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Keep up the great work to climb the leaderboard!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collaborate Tab */}
          <TabsContent value="collaborate">
            <CoalitionBuilder />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default NGOPortal;
