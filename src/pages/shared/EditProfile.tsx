import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileLayout from "@/components/MobileLayout";
import { ArrowLeft, Camera, Save, User, Mail, Phone, Globe, Shield } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

interface EditProfileProps {
  role: "user" | "caregiver";
}

const EditProfile = ({ role }: EditProfileProps) => {
  const navigate = useNavigate();
  const { userName, textSize, setTextSize, highContrast, setHighContrast } = useApp();
  const { toast } = useToast();

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState("alex@neurospeak.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [language, setLanguage] = useState("English");
  const [speechSpeed, setSpeechSpeed] = useState<"slow" | "normal" | "fast">("normal");

  const handleSave = () => {
    toast({ title: "Profile Updated", description: "Your changes have been saved." });
    navigate(-1);
  };

  return (
    <MobileLayout role={role}>
      <div className="px-5 pt-6 pb-6">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate(-1)} className="text-primary">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Edit Profile</h1>
        </div>

        {/* Avatar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-foreground">{name[0]}</span>
            </div>
            <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center shadow-card">
              <Camera className="h-4 w-4 text-primary" />
            </button>
          </div>
        </motion.div>

        {/* Personal Info */}
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Personal Information</p>
        <div className="rounded-xl bg-card shadow-card border border-border overflow-hidden mb-5">
          {[
            { icon: User, label: "Name", value: name, setter: setName },
            { icon: Mail, label: "Email", value: email, setter: setEmail },
            { icon: Phone, label: "Phone", value: phone, setter: setPhone },
          ].map((field, i) => (
            <div key={field.label} className={`p-4 ${i < 2 ? "border-b border-border" : ""}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <field.icon className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">{field.label}</span>
              </div>
              <input
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
              />
            </div>
          ))}
        </div>

        {/* Communication Preferences */}
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Communication</p>
        <div className="rounded-xl bg-card shadow-card border border-border overflow-hidden mb-5">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Language</span>
            </div>
            <div className="flex gap-2">
              {["English", "Spanish", "French"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`flex-1 rounded-lg py-2 text-xs font-medium transition-all ${
                    language === lang ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {role === "user" && (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Speech Speed</span>
              </div>
              <div className="flex gap-2">
                {(["slow", "normal", "fast"] as const).map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setSpeechSpeed(speed)}
                    className={`flex-1 rounded-lg py-2 text-xs font-medium capitalize transition-all ${
                      speechSpeed === speed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Accessibility */}
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Accessibility</p>
        <div className="rounded-xl bg-card shadow-card border border-border overflow-hidden mb-6">
          <div className="p-4 border-b border-border">
            <span className="text-xs text-muted-foreground">Text Size</span>
            <div className="flex gap-2 mt-2">
              {(["normal", "large", "extra-large"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setTextSize(size)}
                  className={`flex-1 rounded-lg py-2 text-xs font-medium transition-all ${
                    textSize === size ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {size === "extra-large" ? "XL" : size === "large" ? "L" : "M"}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setHighContrast(!highContrast)}
            className="flex items-center gap-3 p-4 w-full"
          >
            <span className="flex-1 text-left text-sm font-medium text-card-foreground">High Contrast</span>
            <div className={`w-11 h-6 rounded-full transition-colors ${highContrast ? "bg-primary" : "bg-muted"} relative`}>
              <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform ${highContrast ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
          </button>
        </div>

        <button onClick={handleSave} className="w-full rounded-xl bg-gradient-primary p-4 text-primary-foreground font-semibold flex items-center justify-center gap-2">
          <Save className="h-5 w-5" />
          Save Changes
        </button>
      </div>
    </MobileLayout>
  );
};

export default EditProfile;
