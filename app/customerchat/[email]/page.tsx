"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

type Message = {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: any;
};

export default function CustomerChatDetail() {
  const params = useParams();
  const email = decodeURIComponent(params.email as string);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, "chats", email, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages: Message[] = [];
      snapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...(doc.data() as Omit<Message, "id">),
        });
      });
      setMessages(newMessages);
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });

    return () => unsubscribe();
  }, [email]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(collection(db, "chats", email, "messages"), {
      text: message,
      sender: "admin",
      timestamp: serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="h-[calc(100vh-8rem)]">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Chat with {email}</h1>
        </div>

        <ScrollArea className="flex-1 p-4 h-[calc(100%-8rem)]">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                ref={index === messages.length - 1 ? messagesEndRef : null}
                className={`flex ${
                  msg.sender === "admin" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.sender === "admin"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={sendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
