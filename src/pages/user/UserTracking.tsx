import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";
import { MapPin, Activity } from "lucide-react";

const UserTracking = () => (
  <MobileLayout role="user">
    <div className="px-5 pt-6">
      <h1 className="text-xl font-bold text-foreground mb-4">Tracking</h1>
      
      {/* Map placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl bg-accent/50 border border-border h-64 flex items-center justify-center mb-5 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10" />
        <div className="text-center z-10">
          <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">Live Location</p>
          <p className="text-xs text-muted-foreground">Map integration coming soon</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-card p-5 shadow-card border border-border"
      >
        <div className="flex items-center gap-3 mb-4">
          <Activity className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-card-foreground">Movement Score</h2>
        </div>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-4xl font-bold text-foreground">82</span>
          <span className="text-muted-foreground text-sm mb-1">/ 100</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div className="bg-gradient-primary h-3 rounded-full" style={{ width: "82%" }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Great activity today!</p>
      </motion.div>
    </div>
  </MobileLayout>
);

export default UserTracking;
