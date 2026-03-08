import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "@/contexts/NotificationContext";
import { Bell, AlertTriangle, MessageSquare, Heart, Activity, X } from "lucide-react";

const iconMap: Record<string, typeof Bell> = {
  emergency: AlertTriangle,
  message: MessageSquare,
  alert: Activity,
  health: Heart,
  system: Bell,
};

const colorMap: Record<string, string> = {
  emergency: "bg-destructive text-destructive-foreground",
  message: "bg-primary text-primary-foreground",
  alert: "bg-warning text-warning-foreground",
  health: "bg-destructive text-destructive-foreground",
  system: "bg-muted text-foreground",
};

const NotificationToast = () => {
  const { notifications, markAsRead } = useNotifications();
  const prevCountRef = useRef(notifications.length);
  const latestUnread = notifications.find((n) => !n.read && n.time === "Just now");

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    if (latestUnread) {
      const timer = setTimeout(() => markAsRead(latestUnread.id), 4000);
      return () => clearTimeout(timer);
    }
  }, [latestUnread?.id]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-[460px] px-4 z-[80] pointer-events-none">
      <AnimatePresence>
        {latestUnread && (
          <motion.div
            key={latestUnread.id}
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="pointer-events-auto"
          >
            <div className="rounded-2xl bg-card shadow-elevated border border-border p-4 flex items-start gap-3 backdrop-blur-xl">
              <div className={`h-10 w-10 rounded-full ${colorMap[latestUnread.type]} flex items-center justify-center shrink-0`}>
                {(() => {
                  const Icon = iconMap[latestUnread.type];
                  return <Icon className="h-5 w-5" />;
                })()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-card-foreground">{latestUnread.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{latestUnread.body}</p>
              </div>
              <button
                onClick={() => markAsRead(latestUnread.id)}
                className="h-7 w-7 rounded-full bg-muted flex items-center justify-center shrink-0 hover:bg-muted-foreground/20 transition-colors"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast;
