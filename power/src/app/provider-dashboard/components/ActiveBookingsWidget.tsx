// frontend/src/app/provider-dashboard/components/ActiveBookingsWidget.tsx
const ActiveBookingsWidget = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Active Bookings</h3>
      <ul>
        <li>Job #101 - Plumbing - John Doe</li>
        <li>Job #102 - Electrical - Jane Smith</li>
        <li>Job #103 - Cleaning - Alice Johnson</li>
      </ul>
    </div>
  );
};

export default ActiveBookingsWidget;