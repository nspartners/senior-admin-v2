import React from 'react';
import { Filter } from 'lucide-react';

interface ActivityFilterProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ActivityFilter({ currentFilter, onFilterChange }: ActivityFilterProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center space-x-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <div className="flex space-x-2">
          {['all', 'group', 'individual', 'medical'].map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentFilter === filter
                  ? 'bg-brand-100 text-brand-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}