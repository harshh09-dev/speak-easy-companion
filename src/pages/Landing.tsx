import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import logo from "@/assets/neurospeak-logo.png";
import { MessageSquare, Shield, Brain, Activity, ArrowRight, Sparkles } from "lucide-react";
import { haptics } from "@/lib/haptics";

const highlights = [
  { icon: MessageSquare, text: "Express needs instantly", color: "text-primary" },
  { icon: Shield, text: "Emergency safety alerts", color: "text-destructive" },
  { icon: Brain, text: "AI-powered insights", color: "text-warning" },
  { icon: Activity, text: "Health monitoring", color: "text-success" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background max-w-[480px] mx-auto relative overflow-hidden">
      {/* Ambient background with animated gradient */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[55%] bg-gradient-hero rounded-b-[3rem]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-24 right-8 h-20 w-20 rounded-full bg-primary-foreground/5 blur-xl"
        animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 left-4 h-14 w-14 rounded-full bg-primary-foreground/8 blur-lg"
        animate={{ y: [0, 12, 0], x: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
      />

      {/* Hero section */}
      <div className="relative z-10 flex flex-col items-center pt-20 px-8">
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
        >
          {/* Logo glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary-foreground/15 blur-xl"
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <img
            src={logo}
            alt="NeuroSpeak Logo"
            className="h-20 w-20 mb-5 drop-shadow-lg relative z-10"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-2 mb-2"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-primary-foreground text-center">
            NeuroSpeak
          </h1>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 300 }}
        >
          <Sparkles className="h-3.5 w-3.5 text-primary-foreground/70" />
          <p className="text-primary-foreground/80 text-base font-medium text-center">
            Voice Beyond Words
          </p>
          <Sparkles className="h-3.5 w-3.5 text-primary-foreground/70" />
        </motion.div>

        <motion.p
          className="text-primary-foreground/60 text-sm text-center max-w-[280px] leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          AI-powered assistive communication that helps you express yourself effortlessly
        </motion.p>
      </div>

      {/* Feature highlights */}
      <div className="relative z-10 px-6 mt-12">
        <div className="grid grid-cols-2 gap-3">
          {highlights.map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.55 + i * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 rounded-xl bg-card/90 backdrop-blur-sm p-4 shadow-card border border-border cursor-default"
            >
              <motion.div
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </motion.div>
              <span className="text-xs font-medium text-card-foreground leading-tight">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        className="relative z-10 mt-auto px-8 pb-12 pt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => {
              haptics.medium();
              navigate("/role-select");
            }}
            className="w-full h-14 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-base shadow-elevated group relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-primary-foreground/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative flex items-center gap-2">
              Get Started
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;
