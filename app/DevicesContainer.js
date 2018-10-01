import React from 'react';
import Device from './Device';
import { NavLink } from 'react-router-dom';

const DevicesContainer = ({ devices }) => {
  return (
    <div className="devices-container">
      { devices.map((device, index) => {
          return (
            <Device
              key={index}
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