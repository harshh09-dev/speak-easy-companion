import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, MapPin, Mic, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const permissions = [
  { id: "notifications", icon: Bell, title: "Notifications", desc: "Get alerts from caregivers and emergency updates" },
  { id: "location", icon: MapPin, title: "Location", desc: "Share your location for safety monitoring" },
  { id: "microphone", icon: Mic, title: "Microphone", desc: "Enable voice output for communication" },
];

const Permissions = () => {
  const navigate = useNavigate();
  const [granted, setGranted] = useState<string[]>([]);

  const togglePermission = (id: string) => {
    setGranted((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background px-6 pt-16 max-w-[480px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm text-primary font-medium mb-1">Step 1 of 3</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">Permissions</h1>
        <p className="text-muted-foreground text-sm mb-8">
          NeuroSpeak needs a few permissions to keep you safe
        </p>
      </motion.div>

      <div className="flex flex-col gap-3 mb-8">
        {permissions.map((perm, i) => {
          const isGranted = granted.includes(perm.id);
          return (
            <motion.button
              key={perm.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => togglePermission(perm.id)}
              className={`flex items-center gap-4 rounded-xl p-5 border transition-all ${
                isGranted
                  ? "bg-primary/10 border-primary shadow-card"
                  : "bg-card border-border shadow-card"
              }`}
            >
              <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${
                isGranted ? "bg-primary" : "bg-muted"
              }`}>
                {isGranted ? (
                  <Check className="h-6 w-6 text-primary-foreground" />
                ) : (
                  <perm.icon className={`h-6 w-6 ${isGranted ? "text-primary-foreground" : "text-muted-foreground"}`} />
                )}
              </div>
              <div className="text-left">
                <p className="font-semibold text-card-foreground">{perm.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{perm.desc}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-auto pb-8">
        <Button
          onClick={() => navigate("/onboarding/accessibility")}
          className="w-full h-14 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-base"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Permissions;
