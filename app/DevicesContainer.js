import React from 'react';
import Device from './Device';
import { NavLink, Route } from 'react-router-dom';

const DevicesContainer = ({ devices }) => {
  return (
    <div className="devices-container">
      { devices.map((device, index) => {
          return (
            <div className="devices" key={index}>
              <Route exact path='/' render={() => {
                return (
                  <NavLink to={`/${device.id}`} className="device-link">
                    {device.name + ': ' + device.status}
                  </NavLink>
                )
              }} />
              <Route exact path={`/${device.id}`} render={({ history }) => {
                return (
                  <Device
                    id={device.id}
                    name={device.name}
                    zones={device.zones}
                    history={history}
                  />
                )
              }} />
            </div>
          )
        })}
    </div>
  )
}

export default DevicesContainer;