import React from 'react';
import { Search } from 'lucide-react';
import type { Resident } from '../../types';

interface MediaFilterProps {
  residents: Resident[];
  selectedResident: string;
  searchTerm: string;
  onResidentChange: (residentId: string) => void;
  onSearchChange: (term: string) => void;
}

export function MediaFilter({
  residents,
  selectedResident,
  searchTerm,
  onResidentChange,
  onSearchChange,
}: MediaFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="resident" className="block text-sm font-medium text-gray-700">
              Filter by Resident
            </label>
            <select
              id="resident"
              value={selectedResident}
              onChange={(e) => onResidentChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
            >
              <option value="">All Residents</option>
              {residents.map((resident) => (
                <option key={resident.id} value={resident.id}>
                  {resident.name} - Room {resident.roomNumber}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search Media
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 rounded-md border-gray-300 focus:ring-brand-500 focus:border-brand-500"
                placeholder="Search by caption or resident name..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}