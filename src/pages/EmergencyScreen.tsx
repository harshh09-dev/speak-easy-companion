import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft } from "lucide-react";

const EmergencyScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-danger px-6 max-w-[480px] mx-auto">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="text-center"
      >
        <div className="relative mx-auto mb-6">
          <div className="h-24 w-24 rounded-full bg-destructive-foreground/20 flex items-center justify-center mx-auto">
            <AlertTriangle className="h-14 w-14 text-destructive-foreground" />
          </div>
          <div className="absolute inset-0 h-24 w-24 mx-auto rounded-full border-2 border-destructive-foreground/30 animate-pulse-ring" />
        </div>
        <h1 className="text-3xl font-bold text-destructive-foreground mb-2">Emergency Alert Sent</h1>
        <p className="text-destructive-foreground/80 text-lg mb-8">Your caregiver has been notified</p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mx-auto rounded-xl bg-destructive-foreground/20 px-6 py-3 text-destructive-foreground font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EmergencyScreen;
