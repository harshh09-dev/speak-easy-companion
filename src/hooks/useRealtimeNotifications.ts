import { useEffect } from "react";
import { useNotifications } from "@/contexts/NotificationContext";

/**
 * Simulates real-time notifications by periodically adding new ones.
 * In production, this would connect to a websocket or push notification service.
 */
const useRealtimeNotifications = () => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    const scenarios = [
      { type: "health" as const, title: "Heart Rate Normal", body: "Heart rate returned to normal range (72 BPM)" },
      { type: "message" as const, title: "New Message from Dad", body: "Dad: 'Hope you're having a good day!'" },
      { type: "alert" as const, title: "Inactivity Detected", body: "No movement detected for 25 minutes" },
      { type: "system" as const, title: "AI Analysis Complete", body: "New behavioral insights are available" },
      { type: "health" as const, title: "Step Goal Progress", body: "You've reached 75% of your daily step goal" },
      { type: "message" as const, title: "Message from Sarah", body: "Sarah: 'Reminder: therapy session tomorrow at 10 AM'" },
    ];

    let index = 0;

    // Send first notification after 30 seconds, then every 45 seconds
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < scenarios.length) {
          addNotification(scenarios[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 45000);

      // Send first one
      addNotification(scenarios[index]);
      index++;

      return () => clearInterval(interval);
    }, 30000);

    return () => clearTimeout(timer);
  }, [addNotification]);
};

export default useRealtimeNotifications;
