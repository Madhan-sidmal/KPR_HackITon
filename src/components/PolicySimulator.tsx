import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, TrendingUp, Users, DollarSign, Leaf, Factory, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const PolicySimulator = () => {
  const [simulating, setSimulating] = useState(false);

  const runSimulation = () => {
    setSimulating(true);
    setTimeout(() => setSimulating(false), 3000);
  };

  const examplePolicies = [
    {
      title: "Ban Single-Use Plastics in Coastal Cities",
      status: "simulated",
      environmentalImpact: 78,
      economicImpact: -12,
      socialImpact: 65,
      affectedPeople: "2.4M",
      cost: "₹45 Cr",
      timeline: "18 months"
    },
    {
      title: "Mandatory Rainwater Harvesting for Buildings",
      status: "simulated",
      environmentalImpact: 85,
      economicImpact: 32,
      socialImpact: 72,
      affectedPeople: "8.2M",
      cost: "₹120 Cr",
      timeline: "24 months"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-accent/10 to-primary/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">AI Policy Simulator</CardTitle>
              <CardDescription>
                Model environmental and socio-economic impact before implementing policies
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="simulate" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="simulate">New Simulation</TabsTrigger>
          <TabsTrigger value="history">Past Simulations</TabsTrigger>
        </TabsList>

        <TabsContent value="simulate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configure Policy Simulation</CardTitle>
              <CardDescription>Enter policy details to generate AI predictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Policy Title</label>
                <Input placeholder="e.g., Ban on Diesel Vehicles in City Center" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Policy Description</label>
                <Textarea 
                  placeholder="Describe the policy details, scope, and implementation plan..."
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Region</label>
                  <Input placeholder="State/District" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Timeline (months)</label>
                  <Input type="number" placeholder="12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Budget (₹ Crores)</label>
                  <Input type="number" placeholder="100" />
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-accent to-primary"
                onClick={runSimulation}
                disabled={simulating}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {simulating ? "Running AI Simulation..." : "Run Policy Simulation"}
              </Button>

              {simulating && (
                <div className="p-4 bg-primary/5 rounded-lg animate-pulse">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary animate-spin" />
                    <span className="text-sm font-medium">AI analyzing policy impact...</span>
                  </div>
                  <Progress value={66} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                AI Impact Prediction Framework
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-white/50 rounded-lg">
                  <Leaf className="w-6 h-6 text-green-600 mb-2" />
                  <div className="text-sm font-medium">Environmental</div>
                  <div className="text-xs text-muted-foreground">Air, water, green cover impact</div>
                </div>
                <div className="p-3 bg-white/50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600 mb-2" />
                  <div className="text-sm font-medium">Economic</div>
                  <div className="text-xs text-muted-foreground">Cost, jobs, GDP effect</div>
                </div>
                <div className="p-3 bg-white/50 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600 mb-2" />
                  <div className="text-sm font-medium">Social</div>
                  <div className="text-xs text-muted-foreground">Public health, equity</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {examplePolicies.map((policy, index) => (
            <Card key={index} className="hover:shadow-water transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{policy.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-green-600">Simulation Complete</Badge>
                      <span className="text-sm text-muted-foreground">
                        Affects {policy.affectedPeople} people • {policy.cost} budget
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Environmental</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={policy.environmentalImpact} className="h-2 flex-1" />
                      <span className="text-sm font-bold text-green-600">+{policy.environmentalImpact}%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Economic</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.abs(policy.economicImpact)} className="h-2 flex-1" />
                      <span className={`text-sm font-bold ${policy.economicImpact > 0 ? 'text-green-600' : 'text-orange-600'}`}>
                        {policy.economicImpact > 0 ? '+' : ''}{policy.economicImpact}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">Social</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={policy.socialImpact} className="h-2 flex-1" />
                      <span className="text-sm font-bold text-purple-600">+{policy.socialImpact}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Full Report</Button>
                  <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                    Export to Ministry
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PolicySimulator;
