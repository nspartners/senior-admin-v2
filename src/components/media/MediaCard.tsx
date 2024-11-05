import React from 'react';
import { User, Trash2 } from 'lucide-react';
import type { MediaItem } from '../../types';

interface MediaCardProps {
  item: MediaItem;
  onDelete: (item: MediaItem) => Promise<void>;
}

export function MediaCard({ item, onDelete }: MediaCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="aspect-w-4 aspect-h-3">
        <img
          src={item.url}
          alt={item.caption}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">
              {item.residentName}
            </span>
          </div>
          <button
            onClick={() => onDelete(item)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-gray-500">{item.caption}</p>
        <p className="text-xs text-gray-400">
          Uploaded by {item.uploadedBy.name}
        </p>
      </div>
    </div>
  );
}