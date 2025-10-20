import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Award, Star, MessageSquare, ThumbsUp, Eye, MapPin } from "lucide-react";

const PeerReviewSystem = () => {
  const pendingReviews = [
    {
      id: 1,
      submitter: "Citizen Reporter",
      location: "Ulsoor Lake, Bangalore",
      type: "Water Quality Report",
      date: "2 days ago",
      dataPoints: 12,
      photos: 3,
      status: "pending",
    },
    {
      id: 2,
      submitter: "Volunteer Group",
      location: "Sankey Tank, Bangalore",
      type: "Biodiversity Survey",
      date: "5 days ago",
      dataPoints: 24,
      photos: 15,
      status: "pending",
    },
  ];

  const myReviews = [
    {
      id: 1,
      title: "Hebbal Lake Water Quality Analysis",
      submitter: "Local NGO",
      reviewedDate: "Jan 10, 2025",
      verdict: "Research-Grade",
      comments: 3,
    },
    {
      id: 2,
      title: "Bellandur Lake Pollution Report",
      submitter: "Citizen Science Team",
      reviewedDate: "Jan 8, 2025",
      verdict: "Needs Revision",
      comments: 5,
    },
  ];

  const researchGradeData = [
    {
      id: 1,
      title: "Comprehensive Water Quality Dataset - Bangalore Lakes",
      contributor: "WaterKeeper Alliance",
      verifiedBy: "Dr. Sharma, IISc",
      dataPoints: 1240,
      citations: 8,
      downloads: 345,
      date: "Dec 2024",
    },
    {
      id: 2,
      title: "Seasonal Biodiversity Study - Urban Wetlands",
      contributor: "Citizen Science Collective",
      verifiedBy: "Prof. Rao, NCBS",
      dataPoints: 856,
      citations: 3,
      downloads: 189,
      date: "Nov 2024",
    },
  ];

  const reviewerStats = {
    totalReviews: 24,
    researchGradeApprovals: 18,
    accuracyScore: 94,
    rank: 12,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Peer Review System
          </CardTitle>
          <CardDescription className="text-base">
            Verify citizen science data to earn "Research-Grade" badges for academic use
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Reviewer Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary mb-1">{reviewerStats.totalReviews}</div>
            <div className="text-sm text-muted-foreground">Reviews Completed</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {reviewerStats.researchGradeApprovals}
            </div>
            <div className="text-sm text-muted-foreground">Research-Grade</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-secondary mb-1">
              {reviewerStats.accuracyScore}%
            </div>
            <div className="text-sm text-muted-foreground">Accuracy Score</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5 text-yellow-500" />
              <div className="text-2xl font-bold">#{reviewerStats.rank}</div>
            </div>
            <div className="text-sm text-muted-foreground">Reviewer Rank</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="myreviews">My Reviews</TabsTrigger>
          <TabsTrigger value="verified">Research-Grade</TabsTrigger>
        </TabsList>

        {/* Pending Reviews Tab */}
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Data Awaiting Review</CardTitle>
              <CardDescription>
                Citizen-submitted data that needs expert verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReviews.map((submission) => (
                  <div
                    key={submission.id}
                    className="p-6 border rounded-lg space-y-4 hover:shadow-soft transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="border-orange-500 text-orange-600">
                            <Clock className="w-3 h-3 mr-1" />
                            {submission.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{submission.date}</span>
                        </div>
                        <h3 className="text-lg font-semibold">{submission.type}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {submission.location}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Submitted by: {submission.submitter}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        {submission.dataPoints} data points
                      </div>
                      <div className="flex items-center gap-1">
                        📸 {submission.photos} photos
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        View Submission
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">
                        <Award className="w-4 h-4 mr-2" />
                        Start Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Reviews Tab */}
        <TabsContent value="myreviews">
          <Card>
            <CardHeader>
              <CardTitle>Your Review History</CardTitle>
              <CardDescription>Data you've verified and certified</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 border rounded-lg flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <h4 className="font-semibold">{review.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>by {review.submitter}</span>
                        <span>•</span>
                        <span>Reviewed {review.reviewedDate}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {review.comments} comments
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={review.verdict === "Research-Grade" ? "default" : "secondary"}
                      className={
                        review.verdict === "Research-Grade" ? "bg-green-600" : ""
                      }
                    >
                      {review.verdict === "Research-Grade" && (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      )}
                      {review.verdict}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research-Grade Data Tab */}
        <TabsContent value="verified">
          <Card>
            <CardHeader>
              <CardTitle>Research-Grade Datasets</CardTitle>
              <CardDescription>
                Peer-reviewed and verified data ready for academic use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {researchGradeData.map((dataset) => (
                  <div
                    key={dataset.id}
                    className="p-6 border rounded-lg space-y-4 bg-green-500/5 border-green-500/20"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{dataset.title}</h3>
                          <Badge className="bg-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Research-Grade
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Contributor: {dataset.contributor}</p>
                          <p>Verified by: {dataset.verifiedBy}</p>
                          <p>{dataset.date}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {dataset.dataPoints.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Data Points</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary">
                          {dataset.citations}
                        </div>
                        <div className="text-xs text-muted-foreground">Citations</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{dataset.downloads}</div>
                        <div className="text-xs text-muted-foreground">Downloads</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        View Dataset
                      </Button>
                      <Button className="flex-1">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Use in Research
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Peer Review Works</CardTitle>
          <CardDescription>Ensuring data quality for scientific research</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <div className="text-primary font-bold">1</div>
              </div>
              <div className="pt-1">
                <h4 className="font-semibold mb-1">Data Submission</h4>
                <p className="text-sm text-muted-foreground">
                  Citizens and NGOs submit environmental data with photos, GPS coordinates, and measurements
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <div className="text-secondary font-bold">2</div>
              </div>
              <div className="pt-1">
                <h4 className="font-semibold mb-1">Expert Review</h4>
                <p className="text-sm text-muted-foreground">
                  Senior scientists review methodology, validate measurements, and check for accuracy
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <div className="text-accent font-bold">3</div>
              </div>
              <div className="pt-1">
                <h4 className="font-semibold mb-1">Research-Grade Badge</h4>
                <p className="text-sm text-muted-foreground">
                  Approved data receives a "Research-Grade" badge and can be used in academic studies
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PeerReviewSystem;