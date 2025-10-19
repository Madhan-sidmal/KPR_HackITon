import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, AlertTriangle, MapPin, Sparkles } from "lucide-react";

const MinisterialBriefing = () => {
  const briefings = [
    {
      id: 1,
      title: "Daily Environmental Summary",
      date: "Today, 6:00 AM",
      status: "new",
      sections: [
        { name: "National AQI Status", priority: "medium", summary: "Average AQI: 142 (Moderate) • 8 cities in 'Poor' category" },
        { name: "Water Quality Alerts", priority: "high", summary: "3 rivers showing increased pollution levels in Maharashtra" },
        { name: "NGO Activities", priority: "low", summary: "45 new restoration projects initiated this week" },
        { name: "Citizen Engagement", priority: "low", summary: "↑ 24% increase in pollution reports compared to last week" }
      ]
    },
    {
      id: 2,
      title: "Weekly Environmental Impact Report",
      date: "Monday, 8:00 AM",
      status: "scheduled",
      sections: [
        { name: "Policy Implementation Progress", priority: "high", summary: "New emission standards: 76% compliance across industries" },
        { name: "Restoration Milestones", priority: "medium", summary: "142 waterbodies restored this month" },
        { name: "Budget Utilization", priority: "medium", summary: "₹847 Cr disbursed • 12 states above 80% utilization" },
        { name: "Emerging Hotspots", priority: "high", summary: "Western Maharashtra requires immediate intervention" }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "destructive";
    if (priority === "medium") return "default";
    return "secondary";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Ministerial Briefing Generator</CardTitle>
                <CardDescription>
                  AI-compiled daily and weekly environmental summaries for decision makers
                </CardDescription>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 p-4 bg-white/50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">2</div>
              <div className="text-sm text-muted-foreground">Ready Briefings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">127</div>
              <div className="text-sm text-muted-foreground">Data Sources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">8</div>
              <div className="text-sm text-muted-foreground">Key Insights</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">3 min</div>
              <div className="text-sm text-muted-foreground">Avg. Read Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {briefings.map((briefing) => (
          <Card key={briefing.id} className="hover:shadow-water transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-lg">{briefing.title}</h4>
                    {briefing.status === "new" && (
                      <Badge className="bg-green-600">New</Badge>
                    )}
                    {briefing.status === "scheduled" && (
                      <Badge variant="outline">Scheduled</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{briefing.date}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {briefing.sections.map((section, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className={`w-1 h-full rounded ${
                    section.priority === 'high' ? 'bg-destructive' :
                    section.priority === 'medium' ? 'bg-orange-500' :
                    'bg-primary'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium">{section.name}</h5>
                      <Badge variant={getPriorityColor(section.priority)} className="text-xs">
                        {section.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{section.summary}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle>Auto-Generation Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="font-medium">AI-Powered Insights</div>
              <div className="text-sm text-muted-foreground">
                Automatically extracts key trends and patterns
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div className="font-medium">Trend Analysis</div>
              <div className="text-sm text-muted-foreground">
                Compares data week-over-week and month-over-month
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div className="font-medium">Priority Flagging</div>
              <div className="text-sm text-muted-foreground">
                Highlights critical issues requiring immediate action
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MinisterialBriefing;