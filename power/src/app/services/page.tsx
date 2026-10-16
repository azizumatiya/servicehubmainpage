import CategoryGrid from "./components/CategoryGrid";
import ServiceSearch from "./components/ServiceSearch";
import Header from "@/components/common/Header";


export default function ServicesPage() {
  return (
    
    <main className="">
<div>
        <Header />
    </div>
      {/* <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Our Services</h1>
        <p className="text-muted-foreground text-lg">
          Explore and book from our top-rated professional services
        </p>
      </div>
      <ServiceSearch /> */}

      <CategoryGrid />
    </main>
  );
}
