import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import logo from "@/assets/neurospeak-logo.png";
import { MessageSquare, Shield, Brain, Activity } from "lucide-react";

const highlights = [
  { icon: MessageSquare, text: "Express needs instantly" },
  { icon: Shield, text: "Emergency safety alerts" },
  { icon: Brain, text: "AI-powered insights" },
  { icon: Activity, text: "Health monitoring" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background max-w-[480px] mx-auto relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 left-0 right-0 h-[55%] bg-gradient-hero rounded-b-[3rem]" />

      {/* Hero section */}
      <div className="relative z-10 flex flex-col items-center pt-20 px-8">
        <motion.img
          src={logo}
          alt="NeuroSpeak Logo"
          className="h-20 w-20 mb-5 drop-shadow-lg"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
        />

        <motion.h1
          className="text-3xl font-extrabold tracking-tight text-primary-foreground mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          NeuroSpeak
        </motion.h1>

        <motion.p
          className="text-primary-foreground/80 text-base font-medium text-center mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          Voice Beyond Words
        </motion.p>

        <motion.p
          className="text-primary-foreground/60 text-sm text-center max-w-[280px] leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="flex items-center gap-3 rounded-xl bg-card/90 backdrop-blur-sm p-4 shadow-card border border-border"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-card-foreground leading-tight">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA button → goes to Role Selection */}
      <motion.div
        className="relative z-10 mt-auto px-8 pb-12 pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          onClick={() => navigate("/role-select")}
          className="w-full h-14 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-base shadow-elevated"
        >
          Get Started
        </Button>
      </motion.div>
    </div>
  );
};

export default Landing;
