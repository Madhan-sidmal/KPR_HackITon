import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, AlertTriangle, MapPin, CheckCircle, ArrowUpRight } from "lucide-react";

const SmartFundAllocation = () => {
  const projects = [
    {
      id: 1,
      name: "Bellandur Lake Restoration",
      location: "Bangalore, Karnataka",
      severity: "Critical",
      requestedAmount: 5000000,
      aiScore: 94,
      impact: "High",
      urgency: "Immediate",
      beneficiaries: 50000,
      status: "pending"
    },
    {
      id: 2,
      name: "Rural Air Quality Improvement",
      location: "Delhi NCR",
      severity: "High",
      requestedAmount: 3500000,
      aiScore: 89,
      impact: "Very High",
      urgency: "2 weeks",
      beneficiaries: 120000,
      status: "pending"
    },
    {
      id: 3,
      name: "Yamuna River Cleanup Phase 2",
      location: "Delhi",
      severity: "Critical",
      requestedAmount: 8000000,
      aiScore: 96,
      impact: "Very High",
      urgency: "Immediate",
      beneficiaries: 200000,
      status: "recommended"
    },
    {
      id: 4,
      name: "Community Pond Revival",
      location: "Rajasthan",
      severity: "Medium",
      requestedAmount: 2000000,
      aiScore: 78,
      impact: "Medium",
      urgency: "1 month",
      beneficiaries: 15000,
      status: "review"
    },
  ];

  const budgetSummary = {
    total: 50000000,
    allocated: 28000000,
    pending: 18500000,
    available: 3500000,
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "destructive";
      case "High": return "default";
      case "Medium": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary mb-1">
              ₹{(budgetSummary.total / 10000000).toFixed(1)}Cr
            </div>
            <div className="text-sm text-muted-foreground">Total Budget FY25</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600 mb-1">
              ₹{(budgetSummary.allocated / 10000000).toFixed(1)}Cr
            </div>
            <div className="text-sm text-muted-foreground">Allocated</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              ₹{(budgetSummary.pending / 10000000).toFixed(1)}Cr
            </div>
            <div className="text-sm text-muted-foreground">Pending Review</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-secondary mb-1">
              ₹{(budgetSummary.available / 10000000).toFixed(1)}Cr
            </div>
            <div className="text-sm text-muted-foreground">Available</div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            AI-Recommended Fund Allocation
          </CardTitle>
          <CardDescription>
            Projects ranked by urgency, impact potential, and data-driven effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`p-6 border rounded-lg space-y-4 transition-all ${
                  project.status === "recommended"
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-lg">{project.name}</h4>
                      {project.status === "recommended" && (
                        <Badge className="bg-primary">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          AI Recommended
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </div>
                  </div>
                  <Badge variant={getSeverityColor(project.severity)}>
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {project.severity}
                  </Badge>
                </div>

                {/* AI Score */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">AI Effectiveness Score</span>
                    <span className="text-primary font-bold">{project.aiScore}/100</span>
                  </div>
                  <Progress value={project.aiScore} className="h-2" />
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-4 gap-4 pt-2">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Requested</div>
                    <div className="font-semibold">
                      ₹{(project.requestedAmount / 100000).toFixed(1)}L
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Impact</div>
                    <div className="font-semibold text-green-600">{project.impact}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Urgency</div>
                    <div className="font-semibold text-orange-600">{project.urgency}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Beneficiaries</div>
                    <div className="font-semibold">{project.beneficiaries.toLocaleString()}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-primary to-secondary"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Funding
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Allocation Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Utilization Forecast</CardTitle>
          <CardDescription>Projected allocation impact over next 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Water Quality Projects</span>
                <span className="font-semibold">42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Air Quality Initiatives</span>
                <span className="font-semibold">28%</span>
              </div>
              <Progress value={28} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Green Cover Expansion</span>
                <span className="font-semibold">18%</span>
              </div>
              <Progress value={18} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Research & Innovation</span>
                <span className="font-semibold">12%</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold text-sm mb-1">AI Insight</div>
                <div className="text-sm text-muted-foreground">
                  Allocating 45% more funds to water restoration projects could improve national 
                  Eco-Health Score by 12 points within 6 months based on historical data.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartFundAllocation;