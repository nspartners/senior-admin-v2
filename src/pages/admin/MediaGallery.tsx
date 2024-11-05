import React, { useState, useEffect } from 'react';
import { Plus, ImageIcon } from 'lucide-react';
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { MediaFilter } from '../../components/media/MediaFilter';
import { MediaCard } from '../../components/media/MediaCard';
import { UploadModal } from '../../components/media/UploadModal';
import type { MediaItem, Resident } from '../../types';

function MediaGallery() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [selectedResident, setSelectedResident] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'mediaGallery'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MediaItem[];
      setMediaItems(items);
    });

    const residentsQuery = query(collection(db, 'residents'));
    const residentsUnsubscribe = onSnapshot(residentsQuery, (snapshot) => {
      const residentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Resident[];
      setResidents(residentsData);
    });

    return () => {
      unsubscribe();
      residentsUnsubscribe();
    };
  }, []);

  const handleUpload = async (files: FileList, residentId: string, caption: string) => {
    const resident = residents.find(r => r.id === residentId);
    if (!resident) throw new Error('Resident not found');

    for (const file of Array.from(files)) {
      const storageRef = ref(storage, `residents/${residentId}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, 'mediaGallery'), {
        url,
        residentId,
        residentName: resident.name,
        caption,
        timestamp: new Date().toISOString(),
        uploadedBy: {
          id: 'current-user-id', // Replace with actual user ID
          name: 'Current User' // Replace with actual user name
        }
      });
    }
  };

  const handleDelete = async (item: MediaItem) => {
    try {
      const storageRef = ref(storage, item.url);
      await deleteObject(storageRef);
      await deleteDoc(doc(db, 'mediaGallery', item.id));
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.residentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesResident = !selectedResident || item.residentId === selectedResident;
    return matchesSearch && matchesResident;
  });

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Gallery</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and organize resident photos and media
          </p>
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Upload Media
        </button>
      </div>

      <MediaFilter
        residents={residents}
        selectedResident={selectedResident}
        searchTerm={searchTerm}
        onResidentChange={setSelectedResident}
        onSearchChange={setSearchTerm}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMedia.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No media</h3>
          <p className="mt-1 text-sm text-gray-500">
            {selectedResident
              ? "Start by uploading some photos for this resident"
              : "Select a resident to upload photos"}
          </p>
        </div>
      )}

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        residents={residents}
      />
    </div>
  );
}

export default MediaGallery;