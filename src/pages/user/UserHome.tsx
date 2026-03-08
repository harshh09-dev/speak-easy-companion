import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import MobileLayout from "@/components/MobileLayout";
import { Hand, Droplets, UtensilsCrossed, Moon, AlertTriangle, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickActions = [
  { label: "I Need Help", icon: Hand, color: "bg-destructive" },
  { label: "I Am Hungry", icon: UtensilsCrossed, color: "bg-warning" },
  { label: "I Need Water", icon: Droplets, color: "bg-primary" },
  { label: "I Am Tired", icon: Moon, color: "bg-accent" },
  { label: "I Am In Pain", icon: AlertTriangle, color: "bg-destructive" },
];

const UserHome = () => {
  const { userName } = useApp();
  const navigate = useNavigate();

  return (
    <MobileLayout role="user">
      <div className="px-5 pt-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-muted-foreground text-sm">Good morning</p>
          <h1 className="text-2xl font-bold text-foreground">Hello, {userName} 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">How can we help today?</p>
        </motion.div>

        {/* Emergency Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate("/emergency")}
          className="mt-5 w-full rounded-xl bg-gradient-danger p-5 text-destructive-foreground text-center shadow-elevated"
        >
          <AlertTriangle className="h-8 w-8 mx-auto mb-1" />
          <p className="font-bold text-lg">EMERGENCY</p>
          <p className="text-sm opacity-90">Tap to alert caregiver</p>
        </motion.button>

        {/* Quick Communication */}
        <h2 className="text-lg font-semibold text-foreground mt-7 mb-3">Quick Communicate</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="flex flex-col items-center gap-2 rounded-xl bg-card p-5 shadow-card border border-border hover:shadow-elevated transition-shadow"
            >
              <div className={`h-12 w-12 rounded-full ${action.color} flex items-center justify-center`}>
                <action.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-card-foreground">{action.label}</span>
            </motion.button>
          ))}
        </div>

        {/* AI Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 rounded-xl bg-card p-5 shadow-card border border-border mb-6"
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
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-primary/60"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default UserHome;
