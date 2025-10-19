import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, CheckCircle, Building2, MapPin, TrendingUp, Plus, Search } from "lucide-react";

const CoalitionBuilder = () => {
  const myCoalitions = [
    {
      id: 1,
      name: "Bangalore Water Alliance",
      members: 5,
      totalFunds: "₹2.4 Cr",
      activeProjects: 3,
      verified: true,
      focus: "Lake Restoration"
    }
  ];

  const suggestedPartners = [
    {
      id: 1,
      name: "Clean Water Initiative",
      location: "Bangalore",
      expertise: "Lake Cleanup",
      members: 45,
      projectsCompleted: 12,
      compatibility: 94
    },
    {
      id: 2,
      name: "Green Earth Foundation",
      location: "Bangalore",
      expertise: "Water Testing",
      members: 32,
      projectsCompleted: 8,
      compatibility: 87
    },
    {
      id: 3,
      name: "Community Water Guards",
      location: "Mysore",
      expertise: "Community Mobilization",
      members: 28,
      projectsCompleted: 15,
      compatibility: 82
    }
  ];

  const availableGrants = [
    {
      id: 1,
      name: "National Water Restoration Fund 2025",
      amount: "₹5-50 Cr",
      deadline: "March 31, 2025",
      requirements: "Minimum 3 partner NGOs",
      status: "Coalition Eligible"
    },
    {
      id: 2,
      name: "Clean Cities Initiative Grant",
      amount: "₹10-100 Cr",
      deadline: "June 30, 2025",
      requirements: "Multi-state coalition",
      status: "Large Coalition Required"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-secondary/10 to-primary/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Coalition Builder</CardTitle>
                <CardDescription>
                  Partner with verified NGOs to access larger grants and scale impact
                </CardDescription>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-secondary to-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Coalition
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 p-4 bg-white/50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{myCoalitions.length}</div>
              <div className="text-sm text-muted-foreground">Active Coalitions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">5</div>
              <div className="text-sm text-muted-foreground">Partner NGOs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">₹2.4 Cr</div>
              <div className="text-sm text-muted-foreground">Coalition Funding</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">3</div>
              <div className="text-sm text-muted-foreground">Joint Projects</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Coalitions */}
      <div>
        <h3 className="text-xl font-bold mb-4">My Coalitions</h3>
        <div className="space-y-4">
          {myCoalitions.map((coalition) => (
            <Card key={coalition.id} className="hover:shadow-water transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-lg">{coalition.name}</h4>
                      {coalition.verified && (
                        <Badge className="bg-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {coalition.members} partner NGOs
                      </span>
                      <span>•</span>
                      <span>{coalition.focus}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Total Funding</div>
                    <div className="text-xl font-bold text-primary">{coalition.totalFunds}</div>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Active Projects</div>
                    <div className="text-xl font-bold text-secondary">{coalition.activeProjects}</div>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Status</div>
                    <div className="text-sm font-bold text-green-600">Fully Operational</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Partners */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Suggested Partners</h3>
          <div className="flex gap-2">
            <Input placeholder="Search NGOs..." className="w-64" />
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {suggestedPartners.map((partner) => (
            <Card key={partner.id} className="hover:shadow-soft transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold">{partner.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {partner.location}
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-green-600">{partner.compatibility}% Match</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expertise</span>
                  <span className="font-medium">{partner.expertise}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Team Size</span>
                  <span className="font-medium">{partner.members} members</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Projects Completed</span>
                  <span className="font-medium text-green-600">{partner.projectsCompleted}</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-secondary to-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Send Partnership Request
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Grants */}
      <div>
        <h3 className="text-xl font-bold mb-4">Coalition-Eligible Grants</h3>
        <div className="space-y-4">
          {availableGrants.map((grant) => (
            <Card key={grant.id} className="hover:shadow-water transition-all border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-lg">{grant.name}</h4>
                      <Badge variant="outline" className="border-green-600 text-green-600">
                        {grant.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Amount: {grant.amount}</span>
                      <span>•</span>
                      <span>Deadline: {grant.deadline}</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-green-500 to-primary">
                    Apply as Coalition
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Requirements</div>
                    <div className="text-sm text-muted-foreground">{grant.requirements}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle>Coalition Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="font-medium">Access Larger Grants</div>
              <div className="text-sm text-muted-foreground">
                Unlock funding opportunities reserved for coalitions
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div className="font-medium">Shared Resources</div>
              <div className="text-sm text-muted-foreground">
                Pool expertise, equipment, and volunteers
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="font-medium">Higher Success Rates</div>
              <div className="text-sm text-muted-foreground">
                Collaborative projects show 40% better outcomes
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoalitionBuilder;