import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HomepageInteractive from './components/HomepageInteractive';
import ApplianceServiceRepair from './components/ApplianceServiceRepair';
import HomeServicesList from './components/HomeServicesList';
import TaskRabbitHomepage from './components/TaskRabbitHomepage';
import JustdialPlatform from './components/JustdialPlatform';
import WashingMachineRepair from './components/WashingMachineRepair';

export const metadata: Metadata = {
  title: 'Homepage - ServiceHub Pro',
  description: 'Find verified local service providers for home repairs, cleaning, landscaping, and more. Connect with trusted professionals in your area with guaranteed quality service.',
};

export default function Homepage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - TaskRabbit style */}
      <section className="py-12 bg-white">
        <TaskRabbitHomepage />
      </section>
      
      {/* Appliance Service & Repair Section */}
      <section className="py-12 bg-gray-50">
        <ApplianceServiceRepair />
      </section>
      
      {/* Home Services List Section */}
      <section className="py-12 bg-white">
        <HomeServicesList />
      </section>
      
      {/* Justdial Platform Section */}
      <section className="py-12 bg-gray-50">
        <JustdialPlatform />
      </section>
      
      {/* Washing Machine Repair Section */}
      <section className="py-12 bg-white">
        <WashingMachineRepair />
      </section>
      
      {/* Interactive Section (if needed) */}
      <section className="py-12 bg-gray-50">
        <HomepageInteractive />
      </section>
    </main>
  );
}