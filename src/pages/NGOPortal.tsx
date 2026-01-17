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
  Recycle,
  Gauge,
  Thermometer,
  Waves,
  Factory,
  TreePine,
  Trash2,
  RotateCcw,
  Leaf,
  AlertTriangle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImpactReportGenerator from "@/components/ImpactReportGenerator";
import CoalitionBuilder from "@/components/CoalitionBuilder";
import SmartImpactScoring from "@/components/SmartImpactScoring";
import DonationTransparency from "@/components/DonationTransparency";
import { useEnvironment } from "@/contexts/EnvironmentContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import EnvironmentToggle from "@/components/EnvironmentToggle";

const NGOPortal = () => {
  const { environment, setEnvironment } = useEnvironment();
  const { loading } = useAuthGuard("ngo");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Domain-specific configurations
  const environmentConfig = {
    water: {
      title: "Water Conservation Hub",
      subtitle: "Protecting India's water bodies since 2015",
      orgName: "Waterkeeper Alliance India",
      icon: Droplet,
      bgGradient: "from-sky-500/10 via-blue-500/5 to-cyan-500/10",
      headerGradient: "from-sky-500 to-blue-600",
      cardAccent: "border-l-4 border-l-sky-500",
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
          metrics: { waterQuality: "+35%", biodiversity: "+28 species", areaRestored: "45 hectares" }
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
          metrics: { waterQuality: "Baseline", biodiversity: "Survey pending", areaRestored: "12 hectares" }
        },
      ],
      stats: [
        { label: "Waterbodies Restored", value: 8, icon: Waves },
        { label: "Water Quality Improved", value: "35%", icon: Droplet },
        { label: "Communities Served", value: 24, icon: Users },
        { label: "National Rank", value: "#12", icon: Trophy }
      ],
      features: ["Water Quality Monitoring", "Biodiversity Tracking", "Wetland Mapping", "Community Well Testing"],
      quickActions: ["Add Water Sample", "Report Pollution", "Schedule Cleanup"]
    },
    air: {
      title: "Air Quality Action Center",
      subtitle: "Breathing clean air for healthy communities",
      orgName: "Clean Air India Initiative",
      icon: Wind,
      bgGradient: "from-amber-500/10 via-orange-500/5 to-yellow-500/10",
      headerGradient: "from-amber-400 to-orange-500",
      cardAccent: "border-l-4 border-l-amber-500",
      projects: [
        {
          id: 1,
          name: "City Air Quality Monitoring Network",
          location: "Delhi NCR",
          status: "In Progress",
          progress: 65,
          volunteers: 320,
          funding: { raised: 3500000, goal: 5000000 },
          verified: true,
          metrics: { aqiImprovement: "-15%", stationsDeployed: 24, alertsSent: 1250 }
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
          metrics: { treesPlanted: 500, aqiImprovement: "Pending", corridorLength: "5km" }
        },
      ],
      stats: [
        { label: "Monitoring Stations", value: 45, icon: Gauge },
        { label: "Avg AQI Reduction", value: "18%", icon: Wind },
        { label: "Trees Planted", value: "12K", icon: TreePine },
        { label: "National Rank", value: "#8", icon: Trophy }
      ],
      features: ["Real-time AQI Dashboard", "Emission Source Tracking", "Health Impact Analysis", "Green Zone Mapping"],
      quickActions: ["Report Emission", "Add Sensor Data", "Plant Trees Event"]
    },
    waste: {
      title: "Waste Management Hub",
      subtitle: "Building circular economy solutions",
      orgName: "Zero Waste India Network",
      icon: Recycle,
      bgGradient: "from-emerald-500/10 via-green-500/5 to-teal-500/10",
      headerGradient: "from-emerald-500 to-green-600",
      cardAccent: "border-l-4 border-l-emerald-500",
      projects: [
        {
          id: 1,
          name: "Zero Waste Ward Initiative",
          location: "Indore, Madhya Pradesh",
          status: "In Progress",
          progress: 82,
          volunteers: 560,
          funding: { raised: 4800000, goal: 6000000 },
          verified: true,
          metrics: { wasteReduced: "75%", recyclingRate: "92%", composting: "850 tons" }
        },
        {
          id: 2,
          name: "E-Waste Collection Network",
          location: "Pune, Maharashtra",
          status: "Planning",
          progress: 40,
          volunteers: 240,
          funding: { raised: 1800000, goal: 4000000 },
          verified: false,
          metrics: { collectionPoints: 12, ewasteCollected: "2.5 tons", awarenessEvents: 8 }
        },
      ],
      stats: [
        { label: "Waste Centers", value: 28, icon: Recycle },
        { label: "Waste Diverted", value: "85%", icon: RotateCcw },
        { label: "Composting Sites", value: 15, icon: Leaf },
        { label: "National Rank", value: "#5", icon: Trophy }
      ],
      features: ["Waste Segregation Tracking", "Recycler Network", "Composting Dashboard", "E-Waste Management"],
      quickActions: ["Log Collection", "Report Dumping", "Schedule Pickup"]
    }
  };

  const config = environmentConfig[environment];
  const myProjects = config.projects;
  const DomainIcon = config.icon;

  const recentDonors = [
    { name: "Priya Sharma", amount: 5000, date: "2 hours ago" },
    { name: "Tech Corp India", amount: 50000, date: "1 day ago" },
    { name: "Rajesh Kumar", amount: 2500, date: "2 days ago" },
  ];

  const monthlyData = [
    { month: 'Jan', volunteers: 800, funds: 800000 },
    { month: 'Feb', volunteers: 950, funds: 1200000 },
    { month: 'Mar', volunteers: 1100, funds: 1500000 },
    { month: 'Apr', volunteers: 1240, funds: 1800000 }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.bgGradient} transition-colors duration-500`}>
      <OnboardingTutorial role="ngo" />
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        {/* Domain-specific Header */}
        <div className={`mb-8 p-6 rounded-2xl bg-gradient-to-r ${config.headerGradient} text-white shadow-lg`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <DomainIcon className="w-10 h-10" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold">{config.orgName}</h1>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <p className="text-white/80 text-lg">{config.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <EnvironmentToggle view={environment} onViewChange={setEnvironment} />
              <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-white/30">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {config.quickActions.map((action, idx) => (
            <Button key={idx} variant="outline" className={`${config.cardAccent} whitespace-nowrap`}>
              <Plus className="w-4 h-4 mr-2" />
              {action}
            </Button>
          ))}
        </div>

        {/* Domain-specific Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {config.stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <Card key={idx} className={`glass-card ${config.cardAccent} hover:scale-105 transition-transform`}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <StatIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Domain-specific Features */}
        <Card className={`mb-8 ${config.cardAccent}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DomainIcon className="w-5 h-5 text-primary" />
              {config.title} - Key Features
            </CardTitle>
            <CardDescription>Tools and capabilities for your {environment} initiatives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {config.features.map((feature, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <DomainIcon className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Map Visualization */}
        <Card className={`mb-8 ${config.cardAccent}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPinned className="w-5 h-5 text-primary" />
              Active {environment.charAt(0).toUpperCase() + environment.slice(1)} Projects Map
            </CardTitle>
            <CardDescription>Geographic view of ongoing {environment} projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`aspect-video bg-gradient-to-br ${config.bgGradient} rounded-lg border-2 border-primary/20 flex items-center justify-center`}>
              <div className="text-center">
                <DomainIcon className="w-16 h-16 mx-auto mb-3 text-primary animate-pulse" />
                <p className="text-foreground font-medium mb-1">Interactive {environment.charAt(0).toUpperCase() + environment.slice(1)} Project Map</p>
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
                <Card key={project.id} className={`hover:shadow-water transition-all ${config.cardAccent}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <DomainIcon className="w-5 h-5 text-primary" />
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
                      <Badge className="bg-primary/10 text-primary border-primary/30">{project.status}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Domain-specific Metrics */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                      {Object.entries(project.metrics).map(([key, value], idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-sm font-semibold text-primary">{String(value)}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      ))}
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion</span>
                        <span className="font-semibold text-primary">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {/* Funding */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Funding</span>
                        <span className="font-semibold">
                          ₹{(project.funding.raised / 100000).toFixed(1)}L / ₹{(project.funding.goal / 100000).toFixed(1)}L
                        </span>
                      </div>
                      <Progress value={(project.funding.raised / project.funding.goal) * 100} className="h-2" />
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
                      <Button className={`flex-1 bg-gradient-to-r ${config.headerGradient}`}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Project Form */}
            <Card className={config.cardAccent}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DomainIcon className="w-5 h-5 text-primary" />
                  Create New {environment.charAt(0).toUpperCase() + environment.slice(1)} Project
                </CardTitle>
                <CardDescription>
                  {environment === 'water' && 'Add a new water restoration or conservation project'}
                  {environment === 'air' && 'Add a new air quality monitoring or improvement project'}
                  {environment === 'waste' && 'Add a new waste management or recycling project'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Name</label>
                    <Input placeholder={
                      environment === 'water' ? 'e.g., Lake Restoration Initiative' :
                      environment === 'air' ? 'e.g., Air Quality Monitoring Network' :
                      'e.g., Zero Waste Community Program'
                    } />
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
                    <label className="text-sm font-medium">
                      {environment === 'water' && 'Waterbody Type'}
                      {environment === 'air' && 'Initiative Type'}
                      {environment === 'waste' && 'Waste Category'}
                    </label>
                    <Input placeholder={
                      environment === 'water' ? 'Lake / River / Pond' :
                      environment === 'air' ? 'Monitoring / Green Corridor / Industrial' :
                      'Recycling / Composting / E-Waste'
                    } />
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
                  <div className={`border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer border-primary/30`}>
                    <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload photos and short video
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported: JPG, PNG, MP4 (max 50MB)
                    </p>
                  </div>
                </div>

                <Button className={`w-full bg-gradient-to-r ${config.headerGradient}`}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create {environment.charAt(0).toUpperCase() + environment.slice(1)} Project
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
            <Card className={config.cardAccent}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  NGO Rankings - {environment.charAt(0).toUpperCase() + environment.slice(1)} Domain
                </CardTitle>
                <CardDescription>Your rank compared to other NGOs in {environment} initiatives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`mb-6 p-6 bg-gradient-to-r ${config.headerGradient} rounded-lg text-white text-center`}>
                  <div className="text-5xl font-bold mb-2">{config.stats[3]?.value || "#12"}</div>
                  <p className="text-white/80">Your Current Rank</p>
                  <p className="text-sm text-white/60 mt-2">↑ Up 3 positions this month</p>
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
