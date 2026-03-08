import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Droplets, Moon, Heart, Bath, Smile, Plus, Check } from "lucide-react";

const defaultPhrases = [
  { id: "food", icon: UtensilsCrossed, label: "Food & Meals" },
  { id: "water", icon: Droplets, label: "Drinks" },
  { id: "sleep", icon: Moon, label: "Sleep & Rest" },
  { id: "emotion", icon: Heart, label: "Emotions" },
  { id: "bathroom", icon: Bath, label: "Bathroom" },
  { id: "mood", icon: Smile, label: "Mood" },
];

const CommunicationPreferences = () => {
  const navigate = useNavigate();
  const { role, setOnboardingComplete, setIsLoggedIn } = useApp();
  const [selected, setSelected] = useState<string[]>(defaultPhrases.map((p) => p.id));

  const toggle = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const handleFinish = () => {
    setOnboardingComplete(true);
    setIsLoggedIn(true);
    navigate(role === "caregiver" ? "/caregiver" : "/user");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background px-6 pt-16 max-w-[480px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm text-primary font-medium mb-1">Step 3 of 3</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">Communication</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Choose the categories you'd like on your communication board
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {defaultPhrases.map((phrase, i) => {
          const isSelected = selected.includes(phrase.id);
          return (
            <motion.button
              key={phrase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggle(phrase.id)}
              className={`flex flex-col items-center gap-3 rounded-xl p-5 border transition-all ${
                isSelected
                  ? "bg-primary/10 border-primary shadow-card"
                  : "bg-card border-border shadow-card"
              }`}
            >
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                isSelected ? "bg-primary" : "bg-muted"
              }`}>
                {isSelected ? (
                  <Check className="h-6 w-6 text-primary-foreground" />
                ) : (
                  <phrase.icon className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-card-foreground"}`}>
                {phrase.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Custom Phrase Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl bg-accent/50 border border-border p-4 flex items-center gap-3 mb-6"
      >
        <Plus className="h-5 w-5 text-primary shrink-0" />
        <p className="text-sm text-muted-foreground">
          You can add custom phrases later from the Communication screen
        </p>
      </motion.div>

      <div className="mt-auto pb-8">
        <Button
          onClick={handleFinish}
          className="w-full h-14 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-base"
        >
          Finish Setup
        </Button>
      </div>
    </div>
  );
};

export default CommunicationPreferences;
