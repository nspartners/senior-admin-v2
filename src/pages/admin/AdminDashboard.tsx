import React from 'react';
import { Users, Activity, Calendar, MessageSquare } from 'lucide-react';

function AdminDashboard() {
  const stats = [
    { name: 'Total Residents', value: '156', icon: Users, change: '+12', changeType: 'increase' },
    { name: 'Active Care Teams', value: '23', icon: Users, change: '+4', changeType: 'increase' },
    { name: 'Activities Today', value: '47', icon: Activity, change: '+8', changeType: 'increase' },
    { name: 'Pending Messages', value: '12', icon: MessageSquare, change: '-3', changeType: 'decrease' },
  ];

  const recentActivities = [
    { id: 1, type: 'assignment', content: 'New care team assigned to Alice Thompson', time: '2 hours ago' },
    { id: 2, type: 'message', content: 'Family message received for Robert Wilson', time: '4 hours ago' },
    { id: 3, type: 'activity', content: 'Group activity: Morning Yoga completed', time: '5 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
            <Calendar className="h-5 w-5 mr-2" />
            View Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.content}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;