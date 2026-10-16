interface ServiceCardProps {
  name: string;
  provider: string;
  rating: number;
  city: string;
}

export default function ServiceCard({
  name,
  provider,
  rating,
  city,
}: ServiceCardProps) {
  return (
    <div className="border border-border bg-card rounded-lg p-5 shadow-sm hover:shadow-md transition-all">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-muted-foreground">By {provider}</p>
      <p className="text-sm mt-1">City: {city}</p>
      <p className="text-yellow-500 mt-1">⭐ {rating}</p>
    </div>
  );
}
