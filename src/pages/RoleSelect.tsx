import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { User, Shield, Brain } from "lucide-react";
import logo from "@/assets/neurospeak-logo.png";

const roles = [
  {
    id: "user" as const,
    title: "I need to communicate",
    desc: "Express needs and feelings with easy-to-use tools",
    icon: User,
  },
  {
    id: "caregiver" as const,
    title: "I am a Caregiver",
    desc: "Monitor wellbeing and get AI-powered insights",
    icon: Shield,
  },
];

const RoleSelect = () => {
  const navigate = useNavigate();
  const { setRole } = useApp();

  const handleSelect = (role: "user" | "caregiver") => {
    setRole(role);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-calm opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 relative z-10"
      >
        <motion.img
          src={logo}
          alt="NeuroSpeak"
          className="h-14 w-14 mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
        />
        <h1 className="text-2xl font-extrabold text-foreground mb-1.5 tracking-tight">
          Choose Your Role
        </h1>
        <p className="text-muted-foreground text-sm">How will you be using NeuroSpeak?</p>
      </motion.div>

      <div className="flex flex-col gap-4 w-full max-w-sm relative z-10">
        {roles.map((role, i) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.12 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(role.id)}
            className="flex items-center gap-5 rounded-2xl bg-card p-6 shadow-card border border-border hover:border-primary/50 hover:shadow-elevated transition-all duration-300 text-left group"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-glow group-hover:scale-105 transition-transform duration-300">
              <role.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-card-foreground text-base">{role.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{role.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 flex items-center gap-1.5 text-muted-foreground"
      >
        <Brain className="h-3.5 w-3.5" />
        <span className="text-xs font-medium">Powered by AI</span>
      </motion.div>
    </div>
  );
};

export default RoleSelect;
