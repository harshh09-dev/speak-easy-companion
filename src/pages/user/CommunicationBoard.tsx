import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MobileLayout from "@/components/MobileLayout";
import { UtensilsCrossed, Droplets, Moon, Heart, Bath, Smile, ArrowLeft, Volume2 } from "lucide-react";

const categories = [
  { id: "food", label: "Food", icon: UtensilsCrossed, messages: ["I am hungry", "I want a snack", "I want lunch", "I want dinner"] },
  { id: "water", label: "Water", icon: Droplets, messages: ["I need water", "I want juice", "I want milk", "I am thirsty"] },
  { id: "sleep", label: "Sleep", icon: Moon, messages: ["I am tired", "I want to sleep", "I need rest", "I can't sleep"] },
  { id: "emotion", label: "Emotion", icon: Heart, messages: ["I am happy", "I am sad", "I am scared", "I feel lonely"] },
  { id: "bathroom", label: "Bathroom", icon: Bath, messages: ["I need bathroom", "I need help cleaning", "I need a shower"] },
  { id: "mood", label: "Mood", icon: Smile, messages: ["I feel good", "I feel sick", "I am bored", "I am uncomfortable"] },
];

const CommunicationBoard = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const activeCategory = categories.find((c) => c.id === selected);

  const handlePhraseClick = (phrase: string) => {
    navigate(`/user/voice?phrase=${encodeURIComponent(phrase)}`);
  };

  return (
    <MobileLayout role="user">
      <div className="px-5 pt-6">
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-xl font-bold text-foreground mb-1">Communicate</h1>
              <p className="text-muted-foreground text-sm mb-5">Choose a category</p>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat, i) => (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setSelected(cat.id)}
                    className="flex flex-col items-center gap-3 rounded-xl bg-card p-6 shadow-card border border-border hover:border-primary transition-colors"
                  >
                    <div className="h-14 w-14 rounded-full bg-gradient-primary flex items-center justify-center">
                      <cat.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <span className="font-medium text-card-foreground">{cat.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="messages" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <button
                onClick={() => setSelected(null)}
                className="flex items-center gap-2 text-primary font-medium mb-4"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <h2 className="text-xl font-bold text-foreground mb-4">{activeCategory?.label}</h2>
              <div className="flex flex-col gap-3">
                {activeCategory?.messages.map((msg, i) => (
                  <motion.button
                    key={msg}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handlePhraseClick(msg)}
                    className="w-full text-left rounded-xl bg-card p-5 shadow-card border border-border text-lg font-medium text-card-foreground hover:border-primary hover:shadow-elevated transition-all flex items-center justify-between"
                  >
                    <span>{msg}</span>
                    <Volume2 className="h-5 w-5 text-primary shrink-0" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileLayout>
  );
};

export default CommunicationBoard;
