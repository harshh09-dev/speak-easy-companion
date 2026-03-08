import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, MessageSquare, MapPin, Bell, UserCircle, BarChart3, MessagesSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: ReactNode;
  role: "user" | "caregiver";
}

const userTabs = [
  { path: "/user", icon: Home, label: "Home" },
  { path: "/user/communicate", icon: MessageSquare, label: "Talk" },
  { path: "/user/chat", icon: MessagesSquare, label: "Chat" },
  { path: "/user/tracking", icon: MapPin, label: "Track" },
  { path: "/user/alerts", icon: Bell, label: "Alerts" },
];

const caregiverTabs = [
  { path: "/caregiver", icon: Home, label: "Home" },
  { path: "/caregiver/tracking", icon: MapPin, label: "Track" },
  { path: "/caregiver/analysis", icon: BarChart3, label: "AI" },
  { path: "/caregiver/alerts", icon: Bell, label: "Alerts" },
  { path: "/caregiver/profile", icon: UserCircle, label: "Profile" },
];

const MobileLayout = ({ children, role }: MobileLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const tabs = role === "caregiver" ? caregiverTabs : userTabs;

  return (
    <div className="flex flex-col min-h-screen max-w-[480px] mx-auto bg-background relative">
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card border-t border-border px-2 py-1 z-50">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <tab.icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;
