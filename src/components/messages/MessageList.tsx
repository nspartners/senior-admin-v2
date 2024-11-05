import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Search, Edit } from 'lucide-react';
import type { MessageThread } from '../../types';

interface MessageListProps {
  threads: MessageThread[];
  selectedThreadId: string | null;
  onThreadSelect: (threadId: string) => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function MessageList({
  threads,
  selectedThreadId,
  onThreadSelect,
  sidebarOpen,
  onToggleSidebar,
}: MessageListProps) {
  return (
    <div className="w-80 flex-shrink-0 border-r border-gray-200 bg-white">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <button
              onClick={onToggleSidebar}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {threads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => onThreadSelect(thread.id)}
              className={`w-full p-4 text-left border-b border-gray-200 hover:bg-gray-50 ${
                selectedThreadId === thread.id ? 'bg-brand-50' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-gray-900 truncate">
                  {thread.subject}
                </h3>
                <span className="text-xs text-gray-500">
                  {format(new Date(thread.lastMessageAt), 'MMM d')}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {thread.lastMessage}
              </p>
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <span className="truncate">
                  {thread.participants.map(p => p.name).join(', ')}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            New Message
          </button>
        </div>
      </div>
    </div>
  );
}