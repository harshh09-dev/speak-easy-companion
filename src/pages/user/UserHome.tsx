import { useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import MobileLayout from "@/components/MobileLayout";
import { Hand, Droplets, UtensilsCrossed, Moon, AlertTriangle, ShieldCheck, Watch, Heart, Activity, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/contexts/NotificationContext";

const quickActions = [
  { label: "I Need Help", icon: Hand, color: "bg-destructive" },
  { label: "I Am Hungry", icon: UtensilsCrossed, color: "bg-warning" },
  { label: "I Need Water", icon: Droplets, color: "bg-primary" },
  { label: "I Am Tired", icon: Moon, color: "bg-accent" },
  { label: "I Am In Pain", icon: AlertTriangle, color: "bg-destructive" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const UserHome = () => {
  const { userName } = useApp();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const greeting = useMemo(() => getGreeting(), []);

  const handleQuickAction = (label: string) => {
    navigate(`/user/voice?phrase=${encodeURIComponent(label)}`);
  };

  const handleEmergency = () => {
    addNotification({
      type: "emergency",
      title: "Emergency Activated",
      body: "Emergency alert sent to all caregivers. Location shared.",
    });
    navigate("/emergency");
  };

  return (
    <MobileLayout role="user">
      <motion.div
        className="px-5 pt-6"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp}>
          <p className="text-muted-foreground text-sm">{greeting}</p>
          <h1 className="text-2xl font-bold text-foreground">Hello, {userName} 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">How can we help today?</p>
        </motion.div>

        {/* Emergency Button */}
        <motion.button
          variants={fadeUp}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          onClick={handleEmergency}
          className="mt-5 w-full rounded-xl bg-gradient-danger p-5 text-destructive-foreground text-center shadow-elevated active:shadow-card transition-shadow"
        >
          <AlertTriangle className="h-8 w-8 mx-auto mb-1" />
          <p className="font-bold text-lg">EMERGENCY</p>
          <p className="text-sm opacity-90">Tap to alert caregiver</p>
        </motion.button>

        {/* Quick Communication */}
        <motion.h2 variants={fadeUp} className="text-lg font-semibold text-foreground mt-7 mb-3">
          Quick Communicate
        </motion.h2>
        <motion.div variants={stagger} className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <motion.button
              key={action.label}
              variants={fadeUp}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -2 }}
              onClick={() => handleQuickAction(action.label)}
              className="flex flex-col items-center gap-2 rounded-xl bg-card p-5 shadow-card border border-border hover:shadow-elevated hover:border-primary/30 transition-all"
            >
              <div className={`h-12 w-12 rounded-full ${action.color} flex items-center justify-center`}>
                <action.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-card-foreground">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* AI Status */}
        <motion.div
          variants={fadeUp}
          className="mt-6 rounded-xl bg-card p-5 shadow-card border border-border"
        >
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="h-6 w-6 text-success" />
            <div>
              <p className="font-semibold text-card-foreground">AI Status: Safe</p>
              <p className="text-xs text-muted-foreground">Last analysis: Normal</p>
            </div>
            <div className="ml-auto h-3 w-3 rounded-full bg-success animate-pulse" />
          </div>
          <div className="bg-muted rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Today's Activity</p>
            <div className="flex gap-1 items-end h-10">
              {[40, 65, 50, 80, 70, 55, 90, 60, 75, 45, 85, 70].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm bg-primary/60"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.04, duration: 0.4, ease: "easeOut" }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Wearable Quick Stats */}
        <motion.div
          variants={fadeUp}
          className="mt-4 rounded-xl bg-card p-4 shadow-card border border-border mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Watch className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-card-foreground">Health Monitor</span>
            <div className="ml-auto flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] text-success font-medium">Connected</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Heart, value: "72", unit: "BPM", color: "text-destructive" },
              { icon: Activity, value: "3.2k", unit: "Steps", color: "text-primary" },
              { icon: ShieldCheck, value: "Low", unit: "Stress", color: "text-success" },
            ].map((d) => (
              <div key={d.unit} className="text-center">
                <d.icon className={`h-4 w-4 ${d.color} mx-auto mb-0.5`} />
                <p className="text-sm font-bold text-foreground">{d.value}</p>
                <p className="text-[10px] text-muted-foreground">{d.unit}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </MobileLayout>
  );
};

export default UserHome;
