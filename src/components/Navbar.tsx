import { Button } from "@/components/ui/button";
import { Droplet, Menu, X, Building2, Users, Brain, UserCircle, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import logo from "@/assets/logo-paryavaran-sahyog.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Map", href: "/map", icon: null },
    { name: "Community", href: "/community", icon: null },
    { name: "Knowledge", href: "/knowledge", icon: null },
  ];

  const portalLinks = [
    { name: "Government Portal", href: "/government", icon: Building2 },
    { name: "NGO Portal", href: "/ngo", icon: Users },
    { name: "Research Portal", href: "/research", icon: Brain },
    { name: "Citizen Portal", href: "/citizen", icon: UserCircle },
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
            <Button 
              onClick={() => setAuthModalOpen(true)}
              size="sm"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-water"
            >
              Login
            </Button>
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
            {portalLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    navigate(link.href);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors w-full"
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </button>
              );
            })}
            <Button 
              onClick={() => {
                navigate("/map");
                setIsMenuOpen(false);
              }}
              size="sm"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-water mt-4"
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
