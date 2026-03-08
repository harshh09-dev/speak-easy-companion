import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MobileLayout from "@/components/MobileLayout";
import { UtensilsCrossed, Droplets, Moon, Heart, Bath, Smile, ArrowLeft, Volume2, Sparkles, Clock, Plus } from "lucide-react";
import { haptics } from "@/lib/haptics";

const defaultCategories = [
  { id: "food", label: "Food", icon: UtensilsCrossed, messages: ["I am hungry", "I want a snack", "I want lunch", "I want dinner", "I want breakfast"] },
  { id: "water", label: "Water", icon: Droplets, messages: ["I need water", "I want juice", "I want milk", "I am thirsty"] },
  { id: "sleep", label: "Sleep", icon: Moon, messages: ["I am tired", "I want to sleep", "I need rest", "I can't sleep"] },
  { id: "emotion", label: "Emotion", icon: Heart, messages: ["I am happy", "I am sad", "I am scared", "I feel lonely", "I feel anxious"] },
  { id: "bathroom", label: "Bathroom", icon: Bath, messages: ["I need bathroom", "I need help cleaning", "I need a shower"] },
  { id: "mood", label: "Mood", icon: Smile, messages: ["I feel good", "I feel sick", "I am bored", "I am uncomfortable", "I feel pain"] },
];

function getSmartSuggestions(): { phrase: string; reason: string }[] {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 10) {
    return [
      { phrase: "I want breakfast", reason: "Morning time" },
      { phrase: "I need water", reason: "Stay hydrated" },
      { phrase: "I am tired", reason: "Just woke up" },
    ];
  } else if (hour >= 10 && hour < 14) {
    return [
      { phrase: "I want lunch", reason: "Lunch time" },
      { phrase: "I am thirsty", reason: "Mid-day hydration" },
      { phrase: "I need bathroom", reason: "Frequent need" },
    ];
  } else if (hour >= 14 && hour < 18) {
    return [
      { phrase: "I want a snack", reason: "Afternoon snack" },
      { phrase: "I am bored", reason: "Afternoon lull" },
      { phrase: "I need water", reason: "Stay hydrated" },
    ];
  } else if (hour >= 18 && hour < 22) {
    return [
      { phrase: "I want dinner", reason: "Dinner time" },
      { phrase: "I am tired", reason: "Evening rest" },
      { phrase: "I feel good", reason: "End of day check" },
    ];
  }
  return [
    { phrase: "I can't sleep", reason: "Night time" },
    { phrase: "I need water", reason: "Night hydration" },
    { phrase: "I need help cleaning", reason: "Before bed" },
  ];
}

const CUSTOM_PHRASES_KEY = "neurospeak_custom_phrases";

interface CustomPhrase {
  id: number;
  text: string;
  icon: string;
  category: string;
}

const CommunicationBoard = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [customPhrases, setCustomPhrases] = useState<CustomPhrase[]>([]);
  const navigate = useNavigate();
  const suggestions = useMemo(() => getSmartSuggestions(), []);

  // Load custom phrases from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CUSTOM_PHRASES_KEY);
      if (stored) setCustomPhrases(JSON.parse(stored));
    } catch {}
  }, []);

  const categories = useMemo(() => {
    if (customPhrases.length === 0) return defaultCategories;
    return [
      ...defaultCategories,
      {
        id: "custom",
        label: "My Phrases",
        icon: Sparkles,
        messages: customPhrases.map((p) => p.text),
      },
    ];
  }, [customPhrases]);

  const activeCategory = categories.find((c) => c.id === selected);

  const handlePhraseClick = (phrase: string) => {
    haptics.medium();
    navigate(`/user/voice?phrase=${encodeURIComponent(phrase)}`);
  };

  return (
    <MobileLayout role="user">
      <div className="px-5 pt-6">
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-1">
                <h1 className="text-xl font-bold text-foreground">Communicate</h1>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    haptics.light();
                    navigate("/user/custom-phrases");
                  }}
                  className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center shadow-card"
                >
                  <Plus className="h-4 w-4 text-primary-foreground" />
                </motion.button>
              </div>
              <p className="text-muted-foreground text-sm mb-5">Choose a category or use a suggestion</p>

              {/* Smart Suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 rounded-xl bg-primary/5 border border-primary/20 p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Smart Suggestions</span>
                  <Clock className="h-3 w-3 text-muted-foreground ml-auto" />
                  <span className="text-[10px] text-muted-foreground">Based on time</span>
                </div>
                <div className="flex flex-col gap-2">
                  {suggestions.map((s, i) => (
                    <motion.button
                      key={s.phrase}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePhraseClick(s.phrase)}
                      className="flex items-center gap-3 rounded-lg bg-card p-3 border border-border hover:border-primary transition-colors"
                    >
                      <Volume2 className="h-4 w-4 text-primary shrink-0" />
                      <span className="flex-1 text-left text-sm font-medium text-card-foreground">{s.phrase}</span>
                      <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{s.reason}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Category Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {categories.map((cat, i) => (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      haptics.light();
                      setSelected(cat.id);
                    }}
                    className={`flex flex-col items-center gap-3 rounded-xl bg-card p-6 shadow-card border border-border hover:border-primary transition-colors ${
                      cat.id === "custom" ? "border-primary/30 bg-primary/5" : ""
                    }`}
                  >
                    <div className="h-14 w-14 rounded-full bg-gradient-primary flex items-center justify-center">
                      <cat.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <span className="font-medium text-card-foreground">{cat.label}</span>
                    {cat.id === "custom" && (
                      <span className="text-[10px] text-primary font-medium -mt-2">{cat.messages.length} phrases</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="messages" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <button
                onClick={() => {
                  haptics.light();
                  setSelected(null);
                }}
                className="flex items-center gap-2 text-primary font-medium mb-4"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">{activeCategory?.label}</h2>
                {selected === "custom" && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/user/custom-phrases")}
                    className="text-xs text-primary font-medium flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" /> Add More
                  </motion.button>
                )}
              </div>
              <div className="flex flex-col gap-3 mb-6">
                {activeCategory?.messages.map((msg, i) => (
                  <motion.button
                    key={msg}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileTap={{ scale: 0.98 }}
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
