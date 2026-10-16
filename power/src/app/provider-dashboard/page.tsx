import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ProviderDashboardInteractive from './components/ProviderDashboardInteractive';

export const metadata: Metadata = {
  title: 'Provider Dashboard - ServiceHub Pro',
  description: 'Manage your business profile, track leads and earnings, schedule availability, and grow your service business with comprehensive provider tools and analytics.',
};

export default function ProviderDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
       
        <ProviderDashboardInteractive />
      </main>
    </div>
  );
}
