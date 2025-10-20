import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, TrendingUp, Award, CheckCircle, Star, Target, BarChart3 } from "lucide-react";

const SmartImpactScoring = () => {
  const projectScores = [
    {
      name: "Bellandur Lake Restoration",
      overallScore: 94,
      breakdown: {
        waterQualityImprovement: 92,
        biodiversityRecovery: 88,
        communityEngagement: 96,
        costEfficiency: 91,
        sustainability: 95,
      },
      rating: "Exceptional",
      verified: true,
      fundingEligibility: "Performance-Based Premium",
    },
    {
      name: "Community Pond Revival",
      overallScore: 78,
      breakdown: {
        waterQualityImprovement: 82,
        biodiversityRecovery: 71,
        communityEngagement: 85,
        costEfficiency: 76,
        sustainability: 75,
      },
      rating: "Good",
      verified: true,
      fundingEligibility: "Standard Funding",
    },
  ];

  const scoringCriteria = [
    {
      name: "Water Quality Improvement",
      weight: 30,
      description: "Measured via lab tests and satellite data",
      icon: "💧"
    },
    {
      name: "Biodiversity Recovery",
      weight: 20,
      description: "Flora and fauna species count increase",
      icon: "🌱"
    },
    {
      name: "Community Engagement",
      weight: 20,
      description: "Volunteer participation and local ownership",
      icon: "👥"
    },
    {
      name: "Cost Efficiency",
      weight: 15,
      description: "Impact achieved per rupee spent",
      icon: "💰"
    },
    {
      name: "Long-term Sustainability",
      weight: 15,
      description: "Maintenance plan and local capacity building",
      icon: "♻️"
    },
  ];

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "Exceptional": return "text-green-600";
      case "Good": return "text-primary";
      case "Average": return "text-orange-600";
      default: return "text-muted-foreground";
    }
  };

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case "Exceptional": return <Badge className="bg-green-600"><Star className="w-3 h-3 mr-1" />Exceptional</Badge>;
      case "Good": return <Badge className="bg-primary">Good</Badge>;
      case "Average": return <Badge className="bg-orange-600">Average</Badge>;
      default: return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                Smart Impact Scoring System
              </CardTitle>
              <CardDescription className="text-base">
                AI-powered verification for performance-based funding eligibility
              </CardDescription>
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Target className="w-4 h-4 mr-2" />
              Request Score
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Scoring Methodology */}
      <Card>
        <CardHeader>
          <CardTitle>How Impact Scoring Works</CardTitle>
          <CardDescription>
            Multi-factor analysis using satellite data, lab reports, and community metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scoringCriteria.map((criteria, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="text-3xl">{criteria.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{criteria.name}</h4>
                    <Badge variant="outline">{criteria.weight}% weight</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{criteria.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Your Project Scores</CardTitle>
          <CardDescription>Data-backed effectiveness scores for funding applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {projectScores.map((project, index) => (
              <div key={index} className="p-6 border rounded-lg space-y-4 bg-card">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      {project.verified && (
                        <Badge className="bg-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {getRatingBadge(project.rating)}
                      <Badge variant="outline">{project.fundingEligibility}</Badge>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-1">
                      {project.overallScore}
                    </div>
                    <div className="text-xs text-muted-foreground">Overall Score</div>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="font-medium text-sm mb-3">Score Breakdown</div>
                  {Object.entries(project.breakdown).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className={`font-semibold ${value >= 90 ? 'text-green-600' : value >= 75 ? 'text-primary' : 'text-orange-600'}`}>
                          {value}/100
                        </span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </div>

                {/* Impact Highlights */}
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm mb-1">Funding Recommendation</div>
                      <div className="text-sm text-muted-foreground">
                        {project.overallScore >= 90 ? (
                          <>
                            Eligible for <strong>150% performance bonus</strong> on next funding round. 
                            Exceptional results qualify for national recognition and premium grants.
                          </>
                        ) : (
                          <>
                            Meets all standard funding criteria. Consider focusing on biodiversity 
                            recovery metrics to qualify for premium performance-based funding.
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Detailed Report
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">
                    Share with Donors
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card className="border-secondary/20 bg-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            Benefits of High Impact Scores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                Performance Bonuses
              </h4>
              <p className="text-sm text-muted-foreground">
                Scores above 90 qualify for 150% funding multipliers on future projects
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                National Recognition
              </h4>
              <p className="text-sm text-muted-foreground">
                Top performers featured in government reports and media
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Donor Trust
              </h4>
              <p className="text-sm text-muted-foreground">
                Verified scores build credibility and attract more funding
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-secondary" />
                Priority Access
              </h4>
              <p className="text-sm text-muted-foreground">
                Fast-track approvals for new projects and partnerships
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartImpactScoring;