import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import BookingFlowInteractive from './components/BookingFlowInteractive';

export const metadata: Metadata = {
  title: 'Service Booking Flow - ServiceHub Pro',
  description: 'Book verified professionals for your home and business needs through our secure multi-step booking process with provider selection, scheduling, and payment.',
};

export default function ServiceBookingFlowPage() {
  return (
    <>
      <Header />
      <BookingFlowInteractive />
    </>
  );
}