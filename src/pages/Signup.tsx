import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, UserPlus } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const Signup = () => {
  const navigate = useNavigate();
  const { role } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding/profile-setup");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background px-6 max-w-[480px] mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="pt-6"
      >
        <button onClick={() => navigate("/login")} className="flex items-center gap-2 text-primary font-medium mb-8">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4">
          <UserPlus className="h-7 w-7 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Create Account</h1>
        <p className="text-muted-foreground text-sm">
          {role === "caregiver" ? "Sign up as a Caregiver" : "Sign up as a User"}
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSignup}
        className="flex flex-col gap-4"
      >
        <div>
          <Label htmlFor="name" className="text-foreground mb-1.5 block">Full Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-14 rounded-xl bg-card border-border text-base"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-foreground mb-1.5 block">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 rounded-xl bg-card border-border text-base"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-foreground mb-1.5 block">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 rounded-xl bg-card border-border text-base pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-14 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-base mt-4 shadow-elevated"
        >
          Create Account
        </Button>
      </motion.form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-muted-foreground mt-6"
      >
        Already have an account?{" "}
        <button onClick={() => navigate("/login")} className="text-primary font-semibold">
          Log In
        </button>
      </motion.p>
    </div>
  );
};

export default Signup;
