import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Factory, AlertTriangle, CheckCircle, Clock, FileText, Bell, TrendingUp } from "lucide-react";

const AutomatedComplianceEngine = () => {
  const violations = [
    {
      id: 1,
      company: "Delhi Steel Manufacturing Ltd.",
      location: "Okhla Industrial Area, Delhi",
      violationType: "PM2.5 Emission Limit Exceeded",
      severity: "critical",
      currentLevel: 285,
      permittedLevel: 150,
      unit: "μg/m³",
      duration: "Continuous for 48 hours",
      status: "auto-flagged",
      reportGenerated: true
    },
    {
      id: 2,
      company: "Gujarat Textile Industries",
      location: "Surat, Gujarat",
      violationType: "Effluent Discharge Standards Violated",
      severity: "high",
      currentLevel: 420,
      permittedLevel: 200,
      unit: "mg/L BOD",
      duration: "12 hours",
      status: "pending-review",
      reportGenerated: true
    },
    {
      id: 3,
      company: "Bangalore Chemical Co.",
      location: "Peenya Industrial Area",
      violationType: "NOx Emissions Above Threshold",
      severity: "medium",
      currentLevel: 175,
      permittedLevel: 120,
      unit: "mg/Nm³",
      duration: "6 hours",
      status: "monitoring",
      reportGenerated: false
    }
  ];

  const getSeverityColor = (severity: string) => {
    if (severity === "critical") return "bg-destructive";
    if (severity === "high") return "bg-orange-500";
    return "bg-yellow-500";
  };

  const getStatusBadge = (status: string) => {
    if (status === "auto-flagged") return { variant: "destructive" as const, text: "Auto-Flagged" };
    if (status === "pending-review") return { variant: "outline" as const, text: "Pending Review" };
    return { variant: "secondary" as const, text: "Monitoring" };
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-destructive/10 to-orange-500/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-destructive to-orange-500 flex items-center justify-center">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Automated Compliance Engine</CardTitle>
                <CardDescription>
                  Real-time industrial emissions monitoring with auto-violation detection
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-green-600">
              <CheckCircle className="w-3 h-3 mr-1" />
              Live Tracking
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 p-4 bg-white/50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive">{violations.length}</div>
              <div className="text-sm text-muted-foreground">Active Violations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">847</div>
              <div className="text-sm text-muted-foreground">Monitored Units</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">2</div>
              <div className="text-sm text-muted-foreground">Reports Generated</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div className="text-3xl font-bold text-green-600">94%</div>
              </div>
              <div className="text-sm text-muted-foreground">Compliance Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {violations.map((violation) => (
          <Card key={violation.id} className={`border-l-4 ${
            violation.severity === 'critical' ? 'border-l-destructive' :
            violation.severity === 'high' ? 'border-l-orange-500' :
            'border-l-yellow-500'
          }`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-lg">{violation.company}</h4>
                    <Badge className={getSeverityColor(violation.severity)}>
                      {violation.severity.toUpperCase()}
                    </Badge>
                    <Badge {...getStatusBadge(violation.status)}>
                      {getStatusBadge(violation.status).text}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Factory className="w-3 h-3" />
                      {violation.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {violation.duration}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">{violation.violationType}</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Current Level</div>
                    <div className="text-2xl font-bold text-destructive">
                      {violation.currentLevel} {violation.unit}
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Permitted Level</div>
                    <div className="text-2xl font-bold text-green-600">
                      {violation.permittedLevel} {violation.unit}
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Exceedance</span>
                    <span className="font-bold text-destructive">
                      +{Math.round((violation.currentLevel / violation.permittedLevel - 1) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(violation.currentLevel / violation.permittedLevel) * 100} 
                    className="h-3"
                  />
                </div>
              </div>

              {violation.reportGenerated && (
                <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <FileText className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary">
                      Non-compliance report auto-generated and sent to Pollution Control Board
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Report ID: VIO-2025-{violation.id.toString().padStart(4, '0')}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View Full Report
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Send Alert
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-destructive to-orange-500">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Initiate Enforcement Action
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Factory className="w-6 h-6 text-primary" />
              </div>
              <div className="font-medium">Real-Time Monitoring</div>
              <div className="text-sm text-muted-foreground">
                IoT sensors continuously track industrial emissions 24/7
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div className="font-medium">Auto-Detection</div>
              <div className="text-sm text-muted-foreground">
                AI instantly flags violations when limits are exceeded
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="font-medium">Report Generation</div>
              <div className="text-sm text-muted-foreground">
                Pre-populated compliance reports sent to authorities
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatedComplianceEngine;
