import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Globe, Phone, UserCircle } from "lucide-react";

const languages = ["English", "Spanish", "French", "Hindi", "Arabic", "Chinese"];

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("Alex");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("English");

  return (
    <div className="flex min-h-screen flex-col bg-background px-6 pt-12 max-w-[480px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm text-primary font-medium mb-1">Profile Setup</p>
        <h1 className="text-2xl font-bold text-foreground mb-1">Set Up Your Profile</h1>
        <p className="text-muted-foreground text-sm mb-8">Tell us a little about yourself</p>
      </motion.div>

      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center mb-8"
      >
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gradient-primary flex items-center justify-center">
            <UserCircle className="h-14 w-14 text-primary-foreground" />
          </div>
          <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-card border-2 border-border flex items-center justify-center shadow-card">
            <Camera className="h-4 w-4 text-primary" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Tap to add photo</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-4"
      >
        <div>
          <Label className="text-foreground mb-1.5 block">Name</Label>
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-14 rounded-xl bg-card border-border text-base"
          />
        </div>

        <div>
          <Label className="text-foreground mb-1.5 block">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-14 rounded-xl bg-card border-border text-base pl-11"
            />
          </div>
        </div>

        <div>
          <Label className="text-foreground mb-1.5 block">Preferred Language</Label>
          <div className="grid grid-cols-3 gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-xl py-3 px-2 text-sm font-medium border transition-all ${
                  language === lang
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-card border-border text-muted-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="mt-auto pb-8 pt-6">
        <Button
          onClick={() => navigate("/onboarding/permissions")}
          className="w-full h-14 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-base"
        >
          Continue
        </Button>
        <button
          onClick={() => navigate("/onboarding/permissions")}
          className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;
