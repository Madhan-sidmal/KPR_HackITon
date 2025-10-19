import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  Trophy,
  MapPin,
  ChevronRight,
  Download,
  LayoutDashboard,
  FolderKanban,
  Brain,
  MessageSquare,
  Menu,
  X
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import PolicySimulator from "@/components/PolicySimulator";
import AutomatedComplianceEngine from "@/components/AutomatedComplianceEngine";
import MinisterialBriefing from "@/components/MinisterialBriefing";

const GovernmentPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");

  const states = [
    { name: "Maharashtra", restored: 1240, progress: 78, index: 8.4 },
    { name: "Karnataka", restored: 1120, progress: 72, index: 7.9 },
    { name: "Tamil Nadu", restored: 980, progress: 68, index: 7.5 },
    { name: "Gujarat", restored: 850, progress: 65, index: 7.2 },
    { name: "Rajasthan", restored: 720, progress: 58, index: 6.8 },
  ];

  const chartData = states.map(state => ({
    name: state.name,
    restored: state.restored,
    index: state.index
  }));

  const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

  const pendingApprovals = [
    { id: 1, type: "NGO Partnership", name: "Clean Water Alliance", state: "Delhi", status: "pending" },
    { id: 2, type: "Funding Request", name: "River Restoration Fund", amount: "₹50,00,000", status: "review" },
    { id: 3, type: "Impact Post", name: "Bellandur Lake Update", ngo: "Waterkeeper India", status: "pending" },
  ];

  const aiInsights = [
    { 
      title: "Critical Depletion Alert", 
      region: "Western Maharashtra", 
      severity: "high",
      recommendation: "Immediate desilting and rainwater harvesting infrastructure needed"
    },
    { 
      title: "Successful Model Identified", 
      region: "Karnataka Stepwells", 
      severity: "low",
      recommendation: "Replicate traditional restoration methods in Rajasthan"
    },
  ];

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "policy", label: "Policy Simulator", icon: Brain },
    { id: "compliance", label: "Compliance Engine", icon: AlertTriangle },
    { id: "briefing", label: "Briefings", icon: FileText },
    { id: "approvals", label: "Approvals", icon: CheckCircle },
    { id: "insights", label: "AI Insights", icon: Brain },
    { id: "feed", label: "Feed Manager", icon: MessageSquare },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}>
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeView === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}>
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="mr-2"
                >
                  {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
                <div>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-secondary" />
                    <h1 className="text-4xl font-bold">Government Portal</h1>
                  </div>
                  <p className="text-muted-foreground">National Water Restoration Dashboard</p>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardDescription>Total Waterbodies</CardDescription>
              <CardTitle className="text-3xl text-primary">12,430</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +18% this quarter
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardDescription>Active NGOs</CardDescription>
              <CardTitle className="text-3xl text-secondary">285</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% this quarter
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardDescription>Citizens Engaged</CardDescription>
              <CardTitle className="text-3xl text-accent">1.2M+</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +24% this quarter
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardDescription>Pending Approvals</CardDescription>
              <CardTitle className="text-3xl text-orange-600">23</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-orange-600">
                <Clock className="w-4 h-4 mr-1" />
                Requires action
              </div>
            </CardContent>
          </Card>
        </div>

            {/* Dashboard View */}
            {activeView === "dashboard" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>State-wise Restoration Progress</CardTitle>
                      <CardDescription>Top performing states</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="restored" fill="#0ea5e9" name="Restored" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Water Restoration Index</CardTitle>
                      <CardDescription>State performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => entry.name}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="index"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>AI-Generated Hotspot Map</CardTitle>
                    <CardDescription>Critical depletion zones across India</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg border flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 mx-auto mb-2 text-destructive" />
                        <p className="text-muted-foreground">Interactive hotspot map visualization</p>
                        <p className="text-sm text-muted-foreground">Powered by AI analysis of satellite data</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Hotspot Regions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                            <span className="font-medium">Western Maharashtra</span>
                          </div>
                          <Badge variant="destructive">Critical</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                            <span className="font-medium">North Karnataka</span>
                          </div>
                          <Badge className="bg-orange-500">High Risk</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-secondary" />
                        Recent Reports
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { title: "Q4 2024 Impact Report", date: "Dec 2024" },
                          { title: "Groundwater Analysis 2024", date: "Nov 2024" },
                          { title: "NGO Performance Review", date: "Oct 2024" },
                        ].map((report) => (
                          <div key={report.title} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                            <div>
                              <div className="font-medium">{report.title}</div>
                              <div className="text-sm text-muted-foreground">{report.date}</div>
                            </div>
                            <Download className="w-4 h-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Approvals View */}
            {activeView === "approvals" && (
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Review and approve NGO partnerships, funding, and content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((approval) => (
                    <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <Badge variant="outline">{approval.type}</Badge>
                        <div className="font-semibold">{approval.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {approval.state || approval.ngo || approval.amount}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            )}

            {/* AI Insights View */}
            {activeView === "insights" && (
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Policy Insights</CardTitle>
                <CardDescription>Data-driven recommendations for water restoration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      insight.severity === 'high' 
                        ? 'border-l-destructive bg-destructive/5' 
                        : 'border-l-green-500 bg-green-500/5'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{insight.title}</h4>
                          <p className="text-sm text-muted-foreground">{insight.region}</p>
                        </div>
                        <Badge variant={insight.severity === 'high' ? 'destructive' : 'outline'}>
                          {insight.severity === 'high' ? 'High Priority' : 'Opportunity'}
                        </Badge>
                      </div>
                      <p className="text-sm">{insight.recommendation}</p>
                      <Button variant="link" className="px-0 mt-2">
                        View detailed analysis <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            )}

            {/* Policy Simulator View */}
            {activeView === "policy" && <PolicySimulator />}

            {/* Compliance Engine View */}
            {activeView === "compliance" && <AutomatedComplianceEngine />}

            {/* Briefing View */}
            {activeView === "briefing" && <MinisterialBriefing />}

            {/* Leaderboard View */}
            {activeView === "leaderboard" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  Inter-State Competition
                </CardTitle>
                <CardDescription>Water Restoration Index Rankings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {states.map((state, index) => (
                    <div key={state.name} className={`flex items-center justify-between p-4 rounded-lg ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-primary/10 border border-yellow-500/20' : 'bg-muted/30'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-yellow-500 text-white' : 
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-amber-700 text-white' :
                          'bg-primary/20 text-primary'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{state.name}</div>
                          <div className="text-sm text-muted-foreground">Index: {state.index}</div>
                        </div>
                      </div>
                      <Trophy className={`w-6 h-6 ${
                        index === 0 ? 'text-yellow-500' :
                        index === 1 ? 'text-gray-400' :
                        index === 2 ? 'text-amber-700' :
                        'text-muted-foreground'
                      }`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            )}

            {/* Projects View */}
            {activeView === "projects" && (
            <Card>
              <CardHeader>
                <CardTitle>All Projects</CardTitle>
                <CardDescription>Monitor restoration projects across India</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <FolderKanban className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Project tracking dashboard</p>
                </div>
              </CardContent>
            </Card>
            )}

            {/* Feed Manager View */}
            {activeView === "feed" && (
            <Card>
              <CardHeader>
                <CardTitle>Impact Feed Manager</CardTitle>
                <CardDescription>Approve verified content before public view</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No pending posts for review</p>
                </div>
              </CardContent>
            </Card>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default GovernmentPortal;
