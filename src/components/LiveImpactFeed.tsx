import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { 
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
  Activity
} from "lucide-react";
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
  amount?: number;
  metric?: { value: number; unit: string };
}

const LiveImpactFeed = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Domain-specific styling
  const getDomainConfig = (domain: Domain) => {
    switch (domain) {
      case "water":
        return {
          icon: Droplet,
          color: "text-blue-500",
          bg: "bg-blue-500/10",
          border: "border-blue-500/30",
          gradient: "from-blue-500 to-cyan-500"
        };
      case "air":
        return {
          icon: Wind,
          color: "text-yellow-500",
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
          gradient: "from-yellow-500 to-orange-500"
        };
      case "waste":
        return {
          icon: Trash2,
          color: "text-green-500",
          bg: "bg-green-500/10",
          border: "border-green-500/30",
          gradient: "from-green-500 to-emerald-500"
        };
    }
  };

  // Type-specific icons
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

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch resolved issues
        const { data: issues } = await supabase
          .from("issues")
          .select("*")
          .eq("status", "resolved")
          .order("resolved_at", { ascending: false })
          .limit(10);

        // Fetch donations
        const { data: donations } = await supabase
          .from("donations")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);

        // Fetch milestones
        const { data: milestones } = await supabase
          .from("milestones")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);

        const items: FeedItem[] = [];

        // Map issues to feed items
        issues?.forEach((issue) => {
          items.push({
            id: `issue-${issue.id}`,
            type: "resolution",
            title: issue.title,
            description: `Environmental issue resolved`,
            domain: issue.domain as Domain,
            location: issue.location_name,
            timestamp: new Date(issue.resolved_at || issue.updated_at),
          });
        });

        // Map donations to feed items
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
            amount: donation.amount,
          });
        });

        // Map milestones to feed items
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
            metric: milestone.metric_value ? { 
              value: milestone.metric_value, 
              unit: milestone.metric_unit || "" 
            } : undefined,
          });
        });

        // Sort by timestamp
        items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        setFeedItems(items.slice(0, 15));
      } catch (error) {
        console.error("Error fetching feed data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up realtime subscriptions
    const issuesChannel = supabase
      .channel("issues-realtime")
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
            };
            setFeedItems((prev) => [newItem, ...prev.slice(0, 14)]);
          }
        }
      )
      .subscribe();

    const donationsChannel = supabase
      .channel("donations-realtime")
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
            amount: payload.new.amount,
          };
          setFeedItems((prev) => [newItem, ...prev.slice(0, 14)]);
        }
      )
      .subscribe();

    const milestonesChannel = supabase
      .channel("milestones-realtime")
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
            metric: payload.new.metric_value ? {
              value: payload.new.metric_value,
              unit: payload.new.metric_unit || "",
            } : undefined,
          };
          setFeedItems((prev) => [newItem, ...prev.slice(0, 14)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(issuesChannel);
      supabase.removeChannel(donationsChannel);
      supabase.removeChannel(milestonesChannel);
    };
  }, []);

  // Sample data for display when database is empty
  const sampleItems: FeedItem[] = [
    {
      id: "sample-1",
      type: "resolution",
      title: "Yamuna River Cleanup",
      description: "Industrial waste dumping issue resolved",
      domain: "water",
      location: "Delhi NCR",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: "sample-2",
      type: "donation",
      title: "Bellandur Lake Restoration",
      description: "Contributing to lake revival efforts",
      domain: "water",
      location: "Bangalore, Karnataka",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      contributor: "Priya M.",
      amount: 5000,
    },
    {
      id: "sample-3",
      type: "milestone",
      title: "10,000 Trees Planted",
      description: "Milestone achieved in Delhi greening initiative",
      domain: "air",
      location: "Delhi NCR",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      contributor: "Green Delhi Foundation",
      metric: { value: 10000, unit: "trees" },
    },
    {
      id: "sample-4",
      type: "resolution",
      title: "Plastic Waste Cleared",
      description: "Beach cleanup drive completed successfully",
      domain: "waste",
      location: "Marina Beach, Chennai",
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
    },
    {
      id: "sample-5",
      type: "donation",
      title: "Air Quality Monitors",
      description: "Funding 5 new AQI monitoring stations",
      domain: "air",
      location: "Gurugram, Haryana",
      timestamp: new Date(Date.now() - 1000 * 60 * 240),
      contributor: "Anonymous Supporter",
      amount: 25000,
    },
    {
      id: "sample-6",
      type: "milestone",
      title: "500 Tonnes Recycled",
      description: "Monthly recycling target achieved",
      domain: "waste",
      location: "Mumbai, Maharashtra",
      timestamp: new Date(Date.now() - 1000 * 60 * 300),
      contributor: "Clean Mumbai Initiative",
      metric: { value: 500, unit: "tonnes" },
    },
  ];

  const displayItems = feedItems.length > 0 ? feedItems : sampleItems;

  if (loading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary animate-pulse" />
            Live Impact Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="relative">
              <Activity className="w-5 h-5 text-primary" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            Live Impact Feed
          </CardTitle>
          <Badge variant="outline" className="text-xs font-normal flex items-center gap-1">
            <Users className="w-3 h-3" />
            By the People, For the Planet
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Real-time updates from across India's environmental restoration movement
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-6">
          <div className="space-y-1 pb-6">
            {displayItems.map((item, index) => {
              const domainConfig = getDomainConfig(item.domain);
              const TypeIcon = getTypeIcon(item.type);
              const DomainIcon = domainConfig.icon;

              return (
                <div
                  key={item.id}
                  className={`group relative flex gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-muted/50 animate-fade-in`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Timeline connector */}
                  {index < displayItems.length - 1 && (
                    <div className="absolute left-[26px] top-14 w-0.5 h-[calc(100%-2rem)] bg-border" />
                  )}

                  {/* Icon */}
                  <div className={`relative z-10 w-10 h-10 rounded-full ${domainConfig.bg} ${domainConfig.border} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <TypeIcon className={`w-4 h-4 ${domainConfig.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <DomainIcon className={`w-3 h-3 ${domainConfig.color}`} />
                        <Badge 
                          variant="secondary" 
                          className={`text-[10px] px-1.5 py-0 ${domainConfig.bg} ${domainConfig.color} border-0`}
                        >
                          {item.domain}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                      <span>•</span>
                      <span>{formatDistanceToNow(item.timestamp, { addSuffix: true })}</span>
                    </div>

                    {/* Extra info based on type */}
                    {item.type === "donation" && item.amount && (
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs">
                          <Heart className="w-3 h-3 mr-1" />
                          ₹{item.amount.toLocaleString()}
                        </Badge>
                        {item.contributor && (
                          <span className="text-xs text-muted-foreground">
                            by {item.contributor}
                          </span>
                        )}
                      </div>
                    )}

                    {item.type === "milestone" && item.metric && (
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {item.metric.value.toLocaleString()} {item.metric.unit}
                        </Badge>
                        {item.contributor && (
                          <span className="text-xs text-muted-foreground">
                            by {item.contributor}
                          </span>
                        )}
                      </div>
                    )}

                    {item.type === "resolution" && (
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Resolved
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Footer CTA */}
        <div className="px-6 py-4 border-t bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                Join <strong className="text-foreground">{(45230).toLocaleString()}</strong> eco-warriors making impact
              </span>
            </div>
            <Badge variant="outline" className="animate-pulse">
              Live
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveImpactFeed;
