import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Send, Paperclip } from 'lucide-react';
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Message } from '../../types';

interface MessageThreadProps {
  threadId: string;
}

export function MessageThread({ threadId }: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, `messageThreads/${threadId}/messages`),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [threadId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, `messageThreads/${threadId}/messages`), {
        content: newMessage,
        senderId: 'current-user-id', // Replace with actual user ID
        senderName: 'Current User', // Replace with actual user name
        timestamp: serverTimestamp(),
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === 'current-user-id'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === 'current-user-id'
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium">
                  {message.senderName}
                </span>
                <span className="text-xs opacity-75">
                  {format(new Date(message.timestamp), 'h:mm a')}
                </span>
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="flex-shrink-0 text-gray-400 hover:text-gray-500"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 focus:outline-none focus:ring-2 focus:ring-brand-500 border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="flex-shrink-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}