import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateActivityModal({ isOpen, onClose }: CreateActivityModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const mediaUrls = await Promise.all(
        selectedFiles.map(async (file) => {
          const storageRef = ref(storage, `activities/${Date.now()}_${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          return {
            type: file.type.startsWith('image/') ? 'image' : 'video',
            url
          };
        })
      );

      await addDoc(collection(db, 'activities'), {
        title,
        description,
        timestamp: serverTimestamp(),
        createdBy: {
          id: 'current-user-id', // Replace with actual user ID
          name: 'Current User' // Replace with actual user name
        },
        media: mediaUrls,
        comments: []
      });

      onClose();
      setTitle('');
      setDescription('');
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error creating activity:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        
        <div className="relative bg-white rounded-lg max-w-lg w-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium">Create New Activity</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Media
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="media" className="relative cursor-pointer rounded-md font-medium text-brand-600 hover:text-brand-500">
                      <span>Upload files</span>
                      <input
                        id="media"
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        className="sr-only"
                        onChange={(e) => {
                          if (e.target.files) {
                            setSelectedFiles(Array.from(e.target.files));
                          }
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-md disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Activity'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}