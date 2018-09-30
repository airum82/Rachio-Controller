import React from 'react';
import ZonesContainer from './ZonesContainer'

const Device = ({ id, name, zones }) => {
  return (
    <div className="device" id={id}>
      <h2>{name}</h2>
      <ZonesContainer zones={zones} />
    </div>
  )
}

export default Device
