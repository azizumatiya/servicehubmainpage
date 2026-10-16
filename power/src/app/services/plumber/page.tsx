import ServiceCard from "../components/ServiceCard";

export default function PlumberPage() {
  const plumbers = [
    { name: "FlowFix Plumbing", provider: "Karan Shah", rating: 4.6, city: "Rajkot" },
    { name: "PipeMaster Services", provider: "Arjun Patel", rating: 4.7, city: "Surat" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Plumber Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {plumbers.map((item) => (
          <ServiceCard key={item.name} {...item} />
        ))}
      </div>
    </main>
  );
}
