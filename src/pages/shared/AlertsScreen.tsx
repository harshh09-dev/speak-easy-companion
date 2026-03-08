import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";
import { AlertTriangle, MessageSquare, Activity, Clock } from "lucide-react";

const alerts = [
  { id: 1, type: "emergency", text: "Emergency message sent", time: "2 min ago", icon: AlertTriangle },
  { id: 2, type: "movement", text: "Abnormal movement detected", time: "15 min ago", icon: Activity },
  { id: 3, type: "message", text: "New message from Caregiver", time: "1 hour ago", icon: MessageSquare },
  { id: 4, type: "inactive", text: "Inactive for 30 minutes", time: "3 hours ago", icon: Clock },
];

const alertColors: Record<string, string> = {
  emergency: "bg-destructive/10 border-destructive/30",
  movement: "bg-warning/10 border-warning/30",
  message: "bg-primary/10 border-primary/30",
  inactive: "bg-muted border-border",
};

const iconColors: Record<string, string> = {
  emergency: "text-destructive",
  movement: "text-warning",
  message: "text-primary",
  inactive: "text-muted-foreground",
};

interface AlertsScreenProps {
  role: "user" | "caregiver";
}

const AlertsScreen = ({ role }: AlertsScreenProps) => (
  <MobileLayout role={role}>
    <div className="px-5 pt-6">
      <h1 className="text-xl font-bold text-foreground mb-4">Alerts</h1>
      <div className="flex flex-col gap-3">
        {alerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-xl p-4 border ${alertColors[alert.type]} flex items-start gap-3`}
          >
            <alert.icon className={`h-5 w-5 mt-0.5 shrink-0 ${iconColors[alert.type]}`} />
            <div className="flex-1">
              <p className="font-medium text-card-foreground text-sm">{alert.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{alert.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </MobileLayout>
);

export default AlertsScreen;
