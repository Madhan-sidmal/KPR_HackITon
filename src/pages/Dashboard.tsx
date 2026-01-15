import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnvironmentToggle, { EnvironmentView } from "@/components/EnvironmentToggle";
import IssueCard from "@/components/IssueCard";
import IssueDetailModal from "@/components/IssueDetailModal";
import ReportIssueForm from "@/components/ReportIssueForm";
import ResourceImpactView from "@/components/ResourceImpactView";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, AlertCircle, CheckCircle2, Loader2, Plus, Filter, 
  TrendingUp, Users, Droplet, Wind, Trash2, Leaf, BarChart3
} from "lucide-react";
import { useEnvironment } from "@/contexts/EnvironmentContext";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type IssueStatus = "reported" | "actioned" | "resolved";
type IssueDomain = "air" | "water" | "waste";

interface Issue {
  id: string;
  title: string;
  description: string;
  domain: IssueDomain;
  status: IssueStatus;
  location_name: string;
  latitude?: number;
  longitude?: number;
  photo_url?: string;
  created_at: string;
  actioned_at?: string;
  resolved_at?: string;
  drinking_water_risk: "low" | "medium" | "high";
  irrigation_impact: "low" | "medium" | "high";
  soil_health_risk: "low" | "medium" | "high";
  crop_stress_level: "low" | "medium" | "high";
  seasonal_relevance: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { environment, setEnvironment } = useEnvironment();
  const { userRole, loading: roleLoading } = useUserRole();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<IssueStatus | "all">("all");

  const fetchIssues = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("issues")
        .select("*")
        .eq("domain", environment)
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setIssues((data as Issue[]) || []);
    } catch (error) {
      console.error("Error fetching issues:", error);
      toast.error("Failed to load issues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [environment, statusFilter]);

  const handleAction = async (issue: Issue) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please login to take action");
        return;
      }

      const { error } = await supabase
        .from("issues")
        .update({
          status: "actioned",
          actioned_by: user.id,
          actioned_at: new Date().toISOString(),
        })
        .eq("id", issue.id);

      if (error) throw error;

      toast.success("Issue marked as actioned!");
      setSelectedIssue(null);
      fetchIssues();
    } catch (error) {
      console.error("Error updating issue:", error);
      toast.error("Failed to update issue");
    }
  };

  const handleResolve = async (issue: Issue) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please login to resolve issues");
        return;
      }

      const { error } = await supabase
        .from("issues")
        .update({
          status: "resolved",
          resolved_by: user.id,
          resolved_at: new Date().toISOString(),
        })
        .eq("id", issue.id);

      if (error) throw error;

      toast.success("Issue marked as resolved!");
      setSelectedIssue(null);
      fetchIssues();
    } catch (error) {
      console.error("Error resolving issue:", error);
      toast.error("Failed to resolve issue");
    }
  };

  const stats = {
    reported: issues.filter((i) => i.status === "reported").length,
    actioned: issues.filter((i) => i.status === "actioned").length,
    resolved: issues.filter((i) => i.status === "resolved").length,
    total: issues.length,
  };

  const getRoleLabel = (role: string | null) => {
    switch (role) {
      case "public_user":
        return "Public User";
      case "action_partner":
        return "Action Partner";
      case "authority":
        return "Authority";
      default:
        return "Guest";
    }
  };

  const getRoleDescription = (role: string | null) => {
    switch (role) {
      case "public_user":
        return "Report issues, explore data, and join community actions";
      case "action_partner":
        return "Validate and take action on reported issues";
      case "authority":
        return "Acknowledge, respond, and mark issues as resolved";
      default:
        return "View environmental data and explore the platform";
    }
  };

  const getDomainIcon = () => {
    switch (environment) {
      case "water":
        return <Droplet className="w-6 h-6" />;
      case "air":
        return <Wind className="w-6 h-6" />;
      case "waste":
        return <Trash2 className="w-6 h-6" />;
    }
  };

  const getDomainColor = () => {
    switch (environment) {
      case "water":
        return "from-blue-500 to-cyan-500";
      case "air":
        return "from-yellow-500 to-orange-500";
      case "waste":
        return "from-green-500 to-emerald-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getDomainColor()} flex items-center justify-center text-white`}>
                {getDomainIcon()}
              </div>
              <div>
                <h1 className="text-3xl font-bold capitalize">{environment} Dashboard</h1>
                <p className="text-muted-foreground">
                  Protecting environmental resources • {getRoleLabel(userRole)}
                </p>
              </div>
            </div>
          </div>
          <EnvironmentToggle view={environment} onViewChange={setEnvironment} />
        </div>

        {/* Role-based Info Banner */}
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{getRoleLabel(userRole)}</p>
                  <p className="text-sm text-muted-foreground">{getRoleDescription(userRole)}</p>
                </div>
              </div>
              {(userRole === "public_user" || userRole) && (
                <Button onClick={() => setShowReportForm(!showReportForm)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Report Issue
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => setStatusFilter("all")}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Issues</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-all border-orange-200" onClick={() => setStatusFilter("reported")}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-600">{stats.reported}</p>
                  <p className="text-sm text-muted-foreground">Reported</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-all border-blue-200" onClick={() => setStatusFilter("actioned")}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{stats.actioned}</p>
                  <p className="text-sm text-muted-foreground">In Action</p>
                </div>
                <Loader2 className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-all border-green-200" onClick={() => setStatusFilter("resolved")}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Form */}
        {showReportForm && (
          <div className="mb-8">
            <ReportIssueForm
              domain={environment}
              onSuccess={() => {
                setShowReportForm(false);
                fetchIssues();
              }}
            />
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter:</span>
          {["all", "reported", "actioned", "resolved"].map((status) => (
            <Badge
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => setStatusFilter(status as IssueStatus | "all")}
            >
              {status}
            </Badge>
          ))}
        </div>

        {/* Issues Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : issues.length === 0 ? (
          <Card className="py-12">
            <CardContent className="text-center">
              <Leaf className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No issues found</h3>
              <p className="text-muted-foreground mb-4">
                {statusFilter === "all"
                  ? `No ${environment} issues have been reported yet.`
                  : `No ${statusFilter} ${environment} issues found.`}
              </p>
              {userRole && (
                <Button onClick={() => setShowReportForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Report First Issue
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                userRole={userRole}
                onViewDetails={setSelectedIssue}
                onAction={handleAction}
                onResolve={handleResolve}
              />
            ))}
          </div>
        )}

        {/* Agriculture Impact Section */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Environmental Protection = Agricultural Security</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every environmental issue we address directly protects the agricultural systems that depend on these resources.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <Droplet className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h3 className="font-medium mb-2">Water Protection</h3>
              <p className="text-sm text-muted-foreground">
                Clean water sources ensure safe irrigation and drinking water for farming communities.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Wind className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-medium mb-2">Air Quality</h3>
              <p className="text-sm text-muted-foreground">
                Healthy air reduces crop damage and protects the health of agricultural workers.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Trash2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h3 className="font-medium mb-2">Waste Management</h3>
              <p className="text-sm text-muted-foreground">
                Proper waste disposal prevents soil contamination and protects crop yields.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <IssueDetailModal
        issue={selectedIssue}
        open={!!selectedIssue}
        onOpenChange={(open) => !open && setSelectedIssue(null)}
        userRole={userRole}
        onAction={handleAction}
        onResolve={handleResolve}
      />

      <Footer />
    </div>
  );
};

export default Dashboard;
