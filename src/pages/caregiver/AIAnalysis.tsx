import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const AIAnalysis = () => (
  <MobileLayout role="caregiver">
    <div className="px-5 pt-6">
      <h1 className="text-xl font-bold text-foreground mb-4">AI Analysis</h1>

      {/* Risk Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-card p-5 shadow-card border border-border mb-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-6 w-6 text-primary" />
          <h2 className="font-semibold text-card-foreground">Risk Assessment</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative h-24 w-24">
            <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--success))" strokeWidth="8" strokeDasharray={`${0.18 * 264} 264`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-success">Low</span>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Movement</span>
              <span className="font-medium text-foreground">Normal</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Activity</span>
              <span className="font-medium text-foreground">Active</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pattern</span>
              <span className="font-medium text-foreground">Stable</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Movement Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-xl bg-card p-5 shadow-card border border-border mb-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-card-foreground">Movement Pattern (7 days)</h2>
        </div>
        <div className="flex gap-2 items-end h-28">
          {[
            { day: "Mon", val: 72 },
            { day: "Tue", val: 85 },
            { day: "Wed", val: 68 },
            { day: "Thu", val: 90 },
            { day: "Fri", val: 75 },
            { day: "Sat", val: 60 },
            { day: "Sun", val: 82 },
          ].map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md bg-primary/60 hover:bg-primary transition-colors" style={{ height: `${d.val}%` }} />
              <span className="text-[10px] text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3 mb-6"
      >
        <h2 className="font-semibold text-foreground">AI Recommendations</h2>
        <div className="rounded-xl bg-warning/10 border border-warning/30 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-card-foreground text-sm">Reduced activity detected</p>
            <p className="text-xs text-muted-foreground mt-0.5">Weekend activity is 15% below average. Consider checking on user.</p>
          </div>
        </div>
        <div className="rounded-xl bg-success/10 border border-success/30 p-4 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-card-foreground text-sm">Sleep pattern normal</p>
            <p className="text-xs text-muted-foreground mt-0.5">User's sleep schedule has been consistent for the past 5 days.</p>
          </div>
        </div>
      </motion.div>
    </div>
  </MobileLayout>
);

export default AIAnalysis;
