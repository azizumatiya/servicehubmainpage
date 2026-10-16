// Type definitions for admin dashboard entities
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  registrationDate: string;
  lastLogin: string | null;
  totalOrders: number;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: 'Website Form' | 'Email Campaign' | 'Referral' | 'Social Media' | string;
  status: 'new' | 'contacted' | 'qualified' | 'lost' | string;
  createdDate: string;
  assignedTo: string;
  budget: string;
  notes: string;
}

export interface Listing {
  id: number;
  title: string;
  description: string;
  price: string;
  status: 'active' | 'pending' | 'inactive' | 'expired';
  location: string;
  providerId: number;
  createdDate: string;
  views: number;
  inquiries: number;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  status: 'active' | 'pending' | 'inactive';
  manager: string;
  capacity: number;
  createdDate: string;
  phone: string;
  email: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'error' | 'success' | 'warning';
  recipient: string;
  sentDate: string;
  status: 'sent' | 'pending' | 'failed';
  read: boolean;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  price: string;
  status: 'active' | 'pending' | 'inactive';
  features: string[];
  createdDate: string;
  subscribers: number;
}

export interface Review {
  id: number;
  author: string;
  rating: number; // 1-5
  comment: string;
  listingId: number;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}