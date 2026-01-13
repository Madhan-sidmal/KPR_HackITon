import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Droplet, 
  Wind, 
  Trash2,
  Users,
  Trophy,
  Target,
  MapPin,
  Building2,
  Brain,
  FileText,
  Heart,
  Zap,
  Award,
  TrendingUp,
  Database,
  Upload,
  DollarSign,
  Shield
} from "lucide-react";

type UserRole = "citizen" | "ngo" | "government" | "research";

interface TutorialStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  tip?: string;
}

interface OnboardingTutorialProps {
  role: UserRole;
  userName?: string;
}

const getRoleTutorialContent = (role: UserRole): { 
  welcomeTitle: string; 
  welcomeDescription: string;
  steps: TutorialStep[];
} => {
  switch (role) {
    case "citizen":
      return {
        welcomeTitle: "Welcome to Citizen Portal! 🌱",
        welcomeDescription: "You're now part of India's largest environmental action community. Let's show you around!",
        steps: [
          {
            icon: <Zap className="w-8 h-8 text-yellow-500" />,
            title: "Earn EcoPoints",
            description: "Complete challenges, report issues, and participate in cleanup drives to earn EcoPoints. The more you engage, the higher you climb on the leaderboard!",
            tip: "Pro tip: Daily challenges give you bonus points!"
          },
          {
            icon: <MapPin className="w-8 h-8 text-primary" />,
            title: "Explore the Map",
            description: "View real-time environmental data near you. Check water quality, air pollution levels, and waste management status in your area.",
            tip: "Enable location for personalized nearby alerts"
          },
          {
            icon: <Target className="w-8 h-8 text-accent" />,
            title: "Take on Challenges",
            description: "From cleaning ponds to planting trees - pick challenges that match your interests and skill level. Complete them to earn badges and recognition!",
            tip: "Start with easy challenges to build your streak"
          },
          {
            icon: <Trophy className="w-8 h-8 text-yellow-500" />,
            title: "Climb the Ranks",
            description: "Your impact contributes to your regional ranking. Unlock exclusive badges, join elite cleanups, and become a community leader!",
            tip: "Top 100 citizens get invited to special events"
          },
          {
            icon: <Users className="w-8 h-8 text-secondary" />,
            title: "Join the Community",
            description: "Connect with other eco-warriors, share your progress on the feed, and inspire others to take action!",
            tip: "Follow local NGOs for upcoming events"
          }
        ]
      };

    case "ngo":
      return {
        welcomeTitle: "Welcome to NGO Portal! 🌊",
        welcomeDescription: "Manage your restoration projects, engage volunteers, and track your impact - all in one place.",
        steps: [
          {
            icon: <FileText className="w-8 h-8 text-primary" />,
            title: "Create Projects",
            description: "Add your restoration projects with geo-tagging, photos, and funding goals. Projects get auto-verified by government authorities for credibility.",
            tip: "Add before/after photos for better engagement"
          },
          {
            icon: <TrendingUp className="w-8 h-8 text-green-500" />,
            title: "Track Impact",
            description: "Use our AI-powered Impact Score to measure your environmental contributions. Generate detailed reports for donors and stakeholders.",
            tip: "Regular updates boost your impact score"
          },
          {
            icon: <Heart className="w-8 h-8 text-red-500" />,
            title: "Manage Donations",
            description: "Receive donations transparently with blockchain-backed tracking. Donors can see exactly how their money is used.",
            tip: "Share donation milestones on the feed"
          },
          {
            icon: <Users className="w-8 h-8 text-secondary" />,
            title: "Engage Volunteers",
            description: "Recruit and manage volunteers for your drives. Track their contributions and reward them with certificates.",
            tip: "Schedule drives during weekends for more participation"
          },
          {
            icon: <Award className="w-8 h-8 text-yellow-500" />,
            title: "Build Your Reputation",
            description: "Climb the NGO leaderboard, earn verification badges, and collaborate with other organizations for bigger impact!",
            tip: "Partner with verified NGOs for coalition projects"
          }
        ]
      };

    case "government":
      return {
        welcomeTitle: "Welcome to Government Portal! 🏛️",
        welcomeDescription: "Access powerful tools for policy simulation, compliance monitoring, and data-driven decision making.",
        steps: [
          {
            icon: <Building2 className="w-8 h-8 text-secondary" />,
            title: "Dashboard Overview",
            description: "Get a bird's-eye view of environmental restoration across states. Track progress, identify hotspots, and monitor NGO activities.",
            tip: "Use filters to focus on specific regions"
          },
          {
            icon: <Brain className="w-8 h-8 text-primary" />,
            title: "Policy Simulator",
            description: "Test policy scenarios with our AI-powered simulator. See projected outcomes before implementation.",
            tip: "Compare multiple scenarios side-by-side"
          },
          {
            icon: <Shield className="w-8 h-8 text-orange-500" />,
            title: "Compliance Engine",
            description: "Automated compliance checking for NGOs and projects. Get alerts for violations and track remediation.",
            tip: "Set up custom compliance rules for your state"
          },
          {
            icon: <DollarSign className="w-8 h-8 text-green-500" />,
            title: "Fund Allocation",
            description: "AI-driven recommendations for optimal fund distribution. Track utilization and measure ROI of environmental investments.",
            tip: "Review AI suggestions weekly for best results"
          },
          {
            icon: <FileText className="w-8 h-8 text-accent" />,
            title: "Generate Briefings",
            description: "Auto-generate ministerial briefings with key metrics, progress reports, and actionable insights.",
            tip: "Schedule automated weekly reports"
          }
        ]
      };

    case "research":
      return {
        welcomeTitle: "Welcome to Research Portal! 🔬",
        welcomeDescription: "Access datasets, publish models, and collaborate with researchers across India.",
        steps: [
          {
            icon: <Database className="w-8 h-8 text-primary" />,
            title: "Access Datasets",
            description: "Download official datasets from ISRO, CGWB, CPCB, and other agencies. Request custom datasets for your research needs.",
            tip: "Check the 'Updated' date for freshest data"
          },
          {
            icon: <Brain className="w-8 h-8 text-secondary" />,
            title: "Predictive Sandbox",
            description: "Test your hypotheses with our AI sandbox. Run simulations on environmental scenarios and validate models.",
            tip: "Save your experiments for reproducibility"
          },
          {
            icon: <Upload className="w-8 h-8 text-accent" />,
            title: "Publish Models",
            description: "Share your AI models with the community. Track downloads, get citations, and collaborate on improvements.",
            tip: "Add detailed documentation for more downloads"
          },
          {
            icon: <DollarSign className="w-8 h-8 text-green-500" />,
            title: "Find Grants",
            description: "Discover funding opportunities for your research. Our AI matches your profile with relevant grants.",
            tip: "Keep your profile updated for better matches"
          },
          {
            icon: <Users className="w-8 h-8 text-yellow-500" />,
            title: "Peer Review",
            description: "Participate in peer review of research papers and models. Build your reputation as a reviewer.",
            tip: "Quality reviews earn you credibility points"
          }
        ]
      };

    default:
      return {
        welcomeTitle: "Welcome!",
        welcomeDescription: "Let's get you started.",
        steps: []
      };
  }
};

