import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import SplashScreen from "./pages/SplashScreen";
import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";
import UserHome from "./pages/user/UserHome";
import CommunicationBoard from "./pages/user/CommunicationBoard";
import UserTracking from "./pages/user/UserTracking";
import CaregiverDashboard from "./pages/caregiver/CaregiverDashboard";
import AIAnalysis from "./pages/caregiver/AIAnalysis";
import CaregiverTracking from "./pages/caregiver/CaregiverTracking";
import AlertsScreen from "./pages/shared/AlertsScreen";
import ProfileScreen from "./pages/shared/ProfileScreen";
import EmergencyScreen from "./pages/EmergencyScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/role-select" element={<RoleSelect />} />
            <Route path="/login" element={<Login />} />
            
            {/* User Routes */}
            <Route path="/user" element={<UserHome />} />
            <Route path="/user/communicate" element={<CommunicationBoard />} />
            <Route path="/user/tracking" element={<UserTracking />} />
            <Route path="/user/alerts" element={<AlertsScreen role="user" />} />
            <Route path="/user/profile" element={<ProfileScreen role="user" />} />
            
            {/* Caregiver Routes */}
            <Route path="/caregiver" element={<CaregiverDashboard />} />
            <Route path="/caregiver/tracking" element={<CaregiverTracking />} />
            <Route path="/caregiver/analysis" element={<AIAnalysis />} />
            <Route path="/caregiver/alerts" element={<AlertsScreen role="caregiver" />} />
            <Route path="/caregiver/profile" element={<ProfileScreen role="caregiver" />} />
            
            {/* Emergency */}
            <Route path="/emergency" element={<EmergencyScreen />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
