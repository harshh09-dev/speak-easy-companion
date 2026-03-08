import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";
import { MapPin, Clock, Activity } from "lucide-react";

const CaregiverTracking = () => (
  <MobileLayout role="caregiver">
    <div className="px-5 pt-6">
      <h1 className="text-xl font-bold text-foreground mb-4">Live Tracking</h1>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl bg-accent/50 border border-border h-72 flex items-center justify-center mb-5 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10" />
        <div className="text-center z-10">
          <div className="relative mx-auto mb-3">
            <MapPin className="h-10 w-10 text-primary mx-auto" />
            <div className="absolute -inset-2 rounded-full border-2 border-primary/30 animate-pulse-ring" />
          </div>
          <p className="text-muted-foreground text-sm">Live Location of Alex</p>
          <p className="text-xs text-muted-foreground">Map integration coming soon</p>
        </div>
      </motion.div>

      {/* Location Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-card p-5 shadow-card border border-border mb-4"
      >
        <h2 className="font-semibold text-card-foreground mb-3">Location Details</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Home - Living Room</p>
              <p className="text-xs text-muted-foreground">Current location</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">2 hours</p>
              <p className="text-xs text-muted-foreground">Time at current location</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Activity className="h-4 w-4 text-success" />
            <div>
              <p className="text-sm font-medium text-foreground">Normal movement</p>
              <p className="text-xs text-muted-foreground">Consistent with daily pattern</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </MobileLayout>
);

export default CaregiverTracking;
