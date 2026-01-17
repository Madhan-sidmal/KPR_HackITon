import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EnvironmentProvider } from "@/contexts/EnvironmentContext";
import Index from "./pages/Index";
import AirQualityMapPage from "./pages/AirQualityMapPage";
import GovernmentPortal from "./pages/GovernmentPortal";
import NGOPortal from "./pages/NGOPortal";
import CitizenPortal from "./pages/CitizenPortal";
import MapPage from "./pages/MapPage";
import MarketplacePage from "./pages/MarketplacePage";
import KnowledgeHub from "./pages/KnowledgeHub";
import CommunityHub from "./pages/CommunityHub";
import NotFound from "./pages/NotFound";
import CorrelationEnginePage from "./pages/CorrelationEnginePage";
import EcoHealthScorePage from "./pages/EcoHealthScorePage";
import PolicySimulatorPage from "./pages/PolicySimulatorPage";
import AccountPage from "./pages/AccountPage";
import VerifyEmail from "./pages/VerifyEmail";
import CompleteProfile from "./pages/CompleteProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <EnvironmentProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/air-quality-map" element={<AirQualityMapPage />} />
            <Route path="/government" element={<GovernmentPortal />} />
            <Route path="/ngo" element={<NGOPortal />} />
            <Route path="/citizen" element={<CitizenPortal />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/knowledge" element={<KnowledgeHub />} />
            <Route path="/community" element={<CommunityHub />} />
            <Route path="/correlation-engine" element={<CorrelationEnginePage />} />
            <Route path="/eco-health-score" element={<EcoHealthScorePage />} />
            <Route path="/policy-simulator" element={<PolicySimulatorPage />} />
            <Route path="/account" element={<AccountPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </EnvironmentProvider>
  </QueryClientProvider>
);

export default App;
