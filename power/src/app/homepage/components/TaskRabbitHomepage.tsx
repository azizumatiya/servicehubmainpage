import React from 'react';

const TaskRabbitHomepage = () => {
  const services = [
    { name: "Assembly", icon: "🔧" },
    { name: "Mounting", icon: "🖼️" },
    { name: "Cleaning", icon: "🧹" },
    { name: "Moving Help", icon: "📦" },
    { name: "Handyman", icon: "🔨" },
    { name: "Personal Assistant", icon: "👤" }
  ];

  const popularServices = [
    "General Furniture Assembly",
    "TV Mounting",
    "IKEA Furniture Assembly",
    "Home Cleaning",
    "Heavy Lifting",
    "Yard Work & Gardening"
  ];

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px' 
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Taskrabbit</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>How it works</span>
          <span>Popular Tasks</span>
          <span>Log in</span>
        </div>
      </div>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Book trusted help for home tasks</h1>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '30px' 
        }}>
          <input 
            type="text" 
            placeholder="What do you need help with?" 
            style={{ 
              width: '500px', 
              padding: '12px 20px', 
              border: '1px solid #ddd', 
              borderRadius: '4px 0 0 4px', 
              fontSize: '16px' 
            }} 
          />
          <button style={{ 
            backgroundColor: '#ff6900', 
            color: 'white', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: '0 4px 4px 0', 
            fontSize: '16px', 
            cursor: 'pointer' 
          }}>
            Get Prices
          </button>
        </div>
      </div>
      
      {/* Services Grid */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Popular Services</h2>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: '20px' 
        }}>
          {services.map((service, index) => (
            <div 
              key={index} 
              style={{ 
                width: '150px', 
                textAlign: 'center', 
                padding: '20px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>{service.icon}</div>
              <div style={{ fontSize: '16px' }}>{service.name}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Popular Services Tags */}
      <div>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Browse by Task</h2>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: '10px' 
        }}>
          {popularServices.map((service, index) => (
            <div 
              key={index} 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#f5f5f5', 
                borderRadius: '20px', 
                cursor: 'pointer'
              }}
            >
              {service}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskRabbitHomepage;