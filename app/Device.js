import React from 'react';
import ZonesContainer from './ZonesContainer'

const Device = ({ id, name, zones }) => {
  return (
    <div className="device" id={id}>
      <h3>{name}</h3>
      <ZonesContainer zones={zones} />
    </div>
  )
}

export default Device
