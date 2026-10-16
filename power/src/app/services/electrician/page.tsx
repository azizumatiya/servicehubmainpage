import ServiceCard from "../components/ServiceCard";

export default function ElectricianPage() {
  const electricians = [
    { name: "Amit Electric Works", provider: "Amit Patel", rating: 4.8, city: "Ahmedabad" },
    { name: "PowerFix Electricals", provider: "Rajesh Mehta", rating: 4.7, city: "Surat" },
    { name: "LightPro Services", provider: "Nirav Shah", rating: 4.9, city: "Vadodara" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Electrician Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {electricians.map((item) => (
          <ServiceCard key={item.name} {...item} />
        ))}
      </div>
    </main>
  );
}
