import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, Heart, Image as ImageIcon } from 'lucide-react';
import type { Activity } from '../../types';

interface ActivityCardProps {
  activity: Activity;
  onComment: (activityId: string) => void;
  onLike: (activityId: string) => void;
}

export function ActivityCard({ activity, onComment, onLike }: ActivityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-600 font-semibold">
              {activity.createdBy.name[0]}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {activity.createdBy.name}
            </p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {activity.title}
        </h3>
        <p className="text-gray-600 mb-4">{activity.description}</p>

        {activity.media && activity.media.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2">
              {activity.media.map((media, index) => (
                <div key={index} className="relative pt-[100%]">
                  {media.type === 'image' && (
                    <img
                      src={media.url}
                      alt={`Activity media ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            onClick={() => onLike(activity.id)}
            className="flex items-center text-gray-500 hover:text-pink-500"
          >
            <Heart className="h-5 w-5 mr-1" />
            <span>Like</span>
          </button>
          <button
            onClick={() => onComment(activity.id)}
            className="flex items-center text-gray-500 hover:text-indigo-500"
          >
            <MessageCircle className="h-5 w-5 mr-1" />
            <span>Comment ({activity.comments.length})</span>
          </button>
        </div>

        {activity.comments.length > 0 && (
          <div className="mt-4 space-y-3">
            {activity.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-500">
                      {comment.userName[0]}
                    </span>
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg px-4 py-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      {comment.userName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(comment.timestamp), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}