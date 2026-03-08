import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, LogIn } from "lucide-react";
import logo from "@/assets/neurospeak-logo.png";
import { haptics } from "@/lib/haptics";

const Login = () => {
  const navigate = useNavigate();
  const { role, setIsLoggedIn } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    haptics.success();
    setIsLoggedIn(true);
    navigate(role === "caregiver" ? "/caregiver" : "/user");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 relative overflow-hidden max-w-[480px] mx-auto">
      <motion.div
        className="absolute top-0 left-0 w-full h-48 bg-gradient-calm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 0.6 }}
      />

      <motion.button
        onClick={() => {
          haptics.light();
          navigate("/role-select");
        }}
        className="absolute top-6 left-6 p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground transition-colors z-10"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ x: -2 }}
      >
        <ArrowLeft className="h-5 w-5" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="text-center mb-8">
          <motion.img
            src={logo}
            alt="NeuroSpeak"
            className="h-12 w-12 mx-auto mb-4"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 15, delay: 0.15 }}
          />
          <motion.h1
            className="text-2xl font-extrabold text-foreground mb-1 tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            Sign In
          </motion.h1>
          <motion.div
            className="inline-flex items-center gap-1.5 bg-secondary px-3 py-1 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, type: "spring" }}
          >
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <p className="text-muted-foreground text-xs font-medium">
              {role === "caregiver" ? "Caregiver Account" : "User Account"}
            </p>
          </motion.div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl bg-card border-border focus:border-primary focus:ring-primary/20 transition-all duration-200"
            />
          </motion.div>
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.42 }}
          >
            <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl bg-card border-border focus:border-primary focus:ring-primary/20 pr-12 transition-all duration-200"
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                whileTap={{ scale: 0.85 }}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </motion.button>
            </div>
          </motion.div>

          <motion.button
            type="button"
            className="text-sm text-primary font-medium w-full text-right hover:underline underline-offset-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Forgot Password?
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, type: "spring" }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button type="submit" className="w-full h-12 rounded-xl bg-gradient-primary text-primary-foreground font-bold text-base shadow-glow hover:shadow-elevated transition-shadow group relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-primary-foreground/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Log In
              </span>
            </Button>
          </motion.div>
        </form>

        <motion.p
          className="text-center text-sm text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          Don't have an account?{" "}
          <button
            onClick={() => {
              haptics.light();
              navigate("/signup");
            }}
            className="text-primary font-semibold hover:underline underline-offset-2"
          >
            Sign Up
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
