import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";
import { ArrowLeft, MessageSquare, AlertTriangle, Activity, Brain, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const timelineEvents = [
  { time: "8:00 AM", icon: MessageSquare, text: "Communication board used", detail: "Said 'I am hungry'", type: "communication" },
  { time: "9:15 AM", icon: Activity, text: "High activity detected", detail: "Movement score: 92%", type: "activity" },
  { time: "10:30 AM", icon: Brain, text: "AI analysis complete", detail: "Risk level: Low", type: "ai" },
  { time: "11:45 AM", icon: MessageSquare, text: "Quick message sent", detail: "Said 'I need water'", type: "communication" },
  { time: "12:15 PM", icon: AlertTriangle, text: "Stress indicator detected", detail: "Elevated from baseline", type: "alert" },
  { time: "1:00 PM", icon: Activity, text: "Activity decreased", detail: "Movement score: 45%", type: "activity" },
  { time: "2:30 PM", icon: Moon, text: "Rest period started", detail: "Inactive for 20 minutes", type: "rest" },
  { time: "3:00 PM", icon: MessageSquare, text: "Emergency button pressed", detail: "Caregiver notified", type: "emergency" },
];

const typeColors: Record<string, string> = {
  communication: "bg-primary/10 text-primary border-primary/30",
  activity: "bg-success/10 text-success border-success/30",
  ai: "bg-accent text-accent-foreground border-border",
  alert: "bg-warning/10 text-warning border-warning/30",
  rest: "bg-muted text-muted-foreground border-border",
  emergency: "bg-destructive/10 text-destructive border-destructive/30",
};

const dotColors: Record<string, string> = {
  communication: "bg-primary",
  activity: "bg-success",
  ai: "bg-accent-foreground",
  alert: "bg-warning",
  rest: "bg-muted-foreground",
  emergency: "bg-destructive",
};

interface ActivityTimelineProps {
  role: "user" | "caregiver";
}

const ActivityTimeline = ({ role }: ActivityTimelineProps) => {
  const navigate = useNavigate();

  return (
    <MobileLayout role={role}>
      <div className="px-5 pt-6 pb-6">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate(-1)} className="text-primary">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Activity Timeline</h1>
        </div>

        <p className="text-sm text-muted-foreground mb-6">Today's activity log</p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border" />

          <div className="space-y-4">
            {timelineEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-4 relative"
              >
                {/* Dot */}
                <div className={`h-[10px] w-[10px] rounded-full ${dotColors[event.type]} mt-2 z-10 shrink-0 ring-2 ring-background ml-[10px]`} />

                {/* Content */}
                <div className={`flex-1 rounded-xl p-4 border ${typeColors[event.type]}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <event.icon className="h-4 w-4" />
                    <span className="text-xs font-semibold">{event.time}</span>
                  </div>
                  <p className="font-medium text-card-foreground text-sm">{event.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ActivityTimeline;
