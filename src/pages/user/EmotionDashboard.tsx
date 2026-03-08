import { motion } from "framer-motion";
import MobileLayout from "@/components/MobileLayout";
import { Brain, Activity, MessageSquare, AlertTriangle, TrendingDown, TrendingUp, Heart, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const behavioralSignals = [
  { label: "Message Frequency", value: "14 today", trend: "up", icon: MessageSquare },
  { label: "Interaction Delay", value: "2.3s avg", trend: "normal", icon: Clock },
  { label: "Alert Triggers", value: "1 today", trend: "normal", icon: AlertTriangle },
  { label: "Category Usage", value: "4 of 6", trend: "up", icon: Activity },
];

const EmotionDashboard = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout role="caregiver">
      <div className="px-5 pt-6 pb-6">
        <h1 className="text-xl font-bold text-foreground mb-1">Emotion Detection</h1>
        <p className="text-muted-foreground text-sm mb-5">AI behavioral analysis</p>

        {/* Current Emotional State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-card p-5 shadow-card border border-border mb-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-14 w-14 rounded-full bg-warning/20 flex items-center justify-center">
              <Brain className="h-7 w-7 text-warning" />
            </div>
            <div>
              <p className="font-bold text-card-foreground text-lg">Mild Stress</p>
              <p className="text-sm text-muted-foreground">Detected from interaction patterns</p>
            </div>
          </div>

          {/* Stress level meter */}
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Stress Level</span>
              <span className="font-medium text-warning">42%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "42%" }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-warning h-3 rounded-full"
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>Calm</span>
              <span>Moderate</span>
              <span>High</span>
            </div>
          </div>
        </motion.div>

        {/* Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl bg-warning/10 border border-warning/30 p-4 mb-5"
        >
          <p className="text-sm font-semibold text-card-foreground mb-2">Key Indicators</p>
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <TrendingDown className="h-3 w-3 text-warning" /> Decreased communication since 2 PM
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-3 w-3 text-warning" /> Increased alert frequency
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <Clock className="h-3 w-3 text-warning" /> Longer interaction delays
            </p>
          </div>
        </motion.div>

        {/* Behavioral Signals Grid */}
        <h2 className="font-semibold text-foreground mb-3">Behavioral Signals</h2>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {behavioralSignals.map((signal, i) => (
            <motion.div
              key={signal.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="rounded-xl bg-card p-4 shadow-card border border-border"
            >
              <signal.icon className="h-4 w-4 text-primary mb-2" />
              <p className="text-lg font-bold text-foreground">{signal.value}</p>
              <p className="text-[10px] text-muted-foreground">{signal.label}</p>
              <div className="flex items-center gap-1 mt-1">
                {signal.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : (
                  <Activity className="h-3 w-3 text-muted-foreground" />
                )}
                <span className="text-[10px] text-muted-foreground capitalize">{signal.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emotion Timeline */}
        <h2 className="font-semibold text-foreground mb-3">Today's Emotional Pattern</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-xl bg-card p-5 shadow-card border border-border mb-5"
        >
          <div className="flex gap-1 items-end h-20 mb-2">
            {[
              { hour: "6", stress: 15, emoji: "😊" },
              { hour: "8", stress: 20, emoji: "😊" },
              { hour: "10", stress: 25, emoji: "🙂" },
              { hour: "12", stress: 30, emoji: "🙂" },
              { hour: "14", stress: 45, emoji: "😐" },
              { hour: "16", stress: 55, emoji: "😟" },
              { hour: "18", stress: 42, emoji: "😐" },
              { hour: "Now", stress: 42, emoji: "😐" },
            ].map((d) => (
              <div key={d.hour} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs">{d.emoji}</span>
                <div
                  className={`w-full rounded-t-md transition-colors ${
                    d.stress > 50 ? "bg-destructive/60" : d.stress > 35 ? "bg-warning/60" : "bg-success/60"
                  }`}
                  style={{ height: `${d.stress}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{d.hour}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <h2 className="font-semibold text-foreground mb-3">AI Recommendations</h2>
        <div className="space-y-3 mb-6">
          {[
            { text: "Encourage communication board usage", icon: MessageSquare, priority: "High" },
            { text: "Schedule a caregiver check-in", icon: Heart, priority: "Medium" },
            { text: "Consider calming activities", icon: Activity, priority: "Medium" },
          ].map((rec, i) => (
            <motion.div
              key={rec.text}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="rounded-xl bg-card p-4 shadow-card border border-border flex items-center gap-3"
            >
              <rec.icon className="h-5 w-5 text-primary shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{rec.text}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                rec.priority === "High" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
              }`}>{rec.priority}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default EmotionDashboard;
