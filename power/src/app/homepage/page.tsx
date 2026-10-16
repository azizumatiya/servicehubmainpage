
import type { Metadata } from 'next';


// ----------------------------------------------------
// 1. નવા પાથ અને નામકરણ મુજબ કમ્પોનન્ટ્સ import કરો
import HomeAppliancesPreview from '@/app/homepage/components/HomeAppliancesPreview';
import ElectricalPreview from '@/app/homepage/components/ElectricalPreview';
import ElectronicsPreview from '@/app/homepage/components/ElectronicsPreview';
import PlumbingPreview from '@/app/homepage/components/PlumbingPreview';
import FurniturePreview from '@/app/homepage/components/FurniturePreview';
import Header from '@/components/common/Header';
import HomepageInteractive from './components/HomepageInteractive';
import ApplianceServiceRepair from './components/ApplianceServiceRepair';
import HomeServicesList from './components/HomeServicesList';
import TaskRabbitHomepage from './components/TaskRabbitHomepage';
import JustdialPlatform from './components/JustdialPlatform';
import WashingMachineRepair from './components/WashingMachineRepair';
import SmartServiceFinder from './components/SmartServiceFinder';
import SearchBar from './components/searchbar';
import Herosection from '@/app/homepage/components/HeroSection';
import Mainpage from './components/mainpage';
// import DHome from './components/Dhome';
// ----------------------------------------------------

// તમે ઉપયોગ ન કરેલા કમ્પોનન્ટ્સ દૂર કર્યા
// import HomepageInteractive from './components/HomepageInteractive'; 
// import JustdialPlatform from './components/JustdialPlatform';
// import ApplianceServiceRepair from './components/ApplianceServiceRepair';
// import HomeServicesList from './components/HomeServicesList';
// import WashingMachineRepair from './components/WashingMachineRepair';
// import TaskRabbitHomepage from './components/TaskRabbitHomepage';


export const metadata: Metadata = {
  title: 'Homepage - ServiceHub Pro | All Technical Services',
  description: 'Find verified local service providers for home repairs, cleaning, plumbing, electrical and electronic repairs. Connect with trusted professionals in your area with guaranteed quality service.',
};


export default function Homepage() {
  return (
    <main className=" bg-gray-50">
      <Header />

      <Herosection />
    

      <Mainpage />
        
      {/* Justdial Platform Section */}
      {/* <section className="py-6 bg-white">
        <JustdialPlatform />
      </section> */}
    
{/*    
      {/* 1. HOME APPLIANCES (Background: White) */}
      <section>
        <HomeAppliancesPreview />
      </section>
{/* 
      <section>
        <SmartServiceFinder />
      </section> */}
      {/* <DHome /> */}

      
      {/* 2. ELECTRICAL TECHNICIANS (Background: Light Gray) */}
      <section className="">
        <ElectricalPreview />
      </section>
      
      {/* 3. ELECTRONICS REPAIR (Background: White) */}
      <section className="">
        <ElectronicsPreview />
      </section>
      
      {/* 4. PLUMBING & WATER SYSTEM (Background: Light Gray) */}
      <section className="">
        <PlumbingPreview />
      </section>
      
      {/* 5. FURNITURE & WOODWORK (Background: White) */}
      <section className="">
        <FurniturePreview />
      </section>
 
    
      
      
      {/* Interactive Section (if needed) */}
      <section className="bg-gray-50">
        <HomepageInteractive />
      </section>


      {/* Home Services List Section */}
      <section className="py-12 bg-white">
        <HomeServicesList />  
      </section>
    

    </main>
  );
}