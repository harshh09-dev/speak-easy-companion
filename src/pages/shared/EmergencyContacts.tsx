import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileLayout from "@/components/MobileLayout";
import { ArrowLeft, UserCircle, Phone, Star, Plus, Trash2, Shield } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  phone: string;
  role: "primary" | "secondary" | "emergency";
}

const initialContacts: Contact[] = [
  { id: "1", name: "Sarah Johnson", phone: "+1 (555) 123-4567", role: "primary" },
  { id: "2", name: "Dr. Michael Lee", phone: "+1 (555) 987-6543", role: "secondary" },
  { id: "3", name: "Emergency Services", phone: "911", role: "emergency" },
];

const roleLabels: Record<string, { label: string; color: string }> = {
  primary: { label: "Primary Caregiver", color: "bg-primary/10 text-primary" },
  secondary: { label: "Secondary Caregiver", color: "bg-accent text-accent-foreground" },
  emergency: { label: "Emergency Contact", color: "bg-destructive/10 text-destructive" },
};

interface EmergencyContactsProps {
  role: "user" | "caregiver";
}

const EmergencyContacts = ({ role }: EmergencyContactsProps) => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRole, setNewRole] = useState<Contact["role"]>("secondary");

  const addContact = () => {
    if (!newName || !newPhone) return;
    setContacts((prev) => [
      ...prev,
      { id: Date.now().toString(), name: newName, phone: newPhone, role: newRole },
    ]);
    setNewName("");
    setNewPhone("");
    setShowAdd(false);
  };

  const removeContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <MobileLayout role={role}>
      <div className="px-5 pt-6 pb-6">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate(-1)} className="text-primary">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Emergency Contacts</h1>
        </div>

        <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 mb-5 flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            These contacts will be notified when the emergency button is pressed. Location and status will be shared automatically.
          </p>
        </div>

        <div className="space-y-3 mb-5">
          {contacts.map((contact, i) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl bg-card p-4 shadow-card border border-border"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary-foreground">{contact.name[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-card-foreground">{contact.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Phone className="h-3 w-3" /> {contact.phone}
                  </p>
                  <span className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${roleLabels[contact.role].color}`}>
                    {roleLabels[contact.role].label}
                  </span>
                </div>
                {contact.role !== "emergency" && (
                  <button onClick={() => removeContact(contact.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {!showAdd ? (
          <button
            onClick={() => setShowAdd(true)}
            className="w-full rounded-xl border-2 border-dashed border-border p-4 flex items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Add Contact</span>
          </button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-card p-4 shadow-card border border-border">
            <p className="font-semibold text-card-foreground mb-3">New Contact</p>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Full Name"
              className="w-full rounded-lg bg-muted p-3 text-sm text-foreground placeholder:text-muted-foreground mb-2 outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full rounded-lg bg-muted p-3 text-sm text-foreground placeholder:text-muted-foreground mb-3 outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex gap-2 mb-3">
              {(["primary", "secondary", "emergency"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setNewRole(r)}
                  className={`flex-1 rounded-lg py-2 text-xs font-medium transition-all ${
                    newRole === r ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {r === "primary" ? "Primary" : r === "secondary" ? "Secondary" : "Emergency"}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-lg bg-muted p-3 text-sm font-medium text-muted-foreground">
                Cancel
              </button>
              <button onClick={addContact} className="flex-1 rounded-lg bg-gradient-primary p-3 text-sm font-semibold text-primary-foreground">
                Add
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </MobileLayout>
  );
};

export default EmergencyContacts;
