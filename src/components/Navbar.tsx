import { Button } from "@/components/ui/button";
import { Droplet, Menu, X, Building2, Users, Brain, UserCircle as UserCircleIcon, ShoppingBag, LogOut, Wind, Recycle } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthModal from "./AuthModal";
import logo from "@/assets/logo-paryavaran-sahyog.png";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useUserRole } from "@/hooks/useUserRole";
import { useEnvironment } from "@/contexts/EnvironmentContext";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const { userRole } = useUserRole();
  const { environment } = useEnvironment();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if we're on a portal page
  const isPortalPage = ['/government', '/ngo', '/citizen'].some(path => 
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUserName(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", userId)
      .single();
    
    if (data) {
      setUserName(data.name);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navLinks = [
    { name: "Map", href: "/map", icon: null },
    { name: "Air Quality", href: "/air-quality-map", icon: null },
    { name: "Live Impact", href: "/live-impact", icon: null },
    { name: "Community", href: "/community", icon: null },
    { name: "Knowledge", href: "/knowledge", icon: null },
  ];

  const portalLinks = [
    { name: "Government Portal", href: "/government", icon: Building2 },
    { name: "NGO Portal", href: "/ngo", icon: Users },
    { name: "Research Portal", href: "/research", icon: Brain },
    { name: "Citizen Portal", href: "/citizen", icon: UserCircleIcon },
  ];

  // Get environment-specific styles
  const getEnvStyles = () => {
    if (!isPortalPage) return {};
    
    switch (environment) {
      case 'water':
        return {
          icon: Droplet,
          accentClass: 'text-primary',
          bgClass: 'from-primary/5 via-transparent to-secondary/5',
          borderClass: 'border-primary/20',
        };
      case 'air':
        return {
          icon: Wind,
          accentClass: 'text-primary',
          bgClass: 'from-primary/5 via-transparent to-secondary/5',
          borderClass: 'border-primary/20',
        };
      case 'waste':
        return {
          icon: Recycle,
          accentClass: 'text-primary',
          bgClass: 'from-primary/5 via-transparent to-secondary/5',
          borderClass: 'border-primary/20',
        };
      default:
        return {};
    }
  };

  const envStyles = getEnvStyles();
  const EnvIcon = envStyles.icon;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? `backdrop-blur-xl bg-background/80 border-b shadow-lg ${isPortalPage ? envStyles.borderClass : 'border-border/50'}` 
        : 'bg-transparent'
    } ${isPortalPage ? `env-${environment}` : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative">
              <img 
                src={logo} 
                alt="ParyavaranSahyog Logo" 
                className="w-10 h-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wide">
              ParyavaranSahyog
            </span>
            {/* Environment indicator on portal pages */}
            {isPortalPage && EnvIcon && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                <EnvIcon className={`w-3.5 h-3.5 ${envStyles.accentClass}`} />
                <span className="text-xs font-medium capitalize text-primary">
                  {environment}
                </span>
              </div>
            )}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                size="sm"
                onClick={() => navigate(link.href)}
                className={`text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
                  location.pathname === link.href ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                {link.name}
              </Button>
            ))}
            <Button 
              onClick={() => navigate("/marketplace")}
              variant="ghost"
              size="sm"
              className={`text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
                location.pathname === '/marketplace' ? 'bg-primary/10 text-primary' : ''
              }`}
            >
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              Marketplace
            </Button>
            
            <div className="w-px h-6 bg-border mx-2" />
            
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden lg:flex flex-col items-end mr-1">
                  <span className="text-sm font-medium text-foreground leading-tight">
                    {userName || "User"}
                  </span>
                  {userRole && (
                    <Badge 
                      variant="outline" 
                      className="text-[10px] capitalize px-1.5 py-0 h-4 border-primary/30 text-primary bg-primary/5"
                    >
                      {userRole}
                    </Badge>
                  )}
                </div>
                <Button 
                  onClick={() => navigate("/account")}
                  size="sm"
                  variant="ghost"
                  className="text-sm font-medium hover:bg-primary/10 hover:text-primary"
                >
                  <UserCircleIcon className="w-4 h-4" />
                  <span className="hidden lg:inline ml-1.5">Account</span>
                </Button>
                <Button 
                  onClick={handleLogout}
                  size="sm"
                  variant="outline"
                  className="text-sm font-medium border-border/60 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline ml-1.5">Logout</span>
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setAuthModalOpen(true)}
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover:shadow-lg transition-all duration-300 text-white font-medium px-5"
              >
                Login
              </Button>
            )}
          </div>
          
          <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/50 animate-fade-in">
            {/* Environment indicator on mobile */}
            {isPortalPage && EnvIcon && (
              <div className="flex items-center gap-2 px-3 py-2 mb-2 rounded-lg bg-primary/10 border border-primary/20">
                <EnvIcon className={`w-4 h-4 ${envStyles.accentClass}`} />
                <span className="text-sm font-medium capitalize text-primary">
                  {environment} Domain
                </span>
              </div>
            )}
            
            {portalLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    navigate(link.href);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 text-sm font-medium w-full px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    location.pathname === link.href 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </button>
              );
            })}
            
            <div className="h-px bg-border/50 my-3" />
            
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-2">
                  <UserCircleIcon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{userName || "User"}</p>
                    {userRole && (
                      <Badge variant="outline" className="text-[10px] capitalize mt-0.5">
                        {userRole}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button 
                  onClick={() => {
                    navigate("/account");
                    setIsMenuOpen(false);
                  }}
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  Account Settings
                </Button>
                <Button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  size="sm"
                  variant="ghost"
                  className="w-full text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => {
                  setAuthModalOpen(true);
                  setIsMenuOpen(false);
                }}
                size="sm"
                className="w-full bg-gradient-to-r from-primary to-secondary"
              >
                Login
              </Button>
            )}
            
            <Button 
              onClick={() => {
                navigate("/map");
                setIsMenuOpen(false);
              }}
              size="sm"
              variant="outline"
              className="w-full mt-2 border-primary/30 text-primary hover:bg-primary/10"
            >
              Explore Map
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;