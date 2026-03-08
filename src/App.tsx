import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import SplashScreen from "./pages/SplashScreen";
import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";
import Welcome from "./pages/onboarding/Welcome";
import Permissions from "./pages/onboarding/Permissions";
import AccessibilitySetup from "./pages/onboarding/AccessibilitySetup";
import CommunicationPreferences from "./pages/onboarding/CommunicationPreferences";
import UserHome from "./pages/user/UserHome";
import CommunicationBoard from "./pages/user/CommunicationBoard";
import ChatScreen from "./pages/user/ChatScreen";
import VoiceOutput from "./pages/user/VoiceOutput";
import UserTracking from "./pages/user/UserTracking";
import EmotionDashboard from "./pages/user/EmotionDashboard";
import CaregiverDashboard from "./pages/caregiver/CaregiverDashboard";
import AIAnalysis from "./pages/caregiver/AIAnalysis";
import CaregiverTracking from "./pages/caregiver/CaregiverTracking";
import AlertsScreen from "./pages/shared/AlertsScreen";
import ProfileScreen from "./pages/shared/ProfileScreen";
import SettingsScreen from "./pages/shared/SettingsScreen";
import EditProfile from "./pages/shared/EditProfile";
import EmergencyContacts from "./pages/shared/EmergencyContacts";
import ActivityTimeline from "./pages/shared/ActivityTimeline";
import EmergencyScreen from "./pages/EmergencyScreen";
import WearableSetup from "./pages/wearable/WearableSetup";
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

            {/* Onboarding */}
            <Route path="/onboarding/welcome" element={<Welcome />} />
            <Route path="/onboarding/permissions" element={<Permissions />} />
            <Route path="/onboarding/accessibility" element={<AccessibilitySetup />} />
            <Route path="/onboarding/communication" element={<CommunicationPreferences />} />

            {/* User Routes */}
            <Route path="/user" element={<UserHome />} />
            <Route path="/user/communicate" element={<CommunicationBoard />} />
            <Route path="/user/chat" element={<ChatScreen />} />
            <Route path="/user/voice" element={<VoiceOutput />} />
            <Route path="/user/tracking" element={<UserTracking />} />
            <Route path="/user/alerts" element={<AlertsScreen role="user" />} />
            <Route path="/user/profile" element={<ProfileScreen role="user" />} />
            <Route path="/user/settings" element={<SettingsScreen role="user" />} />
            <Route path="/user/edit-profile" element={<EditProfile role="user" />} />
            <Route path="/user/emergency-contacts" element={<EmergencyContacts role="user" />} />
            <Route path="/user/timeline" element={<ActivityTimeline role="user" />} />

            {/* Caregiver Routes */}
            <Route path="/caregiver" element={<CaregiverDashboard />} />
            <Route path="/caregiver/tracking" element={<CaregiverTracking />} />
            <Route path="/caregiver/analysis" element={<AIAnalysis />} />
            <Route path="/caregiver/emotions" element={<EmotionDashboard />} />
            <Route path="/caregiver/alerts" element={<AlertsScreen role="caregiver" />} />
            <Route path="/caregiver/profile" element={<ProfileScreen role="caregiver" />} />
            <Route path="/caregiver/settings" element={<SettingsScreen role="caregiver" />} />
            <Route path="/caregiver/edit-profile" element={<EditProfile role="caregiver" />} />
            <Route path="/caregiver/emergency-contacts" element={<EmergencyContacts role="caregiver" />} />
            <Route path="/caregiver/timeline" element={<ActivityTimeline role="caregiver" />} />

            {/* Wearable */}
            <Route path="/wearable/setup" element={<WearableSetup />} />

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
