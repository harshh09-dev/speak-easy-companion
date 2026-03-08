import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Volume2, RotateCcw, ArrowLeft, VolumeX } from "lucide-react";

const VoiceOutput = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const phrase = searchParams.get("phrase") || "I need help";
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const timer = setTimeout(speak, 500);
    return () => {
      clearTimeout(timer);
      window.speechSynthesis?.cancel();
    };
  }, [phrase]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 max-w-[480px] mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-primary font-medium"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Animated speaker icon */}
        <motion.div
          animate={isSpeaking ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
          className={`h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8 ${
            isSpeaking ? "bg-primary" : "bg-muted"
          }`}
        >
          {isSpeaking ? (
            <Volume2 className="h-12 w-12 text-primary-foreground" />
          ) : (
            <VolumeX className="h-12 w-12 text-muted-foreground" />
          )}
        </motion.div>

        {/* Large phrase text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-foreground mb-4 leading-tight"
        >
          "{phrase}"
        </motion.h1>

        <p className="text-muted-foreground text-sm mb-10">
          {isSpeaking ? "Speaking..." : "Tap to speak again"}
        </p>

        {/* Action buttons */}
        <div className="flex gap-4 justify-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={speak}
            className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-elevated"
          >
            <RotateCcw className="h-7 w-7 text-primary-foreground" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default VoiceOutput;
