import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Brain, Droplet } from "lucide-react";

const CTASection = () => {
  const roles = [
    {
      icon: Building2,
      title: "NGOs",
      description: "List projects, track impact, and connect with donors",
      color: "from-primary to-primary-glow",
      buttonText: "Register as NGO",
    },
    {
      icon: Users,
      title: "Citizens",
      description: "Report issues, join cleanups, earn rewards",
      color: "from-secondary to-primary",
      buttonText: "Join as Citizen",
    },
    {
      icon: Brain,
      title: "Researchers",
      description: "Share insights, access data, collaborate",
      color: "from-accent to-secondary",
      buttonText: "Register as Researcher",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Droplet className="w-8 h-8 text-primary animate-float" fill="currentColor" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Join the Mission
            </h2>
            <Droplet className="w-8 h-8 text-primary animate-float" fill="currentColor" style={{ animationDelay: "0.5s" }} />
          </div>
          <p className="text-lg text-muted-foreground">
            Every role is vital. Choose how you want to contribute to India's water security.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.title}
                className="glass-card hover:shadow-water transition-all duration-300 group overflow-hidden relative"
              >
                {/* Gradient Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${role.color}`} />

                <CardHeader className="text-center pt-8">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{role.title}</CardTitle>
                  <CardDescription className="text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center pb-8">
                  <Button
                    className={`w-full bg-gradient-to-r ${role.color} hover:shadow-water transition-all`}
                  >
                    {role.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">
            Already a government official?
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-primary hover:bg-primary/10"
          >
            Access Government Portal
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
