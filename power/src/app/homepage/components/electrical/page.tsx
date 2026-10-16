import Image from "next/image";

export default function ElectricalPage() {
  const services = [
    { name: "Residential Electrician", img: "/images/electrical/residential.jpg" },
    { name: "Commercial Electrician", img: "/images/electrical/commercial.jpg" },
    { name: "Meter / Fuse Repair", img: "/images/electrical/meter.jpg" },
    { name: "Switchboard / Fan / Light Installation", img: "/images/electrical/fan.jpg" },
    { name: "Inverter Installation & Repair", img: "/images/electrical/inverter.jpg" },
  ];

  return (
    <PageWrapper title="All Electrical Technicians" services={services} />
  );
}

function PageWrapper({ title, services }) {
  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-full h-48 rounded-xl overflow-hidden shadow-md">
              <Image
                src={s.img}
                width={500}
                height={300}
                alt={s.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-lg font-semibold text-center">{s.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
