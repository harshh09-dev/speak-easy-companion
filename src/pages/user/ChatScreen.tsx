import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import MobileLayout from "@/components/MobileLayout";
import { Send, Volume2 } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "caregiver";
  time: string;
}

const initialMessages: Message[] = [
  { id: 1, text: "Good morning Alex! How are you feeling today?", sender: "caregiver", time: "8:00 AM" },
  { id: 2, text: "I am feeling good", sender: "user", time: "8:01 AM" },
  { id: 3, text: "That's great to hear! Have you had breakfast?", sender: "caregiver", time: "8:02 AM" },
  { id: 4, text: "I am hungry", sender: "user", time: "8:05 AM" },
  { id: 5, text: "I'll bring you something to eat right away!", sender: "caregiver", time: "8:05 AM" },
];

const quickPhrases = ["I need help", "Yes", "No", "Thank you", "I am okay"];

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [speaking, setSpeaking] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    const newMsg: Message = {
      id: Date.now(),
      text,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const speakMessage = (msg: Message) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(msg.text);
      utterance.rate = 0.9;
      setSpeaking(msg.id);
      utterance.onend = () => setSpeaking(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <MobileLayout role="user">
      <div className="flex flex-col h-[calc(100vh-5rem)]">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-border">
          <h1 className="text-lg font-bold text-foreground">Chat with Caregiver</h1>
          <p className="text-xs text-success font-medium">● Online</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[75%] ${msg.sender === "user" ? "order-1" : ""}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.sender === "user"
                      ? "bg-gradient-primary text-primary-foreground rounded-br-md"
                      : "bg-card border border-border text-card-foreground rounded-bl-md"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                <div className={`flex items-center gap-2 mt-1 ${msg.sender === "user" ? "justify-end" : ""}`}>
                  <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                  <button
                    onClick={() => speakMessage(msg)}
                    className={`p-1 rounded-full transition-colors ${
                      speaking === msg.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Volume2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Quick Phrases */}
        <div className="px-5 py-3 border-t border-border bg-card">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {quickPhrases.map((phrase) => (
              <button
                key={phrase}
                onClick={() => sendMessage(phrase)}
                className="shrink-0 rounded-full bg-primary/10 border border-primary/30 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                {phrase}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => sendMessage("I need water")}
              className="flex-1 h-12 rounded-xl bg-gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ChatScreen;
