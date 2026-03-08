import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import logo from "@/assets/neurospeak-logo.png";

const SplashScreen = () => {
  const navigate = useNavigate();
  const { onboardingComplete } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(onboardingComplete ? "/role-select" : "/onboarding/welcome");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate, onboardingComplete]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-hero">
      <motion.img
        src={logo}
        alt="NeuroSpeak Logo"
        className="h-28 w-28 mb-6"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
      />
      <motion.h1
        className="text-3xl font-bold text-primary-foreground mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        NeuroSpeak
      </motion.h1>
      <motion.p
        className="text-primary-foreground/80 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        AI Assistive Communication
      </motion.p>
    </div>
  );
};

export default SplashScreen;
