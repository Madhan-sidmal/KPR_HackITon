import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  Download, 
  Upload, 
  FileText, 
  Database,
  TrendingUp,
  Users,
  Award,
  Search,
  Filter,
  ExternalLink
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PredictiveSandbox from "@/components/PredictiveSandbox";
import GrantFinder from "@/components/GrantFinder";
import PeerReviewSystem from "@/components/PeerReviewSystem";

const ResearchPortal = () => {
  const datasets = [
    { name: "Bhuvan LULC 2024", source: "ISRO", size: "2.4 GB", downloads: 1240, updated: "Jan 2025" },
    { name: "CGWB Groundwater Data", source: "CGWB", size: "850 MB", downloads: 980, updated: "Dec 2024" },
    { name: "CPCB Water Quality", source: "CPCB", size: "420 MB", downloads: 760, updated: "Nov 2024" },
    { name: "Rainfall Patterns 2024", source: "IMD", size: "1.1 GB", downloads: 650, updated: "Dec 2024" },
  ];

  const myPublications = [
    {
      title: "AI-Driven Groundwater Prediction Model",
      journal: "Nature Water",
      date: "Jan 2025",
      citations: 24,
      impact: "Used by 14 NGOs, 2 states",
      status: "published",
    },
    {
      title: "LULC Change Analysis Framework",
      journal: "Water Resources Research",
      date: "Dec 2024",
      citations: 18,
      impact: "Under government review",
      status: "published",
    },
  ];

  const models = [
    { name: "Groundwater Depletion Predictor", accuracy: 89, downloads: 340 },
    { name: "Water Quality Classifier", accuracy: 92, downloads: 280 },
    { name: "Restoration Impact Estimator", accuracy: 85, downloads: 210 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-secondary" />
            <h1 className="text-4xl font-bold">Research Portal</h1>
          </div>
          <p className="text-muted-foreground">Data, models, and insights for water restoration</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">24</div>
              <div className="text-sm text-muted-foreground">Publications</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary mb-1">1,240</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-1">89%</div>
              <div className="text-sm text-muted-foreground">Model Accuracy</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-6 h-6 text-yellow-500" />
                <div className="text-3xl font-bold">Top 10</div>
              </div>
              <div className="text-sm text-muted-foreground">Institution Rank</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="datasets" className="space-y-6">
          <TabsList className="grid w-full max-w-4xl grid-cols-7 text-xs">
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="sandbox">Sandbox</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="grants">Grants</TabsTrigger>
            <TabsTrigger value="review">Peer Review</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Datasets Tab */}
          <TabsContent value="datasets" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Available Datasets</CardTitle>
                    <CardDescription>Download official data for your research</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {datasets.map((dataset, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Database className="w-8 h-8 text-primary" />
                        <div>
                          <div className="font-semibold">{dataset.name}</div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{dataset.source}</span>
                            <span>•</span>
                            <span>{dataset.size}</span>
                            <span>•</span>
                            <span>Updated {dataset.updated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm">
                          <div className="text-muted-foreground">Downloads</div>
                          <div className="font-semibold">{dataset.downloads.toLocaleString()}</div>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Data Request */}
            <Card>
              <CardHeader>
                <CardTitle>Request Custom Dataset</CardTitle>
                <CardDescription>Need specific data? Submit a request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Dataset name or description" />
                <div className="flex gap-2">
                  <Input placeholder="Region/State" className="flex-1" />
                  <Input placeholder="Time period" className="flex-1" />
                </div>
                <Button className="w-full">Submit Request</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sandbox Tab */}
          <TabsContent value="sandbox">
            <PredictiveSandbox />
          </TabsContent>

          {/* Grants Tab */}
          <TabsContent value="grants">
            <GrantFinder />
          </TabsContent>

          {/* Peer Review Tab */}
          <TabsContent value="review">
            <PeerReviewSystem />
          </TabsContent>

          {/* Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My AI Models</h2>
              <Button className="bg-gradient-to-r from-primary to-secondary">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Model
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {models.map((model, index) => (
                <Card key={index} className="hover:shadow-water transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{model.name}</span>
                      <Badge className="bg-green-600">Active</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Accuracy</div>
                        <div className="text-2xl font-bold text-primary">{model.accuracy}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Downloads</div>
                        <div className="text-2xl font-bold">{model.downloads}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Upload Form */}
            <Card>
              <CardHeader>
                <CardTitle>Upload New Model</CardTitle>
                <CardDescription>Share your AI model with the community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Model name" />
                <Input placeholder="Description" />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Accuracy (%)" type="number" />
                  <Input placeholder="Category" />
                </div>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Upload model files (.pkl, .h5, .pt)
                  </p>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  Publish Model
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Publications Tab */}
          <TabsContent value="publications">
            <Card>
              <CardHeader>
                <CardTitle>My Publications</CardTitle>
                <CardDescription>Research papers and studies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myPublications.map((pub, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-lg">{pub.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {pub.journal} • {pub.date}
                          </p>
                        </div>
                        <Badge variant="outline" className="border-green-600 text-green-600">
                          {pub.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span>{pub.citations} citations</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">{pub.impact}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          View PDF
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          External Link
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Feed Tab */}
          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle>Share Insights</CardTitle>
                <CardDescription>Auto-post new published results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-12 text-muted-foreground">
                  <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="mb-4">Your research insights will be automatically posted when published</p>
                  <Button variant="outline">Configure Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Impact Counter */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <div className="font-semibold">Research Impact</div>
                  <div className="text-sm text-muted-foreground">
                    Your work is making a difference
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">14</div>
                <div className="text-sm text-muted-foreground">NGOs using your models</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ResearchPortal;
