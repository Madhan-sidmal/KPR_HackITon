import { Button } from "@/components/ui/button";
import { Droplet, Menu, X, Building2, Users, Brain, UserCircle as UserCircleIcon, ShoppingBag, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import logo from "@/assets/logo-paryavaran-sahyog.png";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useUserRole } from "@/hooks/useUserRole";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const { userRole } = useUserRole();
  const navigate = useNavigate();

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
    { name: "Dashboard", href: "/dashboard", icon: null },
    { name: "Map", href: "/map", icon: null },
    { name: "Air Quality", href: "/air-quality-map", icon: null },
    { name: "Community", href: "/community", icon: null },
    { name: "Knowledge", href: "/knowledge", icon: null },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass border-b border-border/50 shadow-lg' : 'bg-transparent'
    }`}>
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
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wide">
              ParyavaranSahyog
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                size="sm"
                onClick={() => navigate(link.href)}
                className="text-sm font-medium hover:text-primary"
              >
                {link.name}
              </Button>
            ))}
            <Button 
              onClick={() => navigate("/marketplace")}
              variant="ghost"
              size="sm"
              className="text-sm font-medium hover:text-primary"
            >
              <ShoppingBag className="w-4 h-4 mr-1" />
              Marketplace
            </Button>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden lg:flex flex-col items-end">
                  <span className="text-sm font-medium text-foreground">
                    {userName || "User"}
                  </span>
                  {userRole && (
                    <Badge variant="secondary" className="text-xs capitalize">
                      {userRole}
                    </Badge>
                  )}
                </div>
                <Button 
                  onClick={() => navigate("/account")}
                  size="sm"
                  variant="ghost"
                  className="text-sm font-medium hover:text-primary"
                >
                  <UserCircleIcon className="w-4 h-4 mr-1" />
                  Account
                </Button>
                <Button 
                  onClick={handleLogout}
                  size="sm"
                  variant="outline"
                  className="text-sm font-medium"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setAuthModalOpen(true)}
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-water"
              >
                Login
              </Button>
            )}
          </div>
          
          <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
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
          <div className="md:hidden py-4 space-y-3 border-t border-border/50 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  navigate(link.href);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors w-full"
              >
                {link.name}
              </button>
            ))}
            <Button 
              onClick={() => {
                navigate("/dashboard");
                setIsMenuOpen(false);
              }}
              size="sm"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-water mt-4"
            >
              Open Dashboard
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
