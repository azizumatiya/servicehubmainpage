import React from 'react';

const WashingMachineRepair = () => {
  const repairServices = [
    {
      type: "Automatic Top Load",
      rating: "4.8",
      reviews: "1.2K",
      price: "199",
      image: "https://via.placeholder.com/100x100?text=Top+Load",
      options: "3 options"
    },
    {
      type: "Front Load",
      rating: "4.7",
      reviews: "980",
      price: "199",
      image: "https://via.placeholder.com/100x100?text=Front+Load",
      options: "2 options"
    },
    {
      type: "Semi Automatic",
      rating: "4.6",
      reviews: "750",
      price: "199",
      image: "https://via.placeholder.com/100x100?text=Semi+Auto",
      options: "2 options"
    }
  ];

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Left Column */}
        <div style={{ flex: '1' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Washing Machine</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
              <span style={{ color: '#FFD700', marginRight: '5px' }}>★</span>
              <span style={{ fontWeight: 'bold' }}>4.74</span>
            </div>
            <div style={{ color: '#666' }}>(2.9 M bookings)</div>
          </div>
          
          <div style={{ 
            backgroundColor: '#f0f8ff', 
            padding: '10px 15px', 
            borderRadius: '4px', 
            marginBottom: '20px', 
            display: 'flex', 
            alignItems: 'center' 
          }}>
            <span style={{ marginRight: '10px' }}>🛡️</span>
            <span>Up to 180 days warranty</span>
          </div>
          
          <button style={{ 
            backgroundColor: '#1E90FF', 
            color: 'white', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: '4px', 
            fontSize: '16px', 
            cursor: 'pointer', 
            width: '100%' 
          }}>
            View Services
          </button>
        </div>
        
        {/* Right Column */}
        <div style={{ flex: '2' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Repair</h2>
          
          {repairServices.map((service, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                padding: '15px', 
                border: '1px solid #eee', 
                borderRadius: '8px', 
                marginBottom: '15px' 
              }}
            >
              <div style={{ marginRight: '15px' }}>
                <img 
                  src={service.image} 
                  alt={service.type} 
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} 
                />
              </div>
              
              <div style={{ flex: '1' }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{service.type}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ color: '#FFD700', marginRight: '5px' }}>★</span>
                  <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{service.rating}</span>
                  <span style={{ color: '#666' }}>({service.reviews} reviews)</span>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontWeight: 'bold' }}>Starting from ₹{service.price}</span>
                  <span style={{ color: '#666', marginLeft: '10px' }}>({service.options})</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button style={{ 
                    backgroundColor: '#1E90FF', 
                    color: 'white', 
                    border: 'none', 
                    padding: '6px 12px', 
                    borderRadius: '4px', 
                    fontSize: '14px', 
                    cursor: 'pointer' 
                  }}>
                    Add
                  </button>
                  <button style={{ 
                    backgroundColor: 'transparent', 
                    color: '#1E90FF', 
                    border: 'none', 
                    padding: '6px 12px', 
                    borderRadius: '4px', 
                    fontSize: '14px', 
                    cursor: 'pointer' 
                  }}>
                    View details
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div style={{ 
            backgroundColor: '#f9f9f9', 
            padding: '15px', 
            borderRadius: '8px', 
            marginTop: '10px' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Inspection Charges</span>
              <span>₹199</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Repair Charges (Extra)</span>
              <span>As per requirement</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>Total</span>
              <span>₹199 + Repair charges</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WashingMachineRepair;