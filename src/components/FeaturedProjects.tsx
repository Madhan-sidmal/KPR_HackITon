import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Heart, Users, TrendingUp } from "lucide-react";

const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Restore Bellandur Lake",
      ngo: "Waterkeeper Alliance India",
      location: "Bangalore, Karnataka",
      progress: 78,
      volunteers: 450,
      funding: "₹42,00,000 raised of ₹50,00,000",
      verified: true,
      image: "linear-gradient(135deg, hsl(195 91% 64%), hsl(186 99% 20%))",
    },
    {
      id: 2,
      title: "Yamuna River Cleanup",
      ngo: "Delhi Green Initiative",
      location: "Delhi NCR",
      progress: 62,
      volunteers: 1200,
      funding: "₹1,20,00,000 raised of ₹2,00,00,000",
      verified: true,
      image: "linear-gradient(135deg, hsl(186 99% 20%), hsl(195 91% 64%))",
    },
    {
      id: 3,
      title: "Stepwell Conservation",
      ngo: "Heritage Water Foundation",
      location: "Rajasthan",
      progress: 45,
      volunteers: 280,
      funding: "₹18,00,000 raised of ₹40,00,000",
      verified: true,
      image: "linear-gradient(135deg, hsl(30 40% 45%), hsl(195 91% 64%))",
    },
  ];

  return (
    <section id="ngos" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
            Featured Projects
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            Making Waves Across India
          </h2>
          <p className="text-lg text-muted-foreground">
            Support NGO-led initiatives restoring India's precious waterbodies
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-water transition-all duration-300 group"
            >
              {/* Project Image/Gradient */}
              <div
                className="h-48 relative overflow-hidden"
                style={{ background: project.image }}
              >
                {project.verified && (
                  <Badge className="absolute top-4 right-4 bg-white/90 text-primary hover:bg-white">
                    ✓ Verified
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{project.ngo}</span>
                </CardDescription>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-primary">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      {project.volunteers} volunteers
                    </span>
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>

                {/* Funding */}
                <p className="text-sm text-muted-foreground">{project.funding}</p>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-water">
                    <Heart className="w-4 h-4 mr-2" />
                    Support
                  </Button>
                  <Button variant="outline" size="icon" className="border-primary/50">
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-primary hover:bg-primary/10"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
