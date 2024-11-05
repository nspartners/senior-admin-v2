import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { LoadingSpinner } from './components/common/LoadingSpinner';

// Lazy load routes
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const UserManagement = React.lazy(() => import('./pages/admin/UserManagement'));
const CareTeamAssignment = React.lazy(() => import('./pages/admin/CareTeamAssignment'));
const MediaGallery = React.lazy(() => import('./pages/admin/MediaGallery'));
const ActivitiesPage = React.lazy(() => import('./pages/activities/ActivitiesPage'));
const MessagesPage = React.lazy(() => import('./pages/messages/MessagesPage'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/care-teams" element={<CareTeamAssignment />} />
              <Route path="/admin/media" element={<MediaGallery />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/messages" element={<MessagesPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;