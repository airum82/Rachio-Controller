import React from 'react';
import Device from './Device';

const DevicesContainer = ({ devices }) => {
  return (
    <div className="devices-container">
      { devices.map(device => {
          return (
            <Device
              id={device.id}
              name={device.name}
              zones={device.zones}
            />
          )
        })}
    </div>
  )
}

export default DevicesContainer;