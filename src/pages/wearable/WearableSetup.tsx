import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Watch, Bluetooth, CheckCircle, ArrowLeft, Signal, Battery, Heart, Activity, RefreshCw } from "lucide-react";

const mockDevices = [
  { id: "1", name: "Apple Watch Series 9", type: "smartwatch", signal: 92 },
  { id: "2", name: "Fitbit Sense 2", type: "fitness", signal: 78 },
  { id: "3", name: "Galaxy Watch 6", type: "smartwatch", signal: 65 },
];

type Step = "setup" | "scanning" | "select" | "connecting" | "connected" | "synced";

const WearableSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("setup");
  const [selectedDevice, setSelectedDevice] = useState<typeof mockDevices[0] | null>(null);

  const startScanning = () => {
    setStep("scanning");
    setTimeout(() => setStep("select"), 2500);
  };

  const connectDevice = (device: typeof mockDevices[0]) => {
    setSelectedDevice(device);
    setStep("connecting");
    setTimeout(() => setStep("connected"), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background max-w-[480px] mx-auto">
      <div className="px-5 pt-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary font-medium mb-4">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </div>

      <div className="flex-1 px-5 pb-10">
        <AnimatePresence mode="wait">
          {step === "setup" && (
            <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center pt-10">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Watch className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Connect Wearable</h1>
              <p className="text-muted-foreground mb-8">
                Connect a smartwatch or fitness tracker to monitor health signals in real-time.
              </p>
              <div className="space-y-3 text-left mb-8">
                {[
                  { icon: Heart, text: "Heart rate monitoring" },
                  { icon: Activity, text: "Activity & movement tracking" },
                  { icon: Signal, text: "Stress detection alerts" },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border">
                    <f.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-card-foreground">{f.text}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={startScanning}
                className="w-full rounded-xl bg-gradient-primary p-4 text-primary-foreground font-semibold flex items-center justify-center gap-2"
              >
                <Bluetooth className="h-5 w-5" />
                Start Scanning
              </button>
            </motion.div>
          )}

          {step === "scanning" && (
            <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center pt-20">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 relative"
              >
                <Bluetooth className="h-12 w-12 text-primary" />
                <motion.div
                  animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 rounded-full border-2 border-primary/40"
                />
              </motion.div>
              <h2 className="text-xl font-bold text-foreground mb-2">Scanning...</h2>
              <p className="text-muted-foreground text-sm">Looking for nearby devices</p>
            </motion.div>
          )}

          {step === "select" && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold text-foreground mb-1">Devices Found</h2>
              <p className="text-muted-foreground text-sm mb-5">{mockDevices.length} devices nearby</p>
              <div className="space-y-3">
                {mockDevices.map((device, i) => (
                  <motion.button
                    key={device.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => connectDevice(device)}
                    className="w-full rounded-xl bg-card p-4 shadow-card border border-border flex items-center gap-4 hover:border-primary transition-colors"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Watch className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-card-foreground">{device.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{device.type}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Signal className="h-3 w-3 text-success" />
                      <span className="text-xs text-muted-foreground">{device.signal}%</span>
                    </div>
                  </motion.button>
                ))}
              </div>
              <button onClick={startScanning} className="mt-4 flex items-center gap-2 text-primary font-medium text-sm mx-auto">
                <RefreshCw className="h-4 w-4" /> Scan Again
              </button>
            </motion.div>
          )}

          {step === "connecting" && (
            <motion.div key="connecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center pt-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="h-20 w-20 border-4 border-muted border-t-primary rounded-full mx-auto mb-6"
              />
              <h2 className="text-xl font-bold text-foreground mb-2">Connecting...</h2>
              <p className="text-muted-foreground text-sm">{selectedDevice?.name}</p>
            </motion.div>
          )}

          {step === "connected" && (
            <motion.div key="connected" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center pt-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="h-24 w-24 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="h-12 w-12 text-success" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Connected!</h2>
              <p className="text-muted-foreground text-sm mb-8">{selectedDevice?.name} is now linked</p>

              {/* Live Data Preview */}
              <div className="space-y-3 text-left mb-8">
                {[
                  { icon: Heart, label: "Heart Rate", value: "72 BPM", color: "text-destructive" },
                  { icon: Activity, label: "Activity", value: "Active", color: "text-success" },
                  { icon: Battery, label: "Battery", value: "85%", color: "text-primary" },
                  { icon: Signal, label: "Signal", value: "Strong", color: "text-success" },
                ].map((d, i) => (
                  <motion.div
                    key={d.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="rounded-xl bg-card p-4 shadow-card border border-border flex items-center gap-3"
                  >
                    <d.icon className={`h-5 w-5 ${d.color}`} />
                    <span className="flex-1 text-sm font-medium text-card-foreground">{d.label}</span>
                    <span className="text-sm font-bold text-foreground">{d.value}</span>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => navigate(-1)}
                className="w-full rounded-xl bg-gradient-primary p-4 text-primary-foreground font-semibold"
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WearableSetup;
