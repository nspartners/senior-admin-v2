import React, { useState } from 'react';
import { X, Upload, ImageIcon } from 'lucide-react';
import type { Resident } from '../../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: FileList, residentId: string, caption: string) => Promise<void>;
  residents: Resident[];
}

export function UploadModal({ isOpen, onClose, onUpload, residents }: UploadModalProps) {
  const [selectedResident, setSelectedResident] = useState('');
  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || !selectedResident) return;

    setIsUploading(true);
    try {
      await onUpload(files, selectedResident, caption);
      onClose();
      setSelectedResident('');
      setCaption('');
      setFiles(null);
    } catch (error) {
      console.error('Error uploading:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg max-w-lg w-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Upload Media</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label htmlFor="uploadResident" className="block text-sm font-medium text-gray-700">
                Select Resident
              </label>
              <select
                id="uploadResident"
                value={selectedResident}
                onChange={(e) => setSelectedResident(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                required
              >
                <option value="">Choose a resident...</option>
                {residents.map((resident) => (
                  <option key={resident.id} value={resident.id}>
                    {resident.name} - Room {resident.roomNumber}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="uploadCaption" className="block text-sm font-medium text-gray-700">
                Caption
              </label>
              <input
                type="text"
                id="uploadCaption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                placeholder="Enter a caption for the media..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Media Files</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-brand-600 hover:text-brand-500">
                      <span>Upload files</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => setFiles(e.target.files)}
                        required
                      />
                    </label>
                  </div>
                  {files && (
                    <p className="text-sm text-gray-500">
                      {files.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading || !files || !selectedResident}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-md disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}