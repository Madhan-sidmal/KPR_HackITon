import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink, Calendar, DollarSign, Award, TrendingUp, Filter, Star } from "lucide-react";

const GrantFinder = () => {
  const grants = [
    {
      id: 1,
      title: "National Water Research Initiative 2025",
      organization: "Ministry of Jal Shakti",
      amount: "₹50L - ₹2Cr",
      deadline: "Mar 15, 2025",
      matchScore: 96,
      category: "Water Research",
      eligibility: "PhD researchers, Academic institutions",
      focus: ["Groundwater modeling", "AI/ML applications", "Water quality prediction"],
      status: "Open"
    },
    {
      id: 2,
      title: "Indo-German Environmental Research Program",
      organization: "DST & BMBF",
      amount: "€50,000 - €200,000",
      deadline: "Apr 30, 2025",
      matchScore: 92,
      category: "Environmental Science",
      eligibility: "International collaboration required",
      focus: ["Climate change", "Water-energy nexus", "Sustainable development"],
      status: "Open"
    },
    {
      id: 3,
      title: "SERB Early Career Research Award",
      organization: "SERB",
      amount: "₹25L - ₹40L",
      deadline: "Feb 28, 2025",
      matchScore: 88,
      category: "Early Career",
      eligibility: "Researchers < 40 years, PhD completed",
      focus: ["Environmental engineering", "Data science", "Remote sensing"],
      status: "Closing Soon"
    },
    {
      id: 4,
      title: "ISRO Bhuvan Research Fellowship",
      organization: "ISRO",
      amount: "₹35L",
      deadline: "May 20, 2025",
      matchScore: 85,
      category: "Remote Sensing",
      eligibility: "Postdoc researchers",
      focus: ["Satellite imagery analysis", "LULC mapping", "Water body monitoring"],
      status: "Open"
    },
  ];

  const savedGrants = [
    { title: "Bill & Melinda Gates Foundation - Water Innovation", deadline: "Jun 15, 2025" },
    { title: "National Geographic Society Grant", deadline: "Rolling" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "default";
      case "Closing Soon": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            AI-Powered Grant Finder
          </CardTitle>
          <CardDescription>
            Personalized grant recommendations based on your research profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search grants by keyword, organization, or focus area..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Match Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5 text-yellow-500" />
              <div className="text-2xl font-bold">24</div>
            </div>
            <div className="text-sm text-muted-foreground">High Match Grants</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="text-2xl font-bold">8</div>
            </div>
            <div className="text-sm text-muted-foreground">Closing This Month</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-5 h-5 text-secondary" />
              <div className="text-2xl font-bold">₹12Cr</div>
            </div>
            <div className="text-sm text-muted-foreground">Potential Funding</div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Grants */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>
            AI-matched grants based on your research interests and publications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {grants.map((grant) => (
              <div
                key={grant.id}
                className="p-6 border rounded-lg space-y-4 hover:shadow-soft transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{grant.title}</h3>
                      <Badge variant={getStatusColor(grant.status)}>{grant.status}</Badge>
                      {grant.matchScore >= 90 && (
                        <Badge className="bg-green-600">
                          <Star className="w-3 h-3 mr-1" />
                          Top Match
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{grant.organization}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{grant.matchScore}%</div>
                    <div className="text-xs text-muted-foreground">Match Score</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Funding Range</div>
                    <div className="font-semibold flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-secondary" />
                      {grant.amount}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Deadline</div>
                    <div className="font-semibold flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      {grant.deadline}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">Research Focus Areas</div>
                  <div className="flex flex-wrap gap-2">
                    {grant.focus.map((focus, index) => (
                      <Badge key={index} variant="outline">
                        {focus}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground mb-1">Eligibility</div>
                  <div className="text-sm">{grant.eligibility}</div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Save for Later
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details & Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Saved Grants */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Grants ({savedGrants.length})</CardTitle>
          <CardDescription>Grants you've bookmarked for later</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {savedGrants.map((grant, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{grant.title}</div>
                  <div className="text-sm text-muted-foreground">Deadline: {grant.deadline}</div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <div className="font-semibold mb-2">Grant Application Tips</div>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  • Your water quality prediction model aligns perfectly with SERB's research priorities
                </p>
                <p>
                  • Consider partnering with a German institution for the Indo-German program (96% match!)
                </p>
                <p>
                  • 3 grants closing within 30 days - prioritize National Water Research Initiative
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrantFinder;