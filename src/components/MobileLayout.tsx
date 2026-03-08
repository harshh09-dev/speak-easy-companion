import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, MessageSquare, MapPin, Bell, UserCircle, BarChart3, MessagesSquare, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNotifications } from "@/contexts/NotificationContext";
import { useApp } from "@/contexts/AppContext";
import { haptics } from "@/lib/haptics";

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
  const { unreadCount, setShowPanel } = useNotifications();
  const { isDarkMode, toggleDarkMode } = useApp();
  const tabs = role === "caregiver" ? caregiverTabs : userTabs;

  return (
    <div className="flex flex-col min-h-screen max-w-[480px] mx-auto bg-background relative">
      {/* Top bar: dark mode toggle + notification bell */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          onClick={() => {
            haptics.light();
            toggleDarkMode();
          }}
          whileTap={{ scale: 0.9 }}
          className="h-10 w-10 rounded-full bg-card shadow-card border border-border flex items-center justify-center"
        >
          <motion.div
            key={isDarkMode ? "dark" : "light"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-warning" />
            ) : (
              <Moon className="h-4 w-4 text-foreground" />
            )}
          </motion.div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => {
            haptics.light();
            setShowPanel(true);
          }}
          className="h-10 w-10 rounded-full bg-card shadow-card border border-border flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
        >
          <Bell className="h-4.5 w-4.5 text-foreground" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-destructive flex items-center justify-center"
            >
              <span className="text-[10px] font-bold text-destructive-foreground">{unreadCount}</span>
            </motion.div>
          )}
        </motion.button>
      </div>

      <main className="flex-1 overflow-y-auto pb-20">{children}</main>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card/95 backdrop-blur-lg border-t border-border px-2 py-1.5 z-50">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const isAlertTab = tab.label === "Alerts";
            return (
              <button
                key={tab.path}
                onClick={() => {
                  haptics.light();
                  navigate(tab.path);
                }}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 relative",
                  isActive ? "text-primary" : "text-muted-foreground active:scale-95"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -top-1.5 w-5 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="relative">
                  <tab.icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
                  {isAlertTab && unreadCount > 0 && (
                    <div className="absolute -top-1.5 -right-2 h-4 min-w-[16px] px-1 rounded-full bg-destructive flex items-center justify-center">
                      <span className="text-[8px] font-bold text-destructive-foreground">{unreadCount}</span>
                    </div>
                  )}
                </div>
                <span className={cn("text-[10px]", isActive ? "font-bold" : "font-medium")}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;
