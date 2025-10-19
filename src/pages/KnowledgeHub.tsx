import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  TrendingUp, 
  Award, 
  Video, 
  Download, 
  Search,
  Lightbulb,
  BarChart,
  FileText,
  Trophy,
  MapPin,
  Calendar,
  Users,
  ExternalLink
} from "lucide-react";

const KnowledgeHub = () => {
  const successStories = [
    {
      title: "Bellandur Lake Revival",
      location: "Bengaluru, Karnataka",
      category: "Water",
      impact: "40% water quality improvement",
      volunteers: 450,
      duration: "18 months",
      image: "water",
      stats: {
        before: "Critical pollution levels",
        after: "Thriving ecosystem restored"
      }
    },
    {
      title: "Delhi Air Quality Initiative",
      location: "New Delhi, Delhi",
      category: "Air",
      impact: "15% AQI reduction",
      volunteers: 820,
      duration: "12 months",
      image: "air",
      stats: {
        before: "AQI 350+ (Hazardous)",
        after: "AQI 280 (Very Unhealthy)"
      }
    },
    {
      title: "Chennai Wetlands Protection",
      location: "Chennai, Tamil Nadu",
      category: "Combined",
      impact: "200 acres protected",
      volunteers: 580,
      duration: "24 months",
      image: "combined",
      stats: {
        before: "Threatened by development",
        after: "Protected biodiversity zone"
      }
    }
  ];

  const dataInsights = [
    {
      title: "Groundwater Correlation Study",
      type: "Research Paper",
      category: "Water",
      downloads: 2340,
      date: "Mar 2024"
    },
    {
      title: "PM2.5 Seasonal Patterns",
      type: "Data Report",
      category: "Air",
      downloads: 1876,
      date: "Feb 2024"
    },
    {
      title: "Urban Heat Island Effect",
      type: "Case Study",
      category: "Combined",
      downloads: 3421,
      date: "Jan 2024"
    }
  ];

  const videos = [
    {
      title: "How to Report Pollution",
      duration: "5:23",
      views: "12K",
      category: "Tutorial"
    },
    {
      title: "Community Cleanup Guide",
      duration: "8:45",
      views: "25K",
      category: "Guide"
    },
    {
      title: "Understanding AQI",
      duration: "6:12",
      views: "18K",
      category: "Education"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Knowledge Hub</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Learn, Explore, Transform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Success stories, data insights, and educational resources for environmental action
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-slide-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search stories, insights, and resources..." 
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="stories" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="stories" className="gap-2">
              <Trophy className="w-4 h-4" />
              Success Stories
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2">
              <BarChart className="w-4 h-4" />
              Data Insights
            </TabsTrigger>
            <TabsTrigger value="education" className="gap-2">
              <Video className="w-4 h-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="awards" className="gap-2">
              <Award className="w-4 h-4" />
              Top Contributors
            </TabsTrigger>
          </TabsList>

          {/* Success Stories */}
          <TabsContent value="stories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className={`h-48 bg-gradient-to-br ${
                    story.category === 'Water' ? 'from-blue-500 to-cyan-500' :
                    story.category === 'Air' ? 'from-purple-500 to-indigo-500' :
                    'from-emerald-500 to-teal-500'
                  } flex items-center justify-center relative`}>
                    <Award className="w-16 h-16 text-white/50" />
                    <Badge className="absolute top-4 right-4 bg-white/90 text-foreground">
                      {story.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{story.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {story.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Impact</p>
                        <p className="font-semibold text-primary">{story.impact}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Volunteers</p>
                        <p className="font-semibold">{story.volunteers}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-semibold">{story.duration}</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t space-y-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Before: </span>
                        <span className="text-red-600">{story.stats.before}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">After: </span>
                        <span className="text-green-600">{story.stats.after}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Read Full Story
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Data Insights */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataInsights.map((insight, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          {insight.title}
                        </CardTitle>
                        <CardDescription>{insight.type}</CardDescription>
                      </div>
                      <Badge variant="outline">{insight.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Download className="w-4 h-4" />
                        <span>{insight.downloads} downloads</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{insight.date}</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos */}
          <TabsContent value="education" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Video className="w-16 h-16 text-primary/50" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{video.duration}</span>
                      <span>•</span>
                      <span>{video.views} views</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">{video.category}</Badge>
                    <Button className="w-full mt-4" variant="outline">
                      Watch Video
                      <Video className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Top Contributors */}
          <TabsContent value="awards" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { rank: 1, name: "Green Warriors NGO", points: 45230, projects: 12, badge: "🥇" },
                { rank: 2, name: "EcoDefenders Delhi", points: 38450, projects: 9, badge: "🥈" },
                { rank: 3, name: "WaterGuardians Mumbai", points: 32180, projects: 8, badge: "🥉" }
              ].map((contributor) => (
                <Card key={contributor.rank} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{contributor.badge}</div>
                      <div>
                        <CardTitle className="text-xl">{contributor.name}</CardTitle>
                        <CardDescription>Rank #{contributor.rank}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">EcoPoints</p>
                        <p className="text-2xl font-bold text-primary">{contributor.points.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Projects</p>
                        <p className="text-2xl font-bold">{contributor.projects}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-none animate-slide-up">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Share Your Story</CardTitle>
            <CardDescription>
              Have an inspiring environmental project? Share it with the community!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
              <Lightbulb className="w-5 h-5 mr-2" />
              Submit Your Story
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default KnowledgeHub;
