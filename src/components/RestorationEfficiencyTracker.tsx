import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Satellite, TrendingUp, AlertCircle, CheckCircle, MapPin, Calendar, Eye } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RestorationEfficiencyTracker = () => {
  const projects = [
    {
      id: 1,
      name: "Bellandur Lake Restoration",
      location: "Bangalore, Karnataka",
      startDate: "Jan 2024",
      fundingUsed: 4200000,
      fundingTotal: 5000000,
      satelliteVerification: "Verified",
      waterQualityImprovement: 68,
      greenCoverIncrease: 42,
      status: "on-track",
      lastSatelliteCheck: "2 days ago",
      alerts: 0
    },
    {
      id: 2,
      name: "Yamuna River Cleanup",
      location: "Delhi",
      startDate: "Mar 2024",
      fundingUsed: 6500000,
      fundingTotal: 8000000,
      satelliteVerification: "Delayed",
      waterQualityImprovement: 28,
      greenCoverIncrease: 15,
      status: "delayed",
      lastSatelliteCheck: "1 week ago",
      alerts: 2
    },
    {
      id: 3,
      name: "Rural Pond Network",
      location: "Rajasthan",
      startDate: "Feb 2024",
      fundingUsed: 1800000,
      fundingTotal: 2000000,
      satelliteVerification: "Verified",
      waterQualityImprovement: 85,
      greenCoverIncrease: 78,
      status: "ahead",
      lastSatelliteCheck: "1 day ago",
      alerts: 0
    },
  ];

  const timelineData = [
    { month: 'Jan', expected: 20, actual: 18 },
    { month: 'Feb', expected: 35, actual: 38 },
    { month: 'Mar', expected: 50, actual: 52 },
    { month: 'Apr', expected: 65, actual: 68 },
    { month: 'May', expected: 80, actual: 82 },
    { month: 'Jun', expected: 95, actual: 88 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ahead": return "text-green-600";
      case "on-track": return "text-primary";
      case "delayed": return "text-orange-600";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ahead": return <Badge className="bg-green-600">Ahead of Schedule</Badge>;
      case "on-track": return <Badge className="bg-primary">On Track</Badge>;
      case "delayed": return <Badge className="bg-orange-600">Delayed</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <Satellite className="w-5 h-5 text-primary" />
              <div className="text-2xl font-bold">24</div>
            </div>
            <div className="text-sm text-muted-foreground">Projects Monitored</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="text-2xl font-bold">18</div>
            </div>
            <div className="text-sm text-muted-foreground">Satellite Verified</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <div className="text-2xl font-bold">78%</div>
            </div>
            <div className="text-sm text-muted-foreground">Avg. Efficiency</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <div className="text-2xl font-bold">3</div>
            </div>
            <div className="text-sm text-muted-foreground">Alerts Pending</div>
          </CardContent>
        </Card>
      </div>

      {/* Satellite Monitoring Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Satellite className="w-5 h-5 text-primary" />
            Live Satellite Monitoring
          </CardTitle>
          <CardDescription>
            Real-time tracking using ISRO Bhuvan and Sentinel satellite imagery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-6 border rounded-lg space-y-4 hover:shadow-soft transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-lg">{project.name}</h4>
                      {getStatusBadge(project.status)}
                      {project.alerts > 0 && (
                        <Badge variant="destructive">
                          {project.alerts} Alert{project.alerts > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Started {project.startDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Verified {project.lastSatelliteCheck}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Funding Utilization</span>
                    <span className="font-semibold">
                      ₹{(project.fundingUsed / 100000).toFixed(1)}L / ₹{(project.fundingTotal / 100000).toFixed(1)}L
                    </span>
                  </div>
                  <Progress value={(project.fundingUsed / project.fundingTotal) * 100} />
                </div>

                {/* Impact Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Water Quality Improvement</span>
                      <span className={`font-semibold ${getStatusColor(project.status)}`}>
                        {project.waterQualityImprovement}%
                      </span>
                    </div>
                    <Progress value={project.waterQualityImprovement} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Green Cover Increase</span>
                      <span className={`font-semibold ${getStatusColor(project.status)}`}>
                        {project.greenCoverIncrease}%
                      </span>
                    </div>
                    <Progress value={project.greenCoverIncrease} />
                  </div>
                </div>

                {/* Satellite Imagery */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-950 dark:to-green-950 rounded-lg border flex items-center justify-center">
                    <div className="text-center text-sm">
                      <Calendar className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-muted-foreground font-medium">Before</p>
                      <p className="text-xs text-muted-foreground">{project.startDate}</p>
                    </div>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-950 dark:to-blue-950 rounded-lg border flex items-center justify-center">
                    <div className="text-center text-sm">
                      <Satellite className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <p className="text-muted-foreground font-medium">Latest</p>
                      <p className="text-xs text-muted-foreground">{project.lastSatelliteCheck}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Satellite className="w-4 h-4 mr-2" />
                    View Satellite History
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Full Report
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Expected vs Actual Progress</CardTitle>
          <CardDescription>Tracking restoration milestones against timeline</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="expected" stroke="#94a3b8" name="Expected" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="actual" stroke="#0ea5e9" name="Actual" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <div className="font-semibold mb-2">AI-Powered Efficiency Insight</div>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  • Projects with regular satellite monitoring show 34% better completion rates
                </p>
                <p>
                  • Bellandur Lake showing exceptional progress - potential model for similar projects
                </p>
                <p>
                  • Yamuna River Cleanup requires immediate attention - 2 weeks behind schedule
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestorationEfficiencyTracker;