import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import {
  Activity,
  CheckCircle2,
  Heart,
  Trophy,
  Droplet,
  Wind,
  Trash2,
  MapPin,
  Users,
  Sparkles,
  TrendingUp,
  RefreshCw,
  MessageSquare,
  Share2,
  BarChart3,
} from "lucide-react";
import AirQualitySnapshot from "@/components/AirQualitySnapshot";
import WasteQualitySnapshot from "@/components/WasteQualitySnapshot";
import UnifiedStatsCounter from "@/components/UnifiedStatsCounter";
import { formatDistanceToNow } from "date-fns";

type FeedItemType = "resolution" | "donation" | "milestone";
type Domain = "water" | "air" | "waste";

interface FeedItem {
  id: string;
  type: FeedItemType;
  title: string;
  description: string;
  domain: Domain;
  location: string;
  timestamp: Date;
  contributor?: string;
  contributorType?: string;
  amount?: number;
  metric?: { value: number; unit: string };
  likes?: number;
  comments?: number;
  shares?: number;
}

// Indian states for filtering
const indianStates = [
  "All States",
  "Andhra Pradesh",
  "Bihar",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

const LiveImpactPage = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<string>("All States");

  // National statistics
  const stats = [
    { icon: Droplet, label: "Water Bodies Monitored", value: 8466, color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: Wind, label: "Average National AQI", value: 129, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { icon: Users, label: "Active Volunteers", value: 46093, color: "text-green-500", bg: "bg-green-500/10" },
    { icon: TrendingUp, label: "Restoration Projects", value: 1223, color: "text-orange-500", bg: "bg-orange-500/10" },
    { icon: Sparkles, label: "EcoPoints Earned", value: 2847500, color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: BarChart3, label: "Data Points Collected", value: 9824567, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  ];

  // Domain-specific styling
  const getDomainConfig = (domain: Domain) => {
    switch (domain) {
      case "water":
        return {
          icon: Droplet,
          color: "text-blue-500",
          bg: "bg-blue-500/10",
          border: "border-blue-500/30",
        };
      case "air":
        return {
          icon: Wind,
          color: "text-yellow-500",
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
        };
      case "waste":
        return {
          icon: Trash2,
          color: "text-green-500",
          bg: "bg-green-500/10",
          border: "border-green-500/30",
        };
    }
  };

  const getTypeIcon = (type: FeedItemType) => {
    switch (type) {
      case "resolution":
        return CheckCircle2;
      case "donation":
        return Heart;
      case "milestone":
        return Trophy;
    }
  };

  const getTypeLabel = (type: FeedItemType) => {
    switch (type) {
      case "resolution":
        return "Issue Resolved";
      case "donation":
        return "Donation";
      case "milestone":
        return "Milestone";
    }
  };

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: issues } = await supabase
        .from("issues")
        .select("*")
        .eq("status", "resolved")
        .order("resolved_at", { ascending: false })
        .limit(20);

      const { data: donations } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      const { data: milestones } = await supabase
        .from("milestones")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      const items: FeedItem[] = [];

      issues?.forEach((issue) => {
        items.push({
          id: `issue-${issue.id}`,
          type: "resolution",
          title: issue.title,
          description: issue.description || "Environmental issue resolved",
          domain: issue.domain as Domain,
          location: issue.location_name,
          timestamp: new Date(issue.resolved_at || issue.updated_at),
          contributorType: "Government",
          likes: Math.floor(Math.random() * 300) + 50,
          comments: Math.floor(Math.random() * 50) + 5,
          shares: Math.floor(Math.random() * 100) + 10,
        });
      });

      donations?.forEach((donation: any) => {
        items.push({
          id: `donation-${donation.id}`,
          type: "donation",
          title: donation.project_name,
          description: donation.message || "Supporting environmental restoration",
          domain: donation.domain as Domain,
          location: donation.location_name,
          timestamp: new Date(donation.created_at),
          contributor: donation.is_anonymous ? "Anonymous Supporter" : donation.donor_name,
          contributorType: "Citizen",
          amount: donation.amount,
          likes: Math.floor(Math.random() * 200) + 30,
          comments: Math.floor(Math.random() * 30) + 3,
          shares: Math.floor(Math.random() * 50) + 5,
        });
      });

      milestones?.forEach((milestone: any) => {
        items.push({
          id: `milestone-${milestone.id}`,
          type: "milestone",
          title: milestone.title,
          description: milestone.description,
          domain: milestone.domain as Domain,
          location: milestone.location_name,
          timestamp: new Date(milestone.created_at),
          contributor: milestone.achieved_by_name,
          contributorType: milestone.achieved_by_type || "NGO",
          metric: milestone.metric_value
            ? { value: milestone.metric_value, unit: milestone.metric_unit || "" }
            : undefined,
          likes: Math.floor(Math.random() * 400) + 100,
          comments: Math.floor(Math.random() * 60) + 10,
          shares: Math.floor(Math.random() * 120) + 20,
        });
      });

      items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      setFeedItems(items.slice(0, 30));
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching feed data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up realtime subscriptions
    const issuesChannel = supabase
      .channel("live-impact-issues")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "issues" },
        (payload) => {
          if (payload.new.status === "resolved") {
            const newItem: FeedItem = {
              id: `issue-${payload.new.id}`,
              type: "resolution",
              title: payload.new.title,
              description: "Environmental issue resolved",
              domain: payload.new.domain as Domain,
              location: payload.new.location_name,
              timestamp: new Date(),
              contributorType: "Government",
              likes: 0,
              comments: 0,
              shares: 0,
            };
            setFeedItems((prev) => [newItem, ...prev.slice(0, 29)]);
            setLastUpdated(new Date());
          }
        }
      )
      .subscribe();

    const donationsChannel = supabase
      .channel("live-impact-donations")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "donations" },
        (payload: any) => {
          const newItem: FeedItem = {
            id: `donation-${payload.new.id}`,
            type: "donation",
            title: payload.new.project_name,
            description: payload.new.message || "Supporting environmental restoration",
            domain: payload.new.domain as Domain,
            location: payload.new.location_name,
            timestamp: new Date(),
            contributor: payload.new.is_anonymous ? "Anonymous Supporter" : payload.new.donor_name,
            contributorType: "Citizen",
            amount: payload.new.amount,
            likes: 0,
            comments: 0,
            shares: 0,
          };
          setFeedItems((prev) => [newItem, ...prev.slice(0, 29)]);
          setLastUpdated(new Date());
        }
      )
      .subscribe();

    const milestonesChannel = supabase
      .channel("live-impact-milestones")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "milestones" },
        (payload: any) => {
          const newItem: FeedItem = {
            id: `milestone-${payload.new.id}`,
            type: "milestone",
            title: payload.new.title,
            description: payload.new.description,
            domain: payload.new.domain as Domain,
            location: payload.new.location_name,
            timestamp: new Date(),
            contributor: payload.new.achieved_by_name,
            contributorType: payload.new.achieved_by_type || "NGO",
            metric: payload.new.metric_value
              ? { value: payload.new.metric_value, unit: payload.new.metric_unit || "" }
              : undefined,
            likes: 0,
            comments: 0,
            shares: 0,
          };
          setFeedItems((prev) => [newItem, ...prev.slice(0, 29)]);
          setLastUpdated(new Date());
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(issuesChannel);
      supabase.removeChannel(donationsChannel);
      supabase.removeChannel(milestonesChannel);
    };
  }, []);

  // Sample data when database is empty
  const sampleItems: FeedItem[] = [
    {
      id: "sample-1",
      type: "resolution",
      title: "River Bank Stabilization Complete",
      description: "3 km of riverbank stabilized preventing erosion and protecting nearby villages.",
      domain: "water",
      location: "Mumbai, Maharashtra",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9),
      contributor: "Maharashtra Pollution Control",
      contributorType: "Government",
      metric: { value: 3, unit: "km bank stabilized" },
      likes: 214,
      comments: 36,
      shares: 81,
    },
    {
      id: "sample-2",
      type: "resolution",
      title: "Water Quality Improvement Achieved",
      description: "45% improvement in water quality metrics across the project area.",
      domain: "water",
      location: "Delhi",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      contributor: "Gujarat Environment Dept",
      contributorType: "Government",
      metric: { value: 45, unit: "% water quality improvement" },
      likes: 189,
      comments: 28,
      shares: 67,
    },
    {
      id: "sample-3",
      type: "milestone",
      title: "50,000 Trees Planted",
      description: "Major afforestation milestone achieved under Green Delhi Initiative.",
      domain: "air",
      location: "Delhi NCR",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      contributor: "Green Delhi Foundation",
      contributorType: "NGO",
      metric: { value: 50000, unit: "trees planted" },
      likes: 456,
      comments: 89,
      shares: 234,
    },
    {
      id: "sample-4",
      type: "donation",
      title: "Lake Restoration Fund",
      description: "Contributing to Bellandur Lake revival efforts in Bangalore.",
      domain: "water",
      location: "Bangalore, Karnataka",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      contributor: "Priya Sharma",
      contributorType: "Citizen",
      amount: 15000,
      likes: 78,
      comments: 12,
      shares: 23,
    },
    {
      id: "sample-5",
      type: "resolution",
      title: "Illegal Dumping Site Cleared",
      description: "Successfully cleared 5-acre illegal waste dumping site near residential area.",
      domain: "waste",
      location: "Hyderabad, Telangana",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      contributor: "GHMC Waste Management",
      contributorType: "Government",
      likes: 312,
      comments: 45,
      shares: 98,
    },
    {
      id: "sample-6",
      type: "milestone",
      title: "1000 Tonnes Plastic Recycled",
      description: "Monthly recycling target exceeded across Mumbai collection centers.",
      domain: "waste",
      location: "Mumbai, Maharashtra",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      contributor: "Clean Mumbai Initiative",
      contributorType: "NGO",
      metric: { value: 1000, unit: "tonnes recycled" },
      likes: 267,
      comments: 34,
      shares: 112,
    },
  ];

  const displayItems = feedItems.length > 0 ? feedItems : sampleItems;

  // Apply filters
  const filteredItems = displayItems.filter((item) => {
    const matchesType = eventTypeFilter === "all" || item.type === eventTypeFilter;
    const matchesState =
      stateFilter === "All States" ||
      item.location.toLowerCase().includes(stateFilter.toLowerCase());
    return matchesType && matchesState;
  });

  const getContributorBadgeColor = (type?: string) => {
    switch (type) {
      case "Government":
        return "bg-blue-600 text-white";
      case "NGO":
        return "bg-green-600 text-white";
      case "Citizen":
        return "bg-orange-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Activity className="w-10 h-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">Live Impact Dashboard</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Real-time environmental data and impact updates across India
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live
              </span>
              <span>•</span>
              <span>Last updated {lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>
        </section>

        {/* National Dashboard Section */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <UnifiedStatsCounter />

            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AirQualitySnapshot />
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-blue-600" />
                    Water Quality Overview
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Active restoration projects nationwide</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Lakes Restored</span>
                      <span className="text-2xl font-bold text-primary">1,240</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Rivers Cleaned</span>
                      <span className="text-2xl font-bold text-secondary">85</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">NGOs Active</span>
                      <span className="text-2xl font-bold text-accent">285</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-green-600" />
                    Waste Management Status
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Nationwide recycling and cleanup metrics</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Recycling Rate</span>
                      <span className="text-2xl font-bold text-green-600">43.6%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Collection Coverage</span>
                      <span className="text-2xl font-bold text-primary">82%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Cleanup Drives</span>
                      <span className="text-2xl font-bold text-secondary">342</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <WasteQualitySnapshot />
            </div>
          </div>
        </section>

        {/* Live Impact Feed Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left Column - National Statistics */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Activity className="w-5 h-5 text-primary" />
                        Real-time Statistics
                      </CardTitle>
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Live
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${stat.color}`} />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Live Impact Feed */}
              <div className="lg:col-span-3">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Activity className="w-5 h-5 text-primary" />
                        Live Impact Feed
                      </CardTitle>
                      <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
                        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                        Refresh
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Filter by event type and state
                    </p>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Event Type</label>
                        <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                          <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="resolution">Issue Resolved</SelectItem>
                            <SelectItem value="donation">Donations</SelectItem>
                            <SelectItem value="milestone">Milestones</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">State</label>
                        <Select value={stateFilter} onValueChange={setStateFilter}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All States" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    {loading ? (
                      <div className="p-6 space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex gap-4">
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <div className="flex-1 space-y-2">
                              <Skeleton className="h-4 w-3/4" />
                              <Skeleton className="h-3 w-1/2" />
                              <Skeleton className="h-16 w-full" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ScrollArea className="h-[600px]">
                        <div className="p-6 space-y-6">
                          {filteredItems.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                              <p>No events match your filters</p>
                            </div>
                          ) : (
                            filteredItems.map((item) => {
                              const domainConfig = getDomainConfig(item.domain);
                              const DomainIcon = domainConfig.icon;

                              return (
                                <div
                                  key={item.id}
                                  className="p-4 rounded-xl border bg-card hover:shadow-md transition-all"
                                >
                                  {/* Header */}
                                  <div className="flex items-start gap-3 mb-3">
                                    <div
                                      className={`w-10 h-10 rounded-full ${domainConfig.bg} flex items-center justify-center text-sm font-bold ${domainConfig.color}`}
                                    >
                                      {item.contributor?.charAt(0) || "J"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center flex-wrap gap-2">
                                        <span className="font-semibold truncate">
                                          {item.contributor || "JeevaDhara"}
                                        </span>
                                        <Badge className={getContributorBadgeColor(item.contributorType)}>
                                          {item.contributorType}
                                        </Badge>
                                        <Badge
                                          variant="outline"
                                          className="bg-green-500/10 text-green-600 border-green-500/30"
                                        >
                                          <CheckCircle2 className="w-3 h-3 mr-1" />
                                          {getTypeLabel(item.type)}
                                        </Badge>
                                        {item.metric && (
                                          <Badge className="bg-primary text-primary-foreground">
                                            {item.metric.value.toLocaleString()} {item.metric.unit}
                                          </Badge>
                                        )}
                                        {item.amount && (
                                          <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                                            ₹{item.amount.toLocaleString()}
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                        <span>{formatDistanceToNow(item.timestamp, { addSuffix: true })}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                          <MapPin className="w-3 h-3" />
                                          {item.location}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Content */}
                                  <div className="mb-4">
                                    <h4 className="font-semibold mb-1">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                    <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                                      <Heart className="w-4 h-4" />
                                      {item.likes || 0}
                                    </button>
                                    <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                                      <MessageSquare className="w-4 h-4" />
                                      {item.comments || 0}
                                    </button>
                                    <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                                      <Share2 className="w-4 h-4" />
                                      {item.shares || 0}
                                    </button>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </ScrollArea>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LiveImpactPage;
