import React from 'react';

const Device = ({ id, name, zones }) => {
  return (
    <div className="device" id={id}>
      <h3>{name}</h3>
    </div>
  )
}

export default Device
