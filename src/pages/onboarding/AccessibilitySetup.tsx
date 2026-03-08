import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Type, Moon, Eye } from "lucide-react";

const AccessibilitySetup = () => {
  const navigate = useNavigate();
  const { textSize, setTextSize, isDarkMode, toggleDarkMode, highContrast, setHighContrast } = useApp();

  return (
    <div className="flex min-h-screen flex-col bg-background px-6 pt-16 max-w-[480px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm text-primary font-medium mb-1">Step 2 of 3</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">Accessibility</h1>
        <p className="text-muted-foreground text-sm mb-8">Customize the app for your comfort</p>
      </motion.div>

      {/* Text Size */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl bg-card p-5 shadow-card border border-border mb-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Type className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-card-foreground">Text Size</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(["normal", "large", "extra-large"] as const).map((size) => (
            <button
              key={size}
              onClick={() => setTextSize(size)}
              className={`rounded-lg p-3 border text-center transition-all ${
                textSize === size
                  ? "bg-primary/10 border-primary text-primary font-semibold"
                  : "bg-muted border-border text-muted-foreground"
              }`}
            >
              <span className={size === "extra-large" ? "text-lg" : size === "large" ? "text-base" : "text-sm"}>
                {size === "extra-large" ? "XL" : size === "large" ? "L" : "M"}
              </span>
              <p className="text-[10px] mt-1 capitalize">{size.replace("-", " ")}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Dark Mode */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-card p-5 shadow-card border border-border mb-4"
      >
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-3 w-full"
        >
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isDarkMode ? "bg-primary" : "bg-muted"}`}>
            <Moon className={`h-5 w-5 ${isDarkMode ? "text-primary-foreground" : "text-muted-foreground"}`} />
          </div>
          <div className="text-left flex-1">
            <p className="font-semibold text-card-foreground">Dark Mode</p>
            <p className="text-xs text-muted-foreground">Easier on the eyes</p>
          </div>
          <div className={`w-12 h-7 rounded-full transition-colors ${isDarkMode ? "bg-primary" : "bg-muted"} relative`}>
            <div className={`absolute top-0.5 h-6 w-6 rounded-full bg-card shadow transition-transform ${isDarkMode ? "translate-x-5" : "translate-x-0.5"}`} />
          </div>
        </button>
      </motion.div>

      {/* High Contrast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl bg-card p-5 shadow-card border border-border mb-4"
      >
        <button
          onClick={() => setHighContrast(!highContrast)}
          className="flex items-center gap-3 w-full"
        >
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${highContrast ? "bg-primary" : "bg-muted"}`}>
            <Eye className={`h-5 w-5 ${highContrast ? "text-primary-foreground" : "text-muted-foreground"}`} />
          </div>
          <div className="text-left flex-1">
            <p className="font-semibold text-card-foreground">High Contrast</p>
            <p className="text-xs text-muted-foreground">Increase visibility</p>
          </div>
          <div className={`w-12 h-7 rounded-full transition-colors ${highContrast ? "bg-primary" : "bg-muted"} relative`}>
            <div className={`absolute top-0.5 h-6 w-6 rounded-full bg-card shadow transition-transform ${highContrast ? "translate-x-5" : "translate-x-0.5"}`} />
          </div>
        </button>
      </motion.div>

      <div className="mt-auto pb-8">
        <Button
          onClick={() => navigate("/onboarding/communication")}
          className="w-full h-14 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-base"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AccessibilitySetup;
