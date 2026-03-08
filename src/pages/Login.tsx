import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/neurospeak-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { role, setIsLoggedIn } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate(role === "caregiver" ? "/caregiver" : "/user");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 relative overflow-hidden max-w-[480px] mx-auto">
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-calm opacity-50" />

      <motion.button
        onClick={() => navigate("/role-select")}
        className="absolute top-6 left-6 p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground transition-colors z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft className="h-5 w-5" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="text-center mb-8">
          <motion.img
            src={logo}
            alt="NeuroSpeak"
            className="h-12 w-12 mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
          />
          <h1 className="text-2xl font-extrabold text-foreground mb-1 tracking-tight">Sign In</h1>
          <div className="inline-flex items-center gap-1.5 bg-secondary px-3 py-1 rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <p className="text-muted-foreground text-xs font-medium">
              {role === "caregiver" ? "Caregiver Account" : "User Account"}
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl bg-card border-border focus:border-primary focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl bg-card border-border focus:border-primary focus:ring-primary/20 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button type="button" className="text-sm text-primary font-medium w-full text-right">
            Forgot Password?
          </button>

          <Button type="submit" className="w-full h-12 rounded-xl bg-gradient-primary text-primary-foreground font-bold text-base shadow-glow hover:shadow-elevated transition-shadow">
            Log In
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="text-primary font-semibold hover:underline underline-offset-2">
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
