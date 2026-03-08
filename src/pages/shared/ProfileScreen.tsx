import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { UserCircle, Mail, Phone, Settings, LogOut, ChevronRight, Shield, Watch, Edit } from "lucide-react";

interface ProfileScreenProps {
  role: "user" | "caregiver";
}

const ProfileScreen = ({ role }: ProfileScreenProps) => {
  const { userName, setIsLoggedIn, setRole } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    navigate("/");
  };

  const menuItems = [
    { label: "Edit Profile", icon: Edit, action: () => navigate(`/${role}/edit-profile`) },
    { label: "Emergency Contacts", icon: Phone, action: () => navigate(`/${role}/emergency-contacts`) },
    { label: "Wearable Devices", icon: Watch, action: () => navigate("/wearable/setup") },
    { label: "Settings", icon: Settings, action: () => navigate(`/${role}/settings`) },
  ];

  return (
    <MobileLayout role={role}>
      <div className="px-5 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="h-24 w-24 rounded-full bg-gradient-primary flex items-center justify-center mb-3">
            <span className="text-3xl font-bold text-primary-foreground">{userName[0]}</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">{userName}</h1>
          <p className="text-muted-foreground text-sm capitalize">{role}</p>
          <p className="text-xs text-muted-foreground mt-1">alex@neurospeak.com</p>
        </motion.div>

        <div className="flex flex-col gap-2 mb-6">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              onClick={item.action}
              className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-card border border-border w-full text-left"
            >
              <item.icon className="h-5 w-5 text-primary" />
              <span className="flex-1 font-medium text-card-foreground">{item.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-destructive/10 p-4 text-destructive font-medium"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </motion.button>
      </div>
    </MobileLayout>
  );
};

export default ProfileScreen;
