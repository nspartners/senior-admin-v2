export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'resident' | 'family';
  organizationId: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface Resident {
  id: string;
  name: string;
  roomNumber: string;
  dateOfBirth: string;
  emergencyContact: EmergencyContact;
  careTeamIds: string[];
  familyMemberIds: string[];
  groupIds: string[];
}

export interface MediaItem {
  id: string;
  url: string;
  residentId: string;
  residentName: string;
  caption: string;
  timestamp: string;
  uploadedBy: {
    id: string;
    name: string;
  };
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type?: 'group' | 'individual' | 'medical';
  createdBy: {
    id: string;
    name: string;
  };
  media: Array<{
    type: 'image' | 'video';
    url: string;
  }>;
  comments: Array<{
    id: string;
    userName: string;
    content: string;
    timestamp: string;
  }>;
  likes?: string[];
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

export interface MessageThread {
  id: string;
  subject: string;
  lastMessage: string;
  lastMessageAt: string;
  participants: Array<{
    id: string;
    name: string;
    role: string;
  }>;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  residentId?: string;
}