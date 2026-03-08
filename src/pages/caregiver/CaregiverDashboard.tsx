import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { useApp } from "@/contexts/AppContext";
import { ShieldCheck, TrendingDown, Activity, MessageSquare, AlertTriangle, Clock, Brain, ChevronRight } from "lucide-react";

const CaregiverDashboard = () => {
  const { userName } = useApp();
  const navigate = useNavigate();

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
              <p className="text-xl font-bold">● Calm & Active</p>
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
            <div>
              <p className="opacity-80">Response</p>
              <p className="font-semibold">2 min avg</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { label: "Messages", value: "14", icon: MessageSquare, color: "text-primary" },
            { label: "Alerts", value: "1", icon: AlertTriangle, color: "text-warning" },
            { label: "Stress", value: "Low", icon: Brain, color: "text-success" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="rounded-xl bg-card p-4 shadow-card border border-border text-center"
            >
              <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-1`} />
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Communication Frequency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-5 rounded-xl bg-card p-5 shadow-card border border-border"
        >
          <h2 className="font-semibold text-card-foreground mb-3">Communication Today</h2>
          <div className="flex gap-1 items-end h-20">
            {[2, 5, 3, 8, 4, 6, 1, 7, 3, 5, 9, 4, 6, 2, 8, 5, 3, 7, 4, 6, 5, 3, 7, 2].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-primary/50 hover:bg-primary transition-colors"
                style={{ height: `${h * 10}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>Now</span>
          </div>
        </motion.div>

        {/* Mood Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-4 rounded-xl bg-card p-5 shadow-card border border-border"
        >
          <h2 className="font-semibold text-card-foreground mb-3">Mood Trend (7 days)</h2>
          <div className="flex gap-2 items-end h-16">
            {[
              { day: "Mon", mood: 80, emoji: "😊" },
              { day: "Tue", mood: 70, emoji: "🙂" },
              { day: "Wed", mood: 90, emoji: "😄" },
              { day: "Thu", mood: 60, emoji: "😐" },
              { day: "Fri", mood: 75, emoji: "🙂" },
              { day: "Sat", mood: 50, emoji: "😟" },
              { day: "Sun", mood: 85, emoji: "😊" },
            ].map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-sm">{d.emoji}</span>
                <div className="w-full rounded-t-md bg-success/50 hover:bg-success transition-colors" style={{ height: `${d.mood}%` }} />
                <span className="text-[10px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 rounded-xl bg-warning/10 border border-warning/30 p-4 mb-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-4 w-4 text-warning" />
            <p className="font-medium text-card-foreground text-sm">Insight</p>
          </div>
          <p className="text-sm text-muted-foreground">Activity decreased 12% compared to yesterday. Consider checking in.</p>
        </motion.div>

        {/* Activity Timeline Link */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          onClick={() => navigate("/caregiver/timeline")}
          className="w-full rounded-xl bg-card p-4 shadow-card border border-border flex items-center gap-3 mb-6"
        >
          <Clock className="h-5 w-5 text-primary" />
          <span className="flex-1 text-left font-medium text-card-foreground">View Activity Timeline</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </motion.button>
      </div>
    </MobileLayout>
  );
};

export default CaregiverDashboard;
