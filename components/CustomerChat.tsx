"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";

type Message = {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: any;
};

export function CustomerChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (chatStarted && email) {
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
      });

      return () => unsubscribe();
    }
  }, [chatStarted, email]);

  const startChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Check if a chat already exists for this email
    const chatQuery = query(
      collection(db, "chats"),
      where("email", "==", email)
    );
    const existingChats = await getDocs(chatQuery);

    if (existingChats.empty) {
      // Only create a new chat document if one doesn't exist
      await addDoc(collection(db, "chats"), {
        email,
        timestamp: serverTimestamp(),
      });
    }

    setChatStarted(true);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(collection(db, "chats", email, "messages"), {
      text: message,
      sender: "user",
      timestamp: serverTimestamp(),
    });

    setMessage("");
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-4 right-4 rounded-full w-16 h-16 p-4 bg-white hover:bg-gray-400 transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6 text-black" />
      </Button>
    );
  }

  return (
    <Card className="fixed z-50 bottom-4 right-4 w-96 h-[500px] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">Customer Support</h2>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {!chatStarted ? (
        <form onSubmit={startChat} className="p-4">
          <Input
            type="email"
            placeholder="Enter your email to start chat"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2"
          />
          <Button type="submit" className="w-full">
            Start Chat
          </Button>
        </form>
      ) : (
        <>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      msg.sender === "user"
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
        </>
      )}
    </Card>
  );
}
