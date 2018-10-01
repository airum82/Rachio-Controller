import React from 'react';
import Zone from './Zone';

const ZonesContainer = ({ zones, selectZone }) => {
  return (
    <div className="zones-container">
      { zones.map((zone, index) => {
        return (
          <Zone 
            name={zone.name}
            id={zone.id}
            key={index}
            image={zone.imageUrl}
            selectZone={selectZone}
          />
        )
      })}
    </div>
  )
}

export default ZonesContainer;