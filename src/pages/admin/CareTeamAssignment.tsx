import React, { useState } from 'react';
import { Search, Users, UserPlus, X, Plus, UsersRound } from 'lucide-react';
import type { User, Resident } from '../../types';

const mockStaff: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'staff',
    organizationId: '1',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    role: 'staff',
    organizationId: '1',
  },
];

const mockResidents: Resident[] = [
  {
    id: '1',
    name: 'Alice Thompson',
    roomNumber: '101',
    dateOfBirth: '1945-03-15',
    emergencyContact: {
      name: 'Bob Thompson',
      phone: '555-0123',
      relationship: 'Son',
    },
    careTeamIds: ['1'],
    familyMemberIds: [],
    groupIds: ['1'],
  },
  {
    id: '2',
    name: 'John Smith',
    roomNumber: '102',
    dateOfBirth: '1942-06-22',
    emergencyContact: {
      name: 'Mary Smith',
      phone: '555-0124',
      relationship: 'Daughter',
    },
    careTeamIds: ['2'],
    familyMemberIds: [],
    groupIds: ['1'],
  },
];

const mockGroups = [
  { id: '1', name: 'Floor 1', description: 'First floor residents' },
  { id: '2', name: 'Memory Care', description: 'Memory care unit residents' },
];

function CareTeamAssignment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<typeof mockGroups[0] | null>(null);
  const [selectedResidents, setSelectedResidents] = useState<Resident[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<User[]>([]);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  const handleStaffSelection = (staff: User) => {
    if (!selectedStaff.find(s => s.id === staff.id)) {
      setSelectedStaff([...selectedStaff, staff]);
    }
  };

  const handleRemoveStaff = (staffId: string) => {
    setSelectedStaff(selectedStaff.filter(s => s.id !== staffId));
  };

  const handleResidentSelection = (resident: Resident) => {
    if (!selectedResidents.find(r => r.id === resident.id)) {
      setSelectedResidents([...selectedResidents, resident]);
    }
  };

  const handleRemoveResident = (residentId: string) => {
    setSelectedResidents(selectedResidents.filter(r => r.id !== residentId));
  };

  const handleGroupSelect = (group: typeof mockGroups[0]) => {
    setSelectedGroup(group);
    setSelectedResidents(mockResidents.filter(r => r.groupIds.includes(group.id)));
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for creating a new group would go here
    setIsCreatingGroup(false);
    setNewGroupName('');
    setNewGroupDescription('');
  };

  const filteredResidents = mockResidents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Care Team Assignment</h2>
          <p className="mt-1 text-sm text-gray-500">
            Assign care team members to resident groups
          </p>
        </div>
        <button
          onClick={() => setIsCreatingGroup(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Group
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Groups List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Resident Groups</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {mockGroups.map((group) => (
              <li
                key={group.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedGroup?.id === group.id ? 'bg-brand-50' : ''
                }`}
                onClick={() => handleGroupSelect(group)}
              >
                <div className="flex items-center">
                  <UsersRound className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{group.name}</p>
                    <p className="text-sm text-gray-500">{group.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Resident Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Select Residents</h3>
            <div className="mt-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Search residents..."
                />
              </div>
            </div>
          </div>
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {filteredResidents.map((resident) => (
              <li
                key={resident.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedResidents.find(r => r.id === resident.id) ? 'bg-brand-50' : ''
                }`}
                onClick={() => handleResidentSelection(resident)}
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{resident.name}</p>
                    <p className="text-sm text-gray-500">Room {resident.roomNumber}</p>
                  </div>
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Staff Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Available Staff</h3>
          </div>
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {mockStaff.map((staff) => (
              <li
                key={staff.id}
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleStaffSelection(staff)}
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{staff.name}</p>
                    <p className="text-sm text-gray-500">{staff.email}</p>
                  </div>
                  <UserPlus className="h-5 w-5 text-gray-400" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Selected Team & Residents */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Selected Care Team</h3>
            {selectedGroup && (
              <p className="mt-1 text-sm text-gray-500">
                for {selectedGroup.name}
              </p>
            )}
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Residents</h4>
              {selectedResidents.length > 0 ? (
                <ul className="space-y-2">
                  {selectedResidents.map((resident) => (
                    <li key={resident.id} className="flex items-center justify-between text-sm">
                      <span>{resident.name}</span>
                      <button
                        onClick={() => handleRemoveResident(resident.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No residents selected</p>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Staff</h4>
              {selectedStaff.length > 0 ? (
                <ul className="space-y-2">
                  {selectedStaff.map((staff) => (
                    <li key={staff.id} className="flex items-center justify-between text-sm">
                      <span>{staff.name}</span>
                      <button
                        onClick={() => handleRemoveStaff(staff.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No staff members selected</p>
              )}
            </div>

            {(selectedResidents.length > 0 || selectedStaff.length > 0) && (
              <button className="w-full mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700">
                Save Assignments
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Create Group Modal */}
      {isCreatingGroup && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setIsCreatingGroup(false)} />
            <div className="relative bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Group</h3>
              <form onSubmit={handleCreateGroup}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">
                      Group Name
                    </label>
                    <input
                      type="text"
                      id="groupName"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="groupDescription" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="groupDescription"
                      value={newGroupDescription}
                      onChange={(e) => setNewGroupDescription(e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsCreatingGroup(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-md"
                    >
                      Create Group
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CareTeamAssignment;