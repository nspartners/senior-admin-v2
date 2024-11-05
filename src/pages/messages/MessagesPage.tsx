import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { MessageList } from '../../components/messages/MessageList';
import { MessageThread } from '../../components/messages/MessageThread';
import { MessageSidebar } from '../../components/messages/MessageSidebar';
import type { MessageThread as MessageThreadType } from '../../types';

function MessagesPage() {
  const [threads, setThreads] = useState<MessageThreadType[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'messageThreads'),
      orderBy('lastMessageAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const threadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MessageThreadType[];
      setThreads(threadsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <MessageList
        threads={threads}
        selectedThreadId={selectedThreadId}
        onThreadSelect={setSelectedThreadId}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 flex">
        {selectedThreadId ? (
          <MessageThread threadId={selectedThreadId} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <p className="text-gray-500">Select a conversation to start messaging</p>
          </div>
        )}
        
        {sidebarOpen && <MessageSidebar threadId={selectedThreadId} />}
      </div>
    </div>
  );
}

export default MessagesPage;