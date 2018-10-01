import React from 'react';
import Zone from './Zone';

const ZonesContainer = ({ zones, history }) => {
  return (
    <div className="zones-container">
      <button onClick={history.goBack}>back</button>
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