const OnboardingTutorial = ({ role, userName }: OnboardingTutorialProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isWelcome, setIsWelcome] = useState(true);

  const tutorialKey = `tutorial_seen_${role}`;
  const content = getRoleTutorialContent(role);

  useEffect(() => {
    // Check if user has seen the tutorial for this role
    const hasSeen = localStorage.getItem(tutorialKey);
    if (!hasSeen) {
      setIsOpen(true);
    }
  }, [tutorialKey]);

  const handleComplete = () => {
    localStorage.setItem(tutorialKey, "true");
    setIsOpen(false);
  };

  const handleSkip = () => {
    localStorage.setItem(tutorialKey, "true");
    setIsOpen(false);
  };

  const handleNext = () => {
    if (isWelcome) {
      setIsWelcome(false);
    } else if (currentStep < content.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (!isWelcome) {
      setIsWelcome(true);
    }
  };

  const progress = isWelcome ? 0 : ((currentStep + 1) / content.steps.length) * 100;
  const currentTutorialStep = content.steps[currentStep];

  const getRoleIcon = () => {
    switch (role) {
      case "citizen":
        return <Users className="w-16 h-16 text-primary" />;
      case "ngo":
        return <Heart className="w-16 h-16 text-primary" />;
      case "government":
        return <Building2 className="w-16 h-16 text-secondary" />;
      case "research":
        return <Brain className="w-16 h-16 text-secondary" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          {isWelcome ? (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto w-fit p-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                {getRoleIcon()}
              </div>
              <DialogTitle className="text-2xl">
                {content.welcomeTitle}
              </DialogTitle>
              <DialogDescription className="text-base">
                {userName ? `Hello ${userName}! ` : ""}{content.welcomeDescription}
              </DialogDescription>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  Step {currentStep + 1} of {content.steps.length}
                </p>
              </div>
              <div className="text-center space-y-4 py-4">
                <div className="mx-auto w-fit p-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                  {currentTutorialStep?.icon}
                </div>
                <DialogTitle className="text-xl">
                  {currentTutorialStep?.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {currentTutorialStep?.description}
                </DialogDescription>
                {currentTutorialStep?.tip && (
                  <div className="bg-muted/50 rounded-lg p-3 text-sm">
                    <span className="font-medium">💡 {currentTutorialStep.tip}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {isWelcome ? (
            <>
              <Button variant="ghost" onClick={handleSkip} className="sm:mr-auto">
                Skip Tutorial
              </Button>
              <Button onClick={handleNext} className="bg-gradient-to-r from-primary to-secondary">
                Get Started
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={handleSkip} className="sm:mr-auto">
                Skip
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handlePrev}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext} className="bg-gradient-to-r from-primary to-secondary">
                  {currentStep === content.steps.length - 1 ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Finish
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingTutorial;
