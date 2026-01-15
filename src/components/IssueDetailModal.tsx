import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, User, CheckCircle2, AlertCircle, Loader2, Droplet, Wind, Trash2, ArrowRight } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import ResourceImpactView from "./ResourceImpactView";

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

interface IssueDetailModalProps {
  issue: Issue | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRole?: string | null;
  onAction?: (issue: Issue) => void;
  onResolve?: (issue: Issue) => void;
}

const getStatusConfig = (status: IssueStatus) => {
  switch (status) {
    case "reported":
      return { label: "Reported", icon: AlertCircle, color: "text-orange-600" };
    case "actioned":
      return { label: "In Action", icon: Loader2, color: "text-blue-600" };
    case "resolved":
      return { label: "Resolved", icon: CheckCircle2, color: "text-green-600" };
  }
};

const getDomainConfig = (domain: IssueDomain) => {
  switch (domain) {
    case "water":
      return { icon: Droplet, label: "Water", color: "from-blue-500 to-cyan-500" };
    case "air":
      return { icon: Wind, label: "Air", color: "from-yellow-500 to-orange-500" };
    case "waste":
      return { icon: Trash2, label: "Waste", color: "from-green-500 to-emerald-500" };
  }
};

const IssueDetailModal = ({
  issue,
  open,
  onOpenChange,
  userRole,
  onAction,
  onResolve,
}: IssueDetailModalProps) => {
  if (!issue) return null;

  const statusConfig = getStatusConfig(issue.status);
  const domainConfig = getDomainConfig(issue.domain);
  const StatusIcon = statusConfig.icon;
  const DomainIcon = domainConfig.icon;

  const canAction = userRole === "action_partner" && issue.status === "reported";
  const canResolve = userRole === "authority" && issue.status === "actioned";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${domainConfig.color} flex items-center justify-center`}>
              <DomainIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <Badge variant="outline" className="capitalize mb-1">
                {domainConfig.label} Issue
              </Badge>
              <DialogTitle className="text-xl">{issue.title}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {/* Photo */}
        {issue.photo_url && (
          <div className="rounded-lg overflow-hidden">
            <img src={issue.photo_url} alt={issue.title} className="w-full h-48 object-cover" />
          </div>
        )}

        {/* Status Flow */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className={`flex items-center gap-2 ${issue.status === "reported" ? "text-orange-600 font-medium" : "text-muted-foreground"}`}>
            <AlertCircle className="w-5 h-5" />
            <div>
              <p className="text-sm font-medium">Reported</p>
              <p className="text-xs">{format(new Date(issue.created_at), "MMM d, yyyy")}</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
          <div className={`flex items-center gap-2 ${issue.status === "actioned" ? "text-blue-600 font-medium" : "text-muted-foreground"}`}>
            <Loader2 className="w-5 h-5" />
            <div>
              <p className="text-sm font-medium">Actioned</p>
              <p className="text-xs">{issue.actioned_at ? format(new Date(issue.actioned_at), "MMM d, yyyy") : "Pending"}</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
          <div className={`flex items-center gap-2 ${issue.status === "resolved" ? "text-green-600 font-medium" : "text-muted-foreground"}`}>
            <CheckCircle2 className="w-5 h-5" />
            <div>
              <p className="text-sm font-medium">Resolved</p>
              <p className="text-xs">{issue.resolved_at ? format(new Date(issue.resolved_at), "MMM d, yyyy") : "Pending"}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-medium mb-2">Description</h4>
          <p className="text-muted-foreground">{issue.description}</p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span>{issue.location_name}</span>
          {issue.latitude && issue.longitude && (
            <span className="text-muted-foreground">
              ({issue.latitude.toFixed(4)}, {issue.longitude.toFixed(4)})
            </span>
          )}
        </div>

        <Separator />

        {/* Resource Impact View - THE KEY DIFFERENTIATOR */}
        <ResourceImpactView
          drinkingWaterRisk={issue.drinking_water_risk}
          irrigationImpact={issue.irrigation_impact}
          soilHealthRisk={issue.soil_health_risk}
          cropStressLevel={issue.crop_stress_level}
          seasonalRelevance={issue.seasonal_relevance}
        />

        {/* Action Buttons */}
        {(canAction || canResolve) && (
          <div className="flex gap-3 pt-2">
            {canAction && onAction && (
              <Button className="flex-1" onClick={() => onAction(issue)}>
                Take Action on This Issue
              </Button>
            )}
            {canResolve && onResolve && (
              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => onResolve(issue)}>
                Mark as Resolved
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default IssueDetailModal;
