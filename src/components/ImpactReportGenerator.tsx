import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, Image, TrendingUp, Award, Share2, CheckCircle } from "lucide-react";

const ImpactReportGenerator = () => {
  const completedProjects = [
    {
      id: 1,
      name: "Bellandur Lake Restoration",
      location: "Bangalore, Karnataka",
      completionDate: "Dec 2024",
      metrics: {
        areaRestored: "42 acres",
        waterQualityImprovement: "78%",
        biodiversityIncrease: "120+ species",
        volunteersEngaged: 450,
        fundsUtilized: "₹48.5L"
      },
      impactScore: 94,
      hasBeforeAfter: true,
      reportGenerated: true
    },
    {
      id: 2,
      name: "Community Pond Revival",
      location: "Mysore, Karnataka",
      completionDate: "Nov 2024",
      metrics: {
        areaRestored: "8 acres",
        waterQualityImprovement: "85%",
        biodiversityIncrease: "45+ species",
        volunteersEngaged: 120,
        fundsUtilized: "₹18.2L"
      },
      impactScore: 88,
      hasBeforeAfter: true,
      reportGenerated: false
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-primary";
    return "text-orange-600";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-500/10 to-primary/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-primary flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Automated Impact Report Generator</CardTitle>
                <CardDescription>
                  One-click shareable reports with before/after imagery and verified metrics
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-green-600">
              <CheckCircle className="w-3 h-3 mr-1" />
              Auto-Generate
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 p-4 bg-white/50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{completedProjects.length}</div>
              <div className="text-sm text-muted-foreground">Completed Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">1</div>
              <div className="text-sm text-muted-foreground">Reports Ready</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">570</div>
              <div className="text-sm text-muted-foreground">Total Volunteers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">₹66.7L</div>
              <div className="text-sm text-muted-foreground">Funds Utilized</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {completedProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-water transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-lg">{project.name}</h4>
                    {project.reportGenerated && (
                      <Badge className="bg-green-600">Report Ready</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{project.location}</span>
                    <span>•</span>
                    <span>Completed: {project.completionDate}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className={`text-3xl font-bold ${getScoreColor(project.impactScore)}`}>
                      {project.impactScore}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">Impact Score</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Area Restored</div>
                  <div className="text-xl font-bold text-primary">{project.metrics.areaRestored}</div>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Water Quality</div>
                  <div className="text-xl font-bold text-green-600">
                    +{project.metrics.waterQualityImprovement}
                  </div>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Biodiversity</div>
                  <div className="text-xl font-bold text-secondary">{project.metrics.biodiversityIncrease}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Volunteers Engaged</span>
                  </div>
                  <span className="font-semibold">{project.metrics.volunteersEngaged}</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-muted-foreground">Funds Utilized</span>
                  </div>
                  <span className="font-semibold">{project.metrics.fundsUtilized}</span>
                </div>
              </div>

              {project.hasBeforeAfter && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg flex items-center gap-2">
                  <Image className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Before/After imagery included</span>
                </div>
              )}

              <div className="flex gap-2">
                {project.reportGenerated ? (
                  <>
                    <Button className="flex-1 bg-gradient-to-r from-green-500 to-primary">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report (PDF)
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share with Donors
                    </Button>
                  </>
                ) : (
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Impact Report
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle>Report Contents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Image className="w-6 h-6 text-primary" />
              </div>
              <div className="font-medium">Visual Evidence</div>
              <div className="text-sm text-muted-foreground">
                Before/after satellite and ground imagery
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="font-medium">Verified Metrics</div>
              <div className="text-sm text-muted-foreground">
                Government-verified impact data
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="font-medium">Impact Score</div>
              <div className="text-sm text-muted-foreground">
                AI-calculated effectiveness rating
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactReportGenerator;