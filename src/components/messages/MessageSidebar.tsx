import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Users, Calendar, FileText, X } from 'lucide-react';
import { db } from '../../lib/firebase';
import type { MessageThread } from '../../types';

interface MessageSidebarProps {
  threadId: string | null;
}

export function MessageSidebar({ threadId }: MessageSidebarProps) {
  const [threadDetails, setThreadDetails] = useState<MessageThread | null>(null);

  useEffect(() => {
    if (!threadId) return;

    const fetchThreadDetails = async () => {
      const docRef = doc(db, 'messageThreads', threadId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setThreadDetails({
          id: docSnap.id,
          ...docSnap.data()
        } as MessageThread);
      }
    };

    fetchThreadDetails();
  }, [threadId]);

  if (!threadId || !threadDetails) return null;

  return (
    <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Thread Details</h3>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Subject</h4>
          <p className="text-sm text-gray-900">{threadDetails.subject}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Participants</h4>
          <div className="space-y-2">
            {threadDetails.participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center space-x-2 text-sm"
              >
                <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center">
                  <span className="text-brand-600 font-medium">
                    {participant.name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {participant.name}
                  </p>
                  <p className="text-gray-500">{participant.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Related Documents
          </h4>
          <div className="space-y-2">
            {threadDetails.attachments?.map((attachment, index) => (
              <a
                key={index}
                href={attachment.url}
                className="flex items-center space-x-2 text-sm text-brand-600 hover:text-brand-700"
              >
                <FileText className="h-4 w-4" />
                <span>{attachment.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}