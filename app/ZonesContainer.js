import React from 'react';
import Zone from './Zone';

const ZonesContainer = ({ zones }) => {
  return (
    <div className="zones-container">
      { zones.map((zone, index) => {
        return (
          <Zone 
            name={zone.name}
            id={zone.id}
            key={index}
            image={zone.imageUrl}
          />
        )
      })}
    </div>
  )
}

export default ZonesContainer;