import React, { useState, useEffect } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ActivityCard } from '../../components/activity/ActivityCard';
import { CreateActivityModal } from '../../components/activity/CreateActivityModal';
import { ActivityFilter } from '../../components/activity/ActivityFilter';
import type { Activity } from '../../types';

function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const q = query(
      collection(db, 'activities'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activitiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Activity[];
      setActivities(activitiesData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage resident activities
          </p>
        </div>
        <div className="mt-4 sm:mt-0 space-x-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Activity
          </button>
        </div>
      </div>

      <ActivityFilter currentFilter={filter} onFilterChange={setFilter} />

      <div className="grid gap-6">
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No activities</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new activity
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Activity
              </button>
            </div>
          </div>
        ) : (
          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onComment={(id) => console.log('Comment on activity:', id)}
              onLike={(id) => console.log('Like activity:', id)}
            />
          ))
        )}
      </div>

      <CreateActivityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

export default ActivitiesPage;