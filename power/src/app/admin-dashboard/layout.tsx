import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - ServiceHub Pro',
  description: 'Comprehensive management system for verification, moderation, analytics, and platform optimization with provider verification tools and dispute resolution.',
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}