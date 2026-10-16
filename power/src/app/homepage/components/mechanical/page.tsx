import Image from "next/image";

export default function MechanicalPage() {
  const services = [
    { name: "Motor Repair Technician", img: "/images/mechanical/motor.jpg" },
    { name: "Pump Technician", img: "/images/mechanical/pump.jpg" },
    { name: "Generator Technician", img: "/images/mechanical/generator.jpg" },
    { name: "Industrial Machine Technician", img: "/images/mechanical/industrial.jpg" },
  ];

  return (
    <PageWrapper title="All Mechanical & Machine Technicians" services={services} />
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
