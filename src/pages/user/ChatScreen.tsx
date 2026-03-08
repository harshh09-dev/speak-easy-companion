import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileLayout from "@/components/MobileLayout";
import { Send, Volume2, ArrowLeft, Phone, Video } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  role: string;
  status: "online" | "offline" | "away";
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "caregiver";
  time: string;
}

const contacts: Contact[] = [
  { id: "mom", name: "Mom", role: "Primary Caregiver", status: "online", lastMessage: "I'll bring you breakfast", time: "8:05 AM", unread: 2, avatar: "M" },
  { id: "dad", name: "Dad", role: "Family", status: "away", lastMessage: "How are you feeling?", time: "Yesterday", unread: 0, avatar: "D" },
  { id: "dr-patel", name: "Dr. Patel", role: "Doctor", status: "offline", lastMessage: "Your reports look good", time: "Mon", unread: 0, avatar: "P" },
  { id: "sarah", name: "Sarah", role: "Therapist", status: "online", lastMessage: "See you tomorrow at 10", time: "Sun", unread: 1, avatar: "S" },
];

const chatHistory: Record<string, Message[]> = {
  mom: [
    { id: 1, text: "Good morning Alex! How are you feeling today?", sender: "caregiver", time: "8:00 AM" },
    { id: 2, text: "I am feeling good", sender: "user", time: "8:01 AM" },
    { id: 3, text: "That's great! Have you had breakfast?", sender: "caregiver", time: "8:02 AM" },
    { id: 4, text: "I am hungry", sender: "user", time: "8:05 AM" },
    { id: 5, text: "I'll bring you breakfast", sender: "caregiver", time: "8:05 AM" },
  ],
  dad: [
    { id: 1, text: "Hey Alex, how was your day?", sender: "caregiver", time: "6:00 PM" },
    { id: 2, text: "I feel good", sender: "user", time: "6:05 PM" },
    { id: 3, text: "How are you feeling?", sender: "caregiver", time: "6:10 PM" },
  ],
  "dr-patel": [
    { id: 1, text: "Hi Alex, I reviewed your reports", sender: "caregiver", time: "10:00 AM" },
    { id: 2, text: "Your reports look good", sender: "caregiver", time: "10:01 AM" },
  ],
  sarah: [
    { id: 1, text: "Great session today Alex!", sender: "caregiver", time: "3:00 PM" },
    { id: 2, text: "Thank you", sender: "user", time: "3:05 PM" },
    { id: 3, text: "See you tomorrow at 10", sender: "caregiver", time: "3:06 PM" },
  ],
};

const quickPhrases = ["I need help", "Yes", "No", "Thank you", "I am okay", "I feel pain"];

const statusColors: Record<string, string> = {
  online: "bg-success",
  away: "bg-warning",
  offline: "bg-muted-foreground/40",
};

const ChatScreen = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [speaking, setSpeaking] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const activeContact = contacts.find((c) => c.id === activeChat);

  useEffect(() => {
    if (activeChat && chatHistory[activeChat]) {
      setMessages([...chatHistory[activeChat]]);
    }
  }, [activeChat]);

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
      <AnimatePresence mode="wait">
        {!activeChat ? (
          /* Contact List */
          <motion.div
            key="contacts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -30 }}
            className="px-5 pt-6"
          >
            <h1 className="text-xl font-bold text-foreground mb-1">Messages</h1>
            <p className="text-sm text-muted-foreground mb-5">Chat with your caregivers and contacts</p>

            <div className="flex flex-col gap-2">
              {contacts.map((contact, i) => (
                <motion.button
                  key={contact.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setActiveChat(contact.id)}
                  className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-card border border-border w-full text-left hover:border-primary transition-colors"
                >
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-foreground">{contact.avatar}</span>
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full ${statusColors[contact.status]} border-2 border-card`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-card-foreground">{contact.name}</span>
                      <span className="text-[10px] text-muted-foreground">{contact.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{contact.role}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && (
                    <div className="h-5 min-w-[20px] rounded-full bg-primary flex items-center justify-center px-1">
                      <span className="text-[10px] font-bold text-primary-foreground">{contact.unread}</span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Chat Conversation */
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            className="flex flex-col h-[calc(100vh-5rem)]"
          >
            {/* Chat Header */}
            <div className="px-4 pt-4 pb-3 border-b border-border flex items-center gap-3">
              <button onClick={() => setActiveChat(null)} className="text-primary">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">{activeContact?.avatar}</span>
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ${statusColors[activeContact?.status || "offline"]} border-2 border-card`} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">{activeContact?.name}</p>
                <p className="text-[10px] text-muted-foreground capitalize">{activeContact?.status}</p>
              </div>
              <button className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Phone className="h-4 w-4" />
              </button>
              <button className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Video className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[75%]">
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
            <div className="px-4 py-3 border-t border-border bg-card">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {quickPhrases.map((phrase) => (
                  <button
                    key={phrase}
                    onClick={() => sendMessage(phrase)}
                    className="shrink-0 rounded-full bg-primary/10 border border-primary/30 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => sendMessage("I need help")}
                  className="flex-1 h-12 rounded-xl bg-gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileLayout>
  );
};

export default ChatScreen;
