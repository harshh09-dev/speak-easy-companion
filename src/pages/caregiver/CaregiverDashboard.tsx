import { motion } from "framer-motion";
import MobileLayout from "@/components/MobileLayout";
import { useApp } from "@/contexts/AppContext";
import { ShieldCheck, TrendingDown, Activity, Users, BarChart3 } from "lucide-react";

const CaregiverDashboard = () => {
  const { userName } = useApp();

  return (
    <MobileLayout role="caregiver">
      <div className="px-5 pt-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-muted-foreground text-sm">Caregiver Dashboard</p>
          <h1 className="text-2xl font-bold text-foreground">Monitoring Alex</h1>
        </motion.div>

        {/* Patient Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-5 rounded-xl bg-gradient-primary p-5 text-primary-foreground shadow-elevated"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm opacity-90">Patient Status</p>
              <p className="text-xl font-bold">Active</p>
            </div>
            <ShieldCheck className="h-10 w-10 opacity-80" />
          </div>
          <div className="flex gap-4 text-sm">
            <div>
              <p className="opacity-80">Risk Level</p>
              <p className="font-semibold">Low</p>
            </div>
            <div>
              <p className="opacity-80">Last Activity</p>
              <p className="font-semibold">5 min ago</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          {[
            { label: "Movement", value: "82%", icon: Activity, trend: "+5%" },
            { label: "Alerts Today", value: "2", icon: BarChart3, trend: "Low" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="rounded-xl bg-card p-4 shadow-card border border-border"
            >
              <stat.icon className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-success font-medium mt-1">{stat.trend}</p>
            </motion.div>
          ))}
        </div>

        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-5 rounded-xl bg-card p-5 shadow-card border border-border mb-6"
        >
          <h2 className="font-semibold text-card-foreground mb-3">Activity Pattern (24h)</h2>
          <div className="flex gap-1 items-end h-24">
            {[30, 45, 60, 40, 70, 85, 65, 50, 90, 75, 55, 80, 60, 45, 70, 85, 50, 65, 40, 75, 90, 55, 70, 60].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-primary/50 hover:bg-primary transition-colors"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>Now</span>
          </div>
        </motion.div>

        {/* Quick Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl bg-warning/10 border border-warning/30 p-4 mb-6"
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-4 w-4 text-warning" />
            <p className="font-medium text-card-foreground text-sm">Insight</p>
          </div>
          <p className="text-sm text-muted-foreground">Activity decreased 12% compared to yesterday. Consider checking on the user.</p>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default CaregiverDashboard;
