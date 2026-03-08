import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, MessageSquare, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: MessageSquare, title: "Communicate Easily", desc: "Express needs with simple taps" },
  { icon: Shield, title: "Stay Safe", desc: "Emergency alerts at your fingertips" },
  { icon: Activity, title: "Track Activity", desc: "Monitor movement and wellbeing" },
  { icon: Brain, title: "AI Powered", desc: "Smart analysis and predictions" },
];

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 max-w-[480px] mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8"
      >
        <div className="h-20 w-20 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-5">
          <Brain className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to NeuroSpeak</h1>
        <p className="text-muted-foreground text-sm">AI-powered assistive communication for everyone</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 w-full mb-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="rounded-xl bg-card p-4 shadow-card border border-border text-center"
          >
            <f.icon className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="font-medium text-card-foreground text-sm">{f.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm"
      >
        <Button
          onClick={() => navigate("/onboarding/permissions")}
          className="w-full h-14 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-base"
        >
          Get Started
        </Button>
        <button
          onClick={() => navigate("/role-select")}
          className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip setup
        </button>
      </motion.div>
    </div>
  );
};

export default Welcome;
