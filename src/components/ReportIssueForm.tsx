import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { EnvironmentView } from "@/components/EnvironmentToggle";

interface ReportIssueFormProps {
  domain: EnvironmentView;
  onSuccess?: () => void;
}

const ReportIssueForm = ({ domain, onSuccess }: ReportIssueFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location_name: "",
    photo_url: "",
    drinking_water_risk: "medium",
    irrigation_impact: "medium",
    soil_health_risk: "medium",
    crop_stress_level: "medium",
    seasonal_relevance: "All Seasons",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please login to report an issue");
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("issues").insert({
        title: formData.title,
        description: formData.description,
        domain: domain as "air" | "water" | "waste",
        location_name: formData.location_name,
        photo_url: formData.photo_url || null,
        reported_by: user.id,
        drinking_water_risk: formData.drinking_water_risk as "low" | "medium" | "high",
        irrigation_impact: formData.irrigation_impact as "low" | "medium" | "high",
        soil_health_risk: formData.soil_health_risk as "low" | "medium" | "high",
        crop_stress_level: formData.crop_stress_level as "low" | "medium" | "high",
        seasonal_relevance: formData.seasonal_relevance,
      });

      if (error) throw error;

      toast.success("Issue reported successfully!");
      setFormData({
        title: "",
        description: "",
        location_name: "",
        photo_url: "",
        drinking_water_risk: "medium",
        irrigation_impact: "medium",
        soil_health_risk: "medium",
        crop_stress_level: "medium",
        seasonal_relevance: "All Seasons",
      });
      onSuccess?.();
    } catch (error) {
      console.error("Error reporting issue:", error);
      toast.error("Failed to report issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Report Environmental Issue
        </CardTitle>
        <CardDescription>
          Help protect our environment by reporting issues in your area
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Issue Title</Label>
            <Input
              id="title"
              placeholder="e.g., Industrial waste dumping near river"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                className="pl-9"
                placeholder="Village/Town, District, State"
                value={formData.location_name}
                onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo_url">Photo URL (optional)</Label>
            <Input
              id="photo_url"
              placeholder="https://..."
              value={formData.photo_url}
              onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Drinking Water Risk</Label>
              <Select
                value={formData.drinking_water_risk}
                onValueChange={(value) => setFormData({ ...formData, drinking_water_risk: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Crop Stress Level</Label>
              <Select
                value={formData.crop_stress_level}
                onValueChange={(value) => setFormData({ ...formData, crop_stress_level: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Seasonal Relevance</Label>
            <Select
              value={formData.seasonal_relevance}
              onValueChange={(value) => setFormData({ ...formData, seasonal_relevance: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Seasons">All Seasons</SelectItem>
                <SelectItem value="Monsoon (Kharif)">Monsoon (Kharif)</SelectItem>
                <SelectItem value="Winter (Rabi)">Winter (Rabi)</SelectItem>
                <SelectItem value="Summer (Zaid)">Summer (Zaid)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Submit Report
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReportIssueForm;
