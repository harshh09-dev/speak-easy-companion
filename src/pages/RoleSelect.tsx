import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { User, Shield, Brain, ChevronRight } from "lucide-react";
import logo from "@/assets/neurospeak-logo.png";
import { haptics } from "@/lib/haptics";

const roles = [
  {
    id: "user" as const,
    title: "I need to communicate",
    desc: "Express needs and feelings with easy-to-use tools",
    icon: User,
    gradient: "from-primary to-primary-glow",
  },
  {
    id: "caregiver" as const,
    title: "I am a Caregiver",
    desc: "Monitor wellbeing and get AI-powered insights",
    icon: Shield,
    gradient: "from-success to-primary",
  },
];

const RoleSelect = () => {
  const navigate = useNavigate();
  const { setRole } = useApp();

  const handleSelect = (role: "user" | "caregiver") => {
    haptics.medium();
    setRole(role);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-0 left-0 w-full h-64 bg-gradient-calm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute top-20 -right-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-center mb-10 relative z-10"
      >
        <motion.img
          src={logo}
          alt="NeuroSpeak"
          className="h-14 w-14 mx-auto mb-4"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 15, delay: 0.1 }}
        />
        <motion.h1
          className="text-2xl font-extrabold text-foreground mb-1.5 tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Choose Your Role
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          How will you be using NeuroSpeak?
        </motion.p>
      </motion.div>

      <div className="flex flex-col gap-4 w-full max-w-sm relative z-10">
        {roles.map((role, i) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 200, damping: 20 }}
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -2 }}
            onClick={() => handleSelect(role.id)}
            className="flex items-center gap-5 rounded-2xl bg-card p-6 shadow-card border border-border hover:border-primary/50 hover:shadow-elevated transition-all duration-300 text-left group"
          >
            <motion.div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-glow"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <role.icon className="h-7 w-7 text-primary-foreground" />
            </motion.div>
            <div className="flex-1">
              <p className="font-bold text-card-foreground text-base">{role.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{role.desc}</p>
            </div>
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <ChevronRight className="h-5 w-5 text-primary" />
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Footer badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-8 flex items-center gap-1.5 text-muted-foreground"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        >
          <Brain className="h-3.5 w-3.5" />
        </motion.div>
        <span className="text-xs font-medium">Powered by AI</span>
      </motion.div>
    </div>
  );
};

export default RoleSelect;
