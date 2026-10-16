// src/app/homepage/components/HomeServiceList.tsx

import React from 'react';

// સર્વિસ ના નામની યાદી (જેમ કે સ્ક્રીનશોટમાં આપેલ છે)
const HOME_SERVICES: string[] = [
  '3 to 5 Windows Installation',
  '6+ Windows Installation',
  'Adding an Addition to your Home',
  'Alarm System Installation',
  'Appliance Repair',
  'Asphalt Paving Installation',
  'Basement Remodeling',
  'Blown In Insulation Installation',
  'Cabinets Refinishing',
  'Carpet Installation',
  'Central A/C Repair',
  'Ceramic Tile Installation',
  'Ceramic Tile Repair',
  'Chimney Cleaning',
  'Concrete Foundation Repair',
  'Concrete Installation',
  'Deck Repair/Installation',
  'Drywall Installation',
  'Electrical Installation',
  'Electrical Wiring',
  'Epoxy Coating',
  'Exterior Door Installation',
  'Fence Installation',
  'Front Yard Landscaping',
  'Garage Door Installation Services',
  'Garage Door Opener Repair',
  'Garage Door Repair Services',
  'Gas Piping Installation',
  'Grout Repair',
  'Gutter Cleaning Service',
  'Gutter Installation',
  'Holiday Lighting Help',
  'Home Inspection',
  'Home Organization Service',
  'Home Theater Installation',
  'Install Asphalt Shingle Roofing',
  'Installing Vinyl Siding',
  'Installing Wood Flooring',
  'Interior Decorating Services',
  'Interlocking Pavers for Patios Installation',
  'Kitchen Remodeling',
  'Laminate Wood or Stone Flooring Installation',
  'Landscape Designer',
  'Lawn Fertilizing Services',
  'Major Home Renovations',
  'Mold Inspection',
  'Mold Removal',
  'Patio Installation',
  'Pest Control',
  'Pool Remodeling',
  'Power Washing',
  'Repair Asphalt Shingle Roofing',
  'Rodent Control',
  'Shower Door Installation',
  'Shrub Removal',
  'Sprinkler Repair Services',
  'Sunroom Addition',
  'Swimming Pool Cleaning',
  'Tile Roofing Installation',
  'Tree Removal',
  'Tree Trimming',
  'Wall Repairs',
  'Water Heater Installation',
  'Water Heater Repair',
  'Water Treatment System Installation',
  'Window Glass Installation',
  'Wood Flooring Repair',
  'Bathroom Remodeling',
  'Installing Central A/C',
];

/**
 * ઘરની સેવાઓની સૂચિ દર્શાવતો કમ્પોનન્ટ.
 * Tailwind CSS નો ઉપયોગ કરીને 3-કૉલમ ગ્રીડ લેઆઉટ પ્રદાન કરે છે.
 */
const HomeServiceList: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* વૈકલ્પિક: તમે અહીં એક હેડિંગ ઉમેરી શકો છો */}
      {/* <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">અમારી હોમ સર્વિસીસ</h2> */}
      
      {/* ગ્રીડ કન્ટેનર: નાના સ્ક્રીન પર 1 કૉલમ, મધ્યમ પર 2, અને મોટા પર 3 કૉલમ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
        {HOME_SERVICES.map((service, index) => (
          // દરેક સેવા માટે એક આઇટમ (લિસ્ટેડ આઇટમ તરીકે)
          <div 
            key={index} 
            className="text-gray-700 hover:text-blue-600 transition duration-150 ease-in-out cursor-pointer"
          >
            {/* સેવાના નામનું પ્રદર્શન */}
            {service}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default HomeServiceList;