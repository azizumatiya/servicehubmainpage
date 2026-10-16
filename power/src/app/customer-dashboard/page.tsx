import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import CustomerDashboardInteractive from './components/CustomerDashboardInteractive';

export const metadata: Metadata = {
  title: 'Customer Dashboard - ServiceHub Pro',
  description: 'Manage your bookings, track services, view payment history, and connect with favorite providers in your personalized customer dashboard.',
};

export default function CustomerDashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CustomerDashboardInteractive />
    </main>
  );
}