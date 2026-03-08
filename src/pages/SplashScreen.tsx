import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import logo from "@/assets/neurospeak-logo.png";

const SplashScreen = () => {
  const navigate = useNavigate();
  const { onboardingComplete } = useApp();
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTagline(true), 1200);
    const t2 = setTimeout(() => {
      navigate(onboardingComplete ? "/role-select" : "/onboarding/welcome");
    }, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [navigate, onboardingComplete]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Ambient rings */}
      <motion.div
        className="absolute h-[500px] w-[500px] rounded-full border border-primary-foreground/5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute h-[700px] w-[700px] rounded-full border border-primary-foreground/[0.03]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
      />

      {/* Logo container with glow */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Glow behind logo */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-primary-foreground/10 blur-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1.2] }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <motion.img
          src={logo}
          alt="NeuroSpeak Logo"
          className="h-24 w-24 mb-5 relative z-10 drop-shadow-lg"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        />

        <motion.h1
          className="text-3xl font-extrabold tracking-tight text-primary-foreground mb-1.5 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          NeuroSpeak
        </motion.h1>

        <motion.div
          className="h-0.5 w-12 bg-primary-foreground/30 rounded-full mb-3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />

        <motion.p
          className="text-primary-foreground/75 text-sm font-medium tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showTagline ? 1 : 0, y: showTagline ? 0 : 10 }}
          transition={{ duration: 0.5 }}
        >
          AI-Powered Assistive Communication
        </motion.p>
      </motion.div>

      {/* Loading dots */}
      <motion.div
        className="absolute bottom-16 flex gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-primary-foreground/50"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SplashScreen;
