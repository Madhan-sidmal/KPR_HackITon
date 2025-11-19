import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["app_role"];

interface AuthGuardResult {
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  isProfileComplete: boolean;
  userRole: UserRole | null;
  userId: string | null;
  loading: boolean;
}

export const useAuthGuard = (requiredRole?: UserRole): AuthGuardResult => {
  const [state, setState] = useState<AuthGuardResult>({
    isAuthenticated: false,
    isEmailVerified: false,
    isProfileComplete: false,
    userRole: null,
    userId: null,
    loading: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setState(prev => ({ ...prev, loading: false }));
          if (requiredRole) {
            const targetPortal = window.location.pathname;
            localStorage.setItem('targetPortal', targetPortal);
            toast.error("Please login to access this portal");
            navigate("/");
          }
          return;
        }

        // 2. Check if email is verified
        const isEmailVerified = user.email_confirmed_at !== null;
        if (!isEmailVerified && requiredRole) {
          toast.error("Please verify your email to access this portal");
          navigate("/verify-email");
          return;
        }

        // 3. Fetch user profile from DB (server-side check)
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("name, bio")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
        }

        // Check if profile is complete (name is required)
        const isProfileComplete = profile?.name !== null && profile?.name !== "";
        if (!isProfileComplete && requiredRole) {
          const targetPortal = window.location.pathname;
          localStorage.setItem('targetPortal', targetPortal);
          toast.error("Please complete your profile to access this portal");
          navigate("/complete-profile");
          return;
        }

        // 4. Fetch user role from DB (NEVER trust localStorage)
        const { data: roleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .single();

        if (roleError) {
          console.error("Error fetching user role:", roleError);
          setState(prev => ({ ...prev, loading: false }));
          return;
        }

        const userRole = roleData?.role || null;

        // 5. Check if role matches required role for portal
        if (requiredRole && userRole !== requiredRole) {
          toast.error(`You need a ${requiredRole} account to access this portal`);
          localStorage.removeItem('targetPortal');
          navigate("/");
          return;
        }

        setState({
          isAuthenticated: true,
          isEmailVerified,
          isProfileComplete,
          userRole,
          userId: user.id,
          loading: false,
        });

      } catch (error) {
        console.error("Error in auth guard:", error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => subscription.unsubscribe();
  }, [requiredRole, navigate]);

  return state;
};
