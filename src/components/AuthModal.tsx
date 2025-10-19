import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplet, Mail, Lock, User, Building2, Users as UsersIcon, Brain, UserCircle } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [selectedRole, setSelectedRole] = useState<string>("");

  const roles = [
    { id: "citizen", label: "Citizen", icon: UserCircle, color: "from-orange-500 to-yellow-500" },
    { id: "ngo", label: "NGO", icon: UsersIcon, color: "from-green-500 to-emerald-500" },
    { id: "government", label: "Government", icon: Building2, color: "from-blue-500 to-cyan-500" },
    { id: "research", label: "Researcher", icon: Brain, color: "from-purple-500 to-pink-500" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Droplet className="w-6 h-6 text-primary" />
            <DialogTitle className="text-2xl">Welcome to JalSahyog</DialogTitle>
          </div>
          <DialogDescription className="text-center">
            Join India's largest water restoration ecosystem
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="login-email" 
                  type="email" 
                  placeholder="your@email.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="login-password" 
                  type="password" 
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-primary to-secondary">
              Login
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <Button variant="link" className="text-xs">Forgot password?</Button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Select Your Role</Label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedRole === role.id
                          ? 'border-primary bg-primary/10'
                          : 'border-muted hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${role.color} flex items-center justify-center mx-auto mb-2`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-sm font-medium">{role.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-name">Full Name / Organization</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="register-name" 
                  placeholder="Enter your name"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="register-email" 
                  type="email" 
                  placeholder="your@email.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="register-password" 
                  type="password" 
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-primary to-secondary"
              disabled={!selectedRole}
            >
              Create Account
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By registering, you agree to our Terms of Service and Privacy Policy
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;