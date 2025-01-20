'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Chat = {
  id: string;
  email: string;
  timestamp: any;
};

export default function CustomerChatAdmin() {
  const [searchEmail, setSearchEmail] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'chats'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newChats: Chat[] = [];
      snapshot.forEach((doc) => {
        newChats.push({
          id: doc.id,
          ...doc.data() as Omit<Chat, 'id'>
        });
      });
      setChats(newChats);
    });

    return () => unsubscribe();
  }, []);

  const filteredChats = chats.filter((chat) => {
    const email = chat.email.toLowerCase();
    return email.includes(searchEmail.toLowerCase());
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Customer Chat Admin</h1>
      
      <div className="mb-6">
        <Input
          type="email"
          placeholder="Search by email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid gap-4">
        {filteredChats.map((chat) => (
          <Card key={chat.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{chat.email}</p>
                <p className="text-sm text-muted-foreground">
                  {chat.timestamp?.toDate().toLocaleString()}
                </p>
              </div>
              <Link href={`/customerchat/${encodeURIComponent(chat.email)}`}>
                <Button>View Chat</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}