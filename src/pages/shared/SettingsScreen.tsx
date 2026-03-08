import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { Moon, Type, Eye, Bell, Globe, Brain, ChevronRight } from "lucide-react";

interface SettingsScreenProps {
  role: "user" | "caregiver";
}

const SettingsScreen = ({ role }: SettingsScreenProps) => {
  const { isDarkMode, toggleDarkMode, textSize, setTextSize, highContrast, setHighContrast } = useApp();

  return (
    <MobileLayout role={role}>
      <div className="px-5 pt-6 pb-6">
        <h1 className="text-xl font-bold text-foreground mb-5">Settings</h1>

        {/* Accessibility Section */}
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Accessibility</p>
        <div className="rounded-xl bg-card shadow-card border border-border overflow-hidden mb-5">
          {/* Dark Mode */}
          <button onClick={toggleDarkMode} className="flex items-center gap-3 p-4 w-full border-b border-border">
            <Moon className="h-5 w-5 text-primary" />
            <span className="flex-1 text-left font-medium text-card-foreground">Dark Mode</span>
            <div className={`w-11 h-6 rounded-full transition-colors ${isDarkMode ? "bg-primary" : "bg-muted"} relative`}>
              <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform ${isDarkMode ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
          </button>

          {/* Text Size */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3 mb-3">
              <Type className="h-5 w-5 text-primary" />
              <span className="font-medium text-card-foreground">Text Size</span>
            </div>
            <div className="flex gap-2">
              {(["normal", "large", "extra-large"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setTextSize(size)}
                  className={`flex-1 rounded-lg py-2 text-xs font-medium transition-all ${
                    textSize === size
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {size === "extra-large" ? "XL" : size === "large" ? "L" : "M"}
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast */}
          <button onClick={() => setHighContrast(!highContrast)} className="flex items-center gap-3 p-4 w-full">
            <Eye className="h-5 w-5 text-primary" />
            <span className="flex-1 text-left font-medium text-card-foreground">High Contrast</span>
            <div className={`w-11 h-6 rounded-full transition-colors ${highContrast ? "bg-primary" : "bg-muted"} relative`}>
              <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform ${highContrast ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
          </button>
        </div>

        {/* Preferences Section */}
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Preferences</p>
        <div className="rounded-xl bg-card shadow-card border border-border overflow-hidden mb-5">
          {[
            { icon: Bell, label: "Notifications", value: "Enabled" },
            { icon: Globe, label: "Language", value: "English" },
            { icon: Brain, label: "AI Sensitivity", value: "Medium" },
          ].map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`flex items-center gap-3 p-4 w-full ${i < 2 ? "border-b border-border" : ""}`}
            >
              <item.icon className="h-5 w-5 text-primary" />
              <span className="flex-1 text-left font-medium text-card-foreground">{item.label}</span>
              <span className="text-sm text-muted-foreground">{item.value}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default SettingsScreen;
