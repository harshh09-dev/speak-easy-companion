import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowLeft, MapPin, Phone, Heart } from "lucide-react";
import { haptics } from "@/lib/haptics";

const EmergencyScreen = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"alerting" | "breathing">("alerting");
  const [breathPhase, setBreathPhase] = useState<"inhale" | "exhale">("inhale");

  useEffect(() => {
    haptics.emergency();
    const timer = setTimeout(() => setPhase("breathing"), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "breathing") {
      const interval = setInterval(() => {
        setBreathPhase((prev) => (prev === "inhale" ? "exhale" : "inhale"));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-danger px-6 max-w-[480px] mx-auto relative">
      <AnimatePresence mode="wait">
        {phase === "alerting" ? (
          <motion.div
            key="alerting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-24 w-24 rounded-full bg-destructive-foreground/20 flex items-center justify-center mx-auto mb-6"
            >
              <AlertTriangle className="h-14 w-14 text-destructive-foreground" />
            </motion.div>
            <h1 className="text-3xl font-bold text-destructive-foreground mb-4">
              Emergency Alert Sent
            </h1>

            <div className="space-y-3 mb-8">
              {[
                { icon: Phone, text: "Calling Caregiver...", delay: 0.5 },
                { icon: MapPin, text: "Sending Location...", delay: 1.0 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: item.delay }}
                  className="flex items-center gap-3 bg-destructive-foreground/10 rounded-xl px-5 py-3"
                >
                  <item.icon className="h-5 w-5 text-destructive-foreground" />
                  <span className="text-destructive-foreground font-medium">{item.text}</span>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="ml-auto h-4 w-4 border-2 border-destructive-foreground/40 border-t-destructive-foreground rounded-full"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="breathing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.div className="flex items-center gap-2 bg-destructive-foreground/10 rounded-full px-4 py-2 mx-auto w-fit mb-8">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-destructive-foreground font-medium">Caregiver notified</span>
            </motion.div>

            <h2 className="text-xl font-bold text-destructive-foreground mb-6">
              Stay calm. Help is coming.
            </h2>

            <div className="mb-8">
              <motion.div
                animate={{
                  scale: breathPhase === "inhale" ? [1, 1.4] : [1.4, 1],
                }}
                transition={{ duration: 4.5, ease: "easeInOut" }}
                className="h-32 w-32 rounded-full bg-destructive-foreground/20 flex items-center justify-center mx-auto mb-4"
              >
                <Heart className="h-12 w-12 text-destructive-foreground" />
              </motion.div>
              <motion.p
                key={breathPhase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold text-destructive-foreground"
              >
                {breathPhase === "inhale" ? "Breathe In..." : "Breathe Out..."}
              </motion.p>
              <p className="text-destructive-foreground/70 text-sm mt-1">
                {breathPhase === "inhale" ? "4 seconds" : "6 seconds"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          haptics.light();
          navigate(-1);
        }}
        className="absolute bottom-10 flex items-center gap-2 rounded-xl bg-destructive-foreground/20 px-6 py-3 text-destructive-foreground font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Go Back
      </motion.button>
    </div>
  );
};

export default EmergencyScreen;
