import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, User, CheckCircle2, AlertCircle, Loader2, Droplet, Wind, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type IssueStatus = "reported" | "actioned" | "resolved";
type IssueDomain = "air" | "water" | "waste";

interface Issue {
  id: string;
  title: string;
  description: string;
  domain: IssueDomain;
  status: IssueStatus;
  location_name: string;
  photo_url?: string;
  created_at: string;
  drinking_water_risk: "low" | "medium" | "high";
  irrigation_impact: "low" | "medium" | "high";
  soil_health_risk: "low" | "medium" | "high";
  crop_stress_level: "low" | "medium" | "high";
  seasonal_relevance: string;
}

interface IssueCardProps {
  issue: Issue;
  userRole?: string | null;
  onViewDetails: (issue: Issue) => void;
  onAction?: (issue: Issue) => void;
  onResolve?: (issue: Issue) => void;
}

const getStatusConfig = (status: IssueStatus) => {
  switch (status) {
    case "reported":
      return {
        label: "Reported",
        icon: AlertCircle,
        color: "bg-orange-100 text-orange-800 border-orange-300",
        badgeVariant: "secondary" as const,
      };
    case "actioned":
      return {
        label: "In Action",
        icon: Loader2,
        color: "bg-blue-100 text-blue-800 border-blue-300",
        badgeVariant: "default" as const,
      };
    case "resolved":
      return {
        label: "Resolved",
        icon: CheckCircle2,
        color: "bg-green-100 text-green-800 border-green-300",
        badgeVariant: "outline" as const,
      };
  }
};

const getDomainConfig = (domain: IssueDomain) => {
  switch (domain) {
    case "water":
      return {
        icon: Droplet,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-100",
      };
    case "air":
      return {
        icon: Wind,
        color: "from-yellow-500 to-orange-500",
        bgColor: "bg-yellow-100",
      };
    case "waste":
      return {
        icon: Trash2,
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-100",
      };
  }
};

const IssueCard = ({ issue, userRole, onViewDetails, onAction, onResolve }: IssueCardProps) => {
  const statusConfig = getStatusConfig(issue.status);
  const domainConfig = getDomainConfig(issue.domain);
  const StatusIcon = statusConfig.icon;
  const DomainIcon = domainConfig.icon;

  const canAction = userRole === "action_partner" && issue.status === "reported";
  const canResolve = userRole === "authority" && issue.status === "actioned";

  return (
    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {issue.photo_url && (
        <div className="h-40 overflow-hidden">
          <img
            src={issue.photo_url}
            alt={issue.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${domainConfig.color} flex items-center justify-center`}>
              <DomainIcon className="w-4 h-4 text-white" />
            </div>
            <Badge variant={statusConfig.badgeVariant} className="gap-1">
              <StatusIcon className="w-3 h-3" />
              {statusConfig.label}
            </Badge>
          </div>
          <Badge variant="outline" className="capitalize">
            {issue.domain}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2 line-clamp-2">{issue.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{issue.description}</p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {issue.location_name}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}
          </span>
        </div>

        {/* Quick Impact Indicators */}
        <div className="flex gap-1 flex-wrap">
          {issue.drinking_water_risk === "high" && (
            <Badge variant="destructive" className="text-xs">
              High Water Risk
            </Badge>
          )}
          {issue.crop_stress_level === "high" && (
            <Badge variant="destructive" className="text-xs">
              High Crop Stress
            </Badge>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onViewDetails(issue)}>
            View Details
          </Button>
          {canAction && onAction && (
            <Button size="sm" className="flex-1" onClick={() => onAction(issue)}>
              Take Action
            </Button>
          )}
          {canResolve && onResolve && (
            <Button size="sm" variant="default" className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => onResolve(issue)}>
              Mark Resolved
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
