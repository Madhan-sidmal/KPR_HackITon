import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Play, Upload, CheckCircle, TrendingUp, AlertCircle } from "lucide-react";

const PredictiveSandbox = () => {
  const myModels = [
    {
      id: 1,
      name: "Groundwater Depletion Predictor v2.0",
      type: "Time Series Forecasting",
      status: "testing",
      accuracy: 89,
      testProgress: 67,
      dataPoints: "847K",
      lastTest: "2 hours ago"
    },
    {
      id: 2,
      name: "Water Quality Classifier v1.5",
      type: "Classification",
      status: "validated",
      accuracy: 92,
      testProgress: 100,
      dataPoints: "420K",
      lastTest: "1 day ago"
    }
  ];

  const platformDataStreams = [
    { name: "Real-time IoT Sensors", status: "connected", dataPoints: "2.4M" },
    { name: "Satellite Imagery (ISRO)", status: "connected", dataPoints: "1.8M" },
    { name: "Government Reports (CPCB)", status: "connected", dataPoints: "650K" },
    { name: "Citizen Submissions", status: "connected", dataPoints: "340K" }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-500/10 to-primary/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-primary flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Predictive Sandbox</CardTitle>
                <CardDescription>
                  Test your AI models against live platform data to validate accuracy
                </CardDescription>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-primary">
              <Upload className="w-4 h-4 mr-2" />
              Upload Model
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 p-4 bg-white/50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{myModels.length}</div>
              <div className="text-sm text-muted-foreground">Active Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">5.2M</div>
              <div className="text-sm text-muted-foreground">Data Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">1</div>
              <div className="text-sm text-muted-foreground">Validated Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">4</div>
              <div className="text-sm text-muted-foreground">Live Data Streams</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Models in Testing */}
      <div>
        <h3 className="text-xl font-bold mb-4">Models in Sandbox</h3>
        <div className="space-y-4">
          {myModels.map((model) => (
            <Card key={model.id} className="hover:shadow-water transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-lg">{model.name}</h4>
                      {model.status === "validated" && (
                        <Badge className="bg-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Validated
                        </Badge>
                      )}
                      {model.status === "testing" && (
                        <Badge variant="outline">
                          <Play className="w-3 h-3 mr-1" />
                          Testing
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{model.type}</span>
                      <span>•</span>
                      <span>{model.dataPoints} test data points</span>
                      <span>•</span>
                      <span>Last tested: {model.lastTest}</span>
                    </div>
                  </div>
                  {model.status === "testing" && (
                    <Button size="sm" className="bg-gradient-to-r from-purple-500 to-primary">
                      <Play className="w-4 h-4 mr-2" />
                      Resume Test
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Model Accuracy</span>
                      <span className="font-bold text-primary">{model.accuracy}%</span>
                    </div>
                    <Progress value={model.accuracy} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Test Progress</span>
                      <span className="font-bold">{model.testProgress}%</span>
                    </div>
                    <Progress value={model.testProgress} className={
                      model.testProgress === 100 ? "bg-green-200" : ""
                    } />
                  </div>
                </div>

                {model.status === "validated" && (
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-green-600">
                        Model validated successfully
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Ready for production deployment and Research-Grade badge
                      </div>
                    </div>
                  </div>
                )}

                {model.status === "testing" && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-sm font-medium text-primary mb-1">
                      Currently testing against live data streams
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Testing in progress • {100 - model.testProgress}% remaining
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Data Streams */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Data Streams</CardTitle>
          <CardDescription>Live platform data available for model testing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {platformDataStreams.map((stream, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    stream.status === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`} />
                  <div>
                    <div className="font-medium">{stream.name}</div>
                    <div className="text-sm text-muted-foreground">{stream.dataPoints} data points</div>
                  </div>
                </div>
                <Badge variant="outline" className="border-green-600 text-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {stream.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle>Sandbox Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div className="font-medium">Real-Time Testing</div>
              <div className="text-sm text-muted-foreground">
                Test against live platform data streams
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="font-medium">Validation Reports</div>
              <div className="text-sm text-muted-foreground">
                Automated accuracy metrics and benchmarks
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-purple-500" />
              </div>
              <div className="font-medium">Research-Grade Badge</div>
              <div className="text-sm text-muted-foreground">
                Earn credibility for validated models
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveSandbox;