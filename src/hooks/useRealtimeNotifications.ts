import { useEffect } from "react";
import { useNotifications } from "@/contexts/NotificationContext";

/**
 * Simulates real-time notifications synced across both roles.
 */
const useRealtimeNotifications = () => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    const scenarios: { type: "health" | "message" | "alert" | "system" | "emergency"; title: string; body: string; roles: ("user" | "caregiver")[] }[] = [
      { type: "health", title: "Heart Rate Normal", body: "Heart rate returned to normal range (72 BPM)", roles: ["user", "caregiver"] },
      { type: "message", title: "New Message from Dad", body: "Dad: 'Hope you're having a good day!'", roles: ["user"] },
      { type: "alert", title: "Inactivity Detected", body: "No movement detected for 25 minutes", roles: ["caregiver"] },
      { type: "system", title: "AI Analysis Complete", body: "New behavioral insights are available", roles: ["user", "caregiver"] },
      { type: "health", title: "Step Goal Progress", body: "You've reached 75% of your daily step goal", roles: ["user"] },
      { type: "alert", title: "Stress Pattern Detected", body: "AI detected recurring stress pattern in afternoon hours", roles: ["caregiver"] },
      { type: "message", title: "Message from Sarah", body: "Sarah: 'Reminder: therapy session tomorrow at 10 AM'", roles: ["user", "caregiver"] },
      { type: "emergency", title: "Fall Detected", body: "Wearable detected a possible fall event", roles: ["user", "caregiver"] },
    ];

    let index = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < scenarios.length) {
          addNotification(scenarios[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 40000);

      addNotification(scenarios[index]);
      index++;

      return () => clearInterval(interval);
    }, 25000);

    return () => clearTimeout(timer);
  }, [addNotification]);
};

export default useRealtimeNotifications;
