import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, MessageSquare, Activity } from "lucide-react";

const healthCards = [
  {
    title: "Stress Risk",
    level: "Moderate",
    confidence: 78,
    color: "warning",
    reasons: ["Reduced communication frequency", "Increased alert triggers"],
    recommendation: "Encourage communication board usage and schedule a check-in",
  },
  {
    title: "Movement Pattern",
    level: "Normal",
    confidence: 92,
    color: "success",
    reasons: ["Consistent daily routine", "Regular activity levels"],
    recommendation: "Continue current monitoring schedule",
  },
  {
    title: "Communication Health",
    level: "Good",
    confidence: 85,
    color: "primary",
    reasons: ["14 messages today", "Using varied categories"],
    recommendation: "Consider introducing new custom phrases",
  },
];

const AIAnalysis = () => (
  <MobileLayout role="caregiver">
    <div className="px-5 pt-6">
      <h1 className="text-xl font-bold text-foreground mb-4">AI Analysis</h1>

      {/* Overall Risk Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-card p-5 shadow-card border border-border mb-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-6 w-6 text-primary" />
          <h2 className="font-semibold text-card-foreground">Overall Risk Assessment</h2>
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
              <span className="text-muted-foreground">Stress</span>
              <span className="font-medium text-warning">Moderate</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Communication</span>
              <span className="font-medium text-foreground">Active</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sleep</span>
              <span className="font-medium text-foreground">Stable</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Health Cards */}
      <div className="space-y-3 mb-4">
        {healthCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="rounded-xl bg-card p-5 shadow-card border border-border"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Brain className={`h-5 w-5 text-${card.color}`} />
                <h3 className="font-semibold text-card-foreground">{card.title}</h3>
              </div>
              <span className={`text-sm font-bold text-${card.color}`}>{card.level}</span>
            </div>

            {/* Confidence bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-medium text-foreground">{card.confidence}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`bg-${card.color} h-2 rounded-full transition-all`}
                  style={{ width: `${card.confidence}%` }}
                />
              </div>
            </div>

            {/* Reasons */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Factors</p>
              {card.reasons.map((reason) => (
                <p key={reason} className="text-xs text-muted-foreground flex items-center gap-1.5 py-0.5">
                  <span className="h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                  {reason}
                </p>
              ))}
            </div>

            {/* Recommendation */}
            <div className="rounded-lg bg-accent/50 p-3">
              <p className="text-xs font-semibold text-accent-foreground mb-0.5">Recommendation</p>
              <p className="text-xs text-muted-foreground">{card.recommendation}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Movement Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
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
        transition={{ delay: 0.6 }}
        className="space-y-3 mb-6"
      >
        <h2 className="font-semibold text-foreground">Alerts</h2>
        <div className="rounded-xl bg-warning/10 border border-warning/30 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-card-foreground text-sm">Reduced activity on weekends</p>
            <p className="text-xs text-muted-foreground mt-0.5">Weekend activity is 15% below average. Schedule a check-in.</p>
          </div>
        </div>
        <div className="rounded-xl bg-success/10 border border-success/30 p-4 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-card-foreground text-sm">Sleep pattern normal</p>
            <p className="text-xs text-muted-foreground mt-0.5">Consistent for the past 5 days. No action needed.</p>
          </div>
        </div>
      </motion.div>
    </div>
  </MobileLayout>
);

export default AIAnalysis;
