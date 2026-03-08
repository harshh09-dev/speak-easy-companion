import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { User, Shield } from "lucide-react";

const roles = [
  {
    id: "user" as const,
    title: "I am a User",
    desc: "Need communication help",
    icon: User,
  },
  {
    id: "caregiver" as const,
    title: "I am a Caregiver",
    desc: "Monitoring someone",
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to NeuroSpeak</h1>
        <p className="text-muted-foreground">How will you be using the app?</p>
      </motion.div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        {roles.map((role, i) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            onClick={() => handleSelect(role.id)}
            className="flex items-center gap-5 rounded-lg bg-card p-6 shadow-card border border-border hover:border-primary hover:shadow-elevated transition-all duration-200 text-left"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-primary">
              <role.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-card-foreground text-lg">{role.title}</p>
              <p className="text-sm text-muted-foreground">{role.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelect;
