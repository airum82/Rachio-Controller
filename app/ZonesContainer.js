import React from 'react';
import Zone from './Zone';
import PropTypes from 'prop-types';

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
            enabled={zone.enabled}
          />
        )
      })}
    </div>
  )
}

export default ZonesContainer;

ZonesContainer.propTypes = {
  zones: PropTypes.array,
  selectZone: PropTypes.func
}