import React, { Component } from 'react';
import ZonesContainer from './ZonesContainer'
import { apiKey } from '../APIkey';
import ControlForm from './ControlForm';

class Device extends Component {
  constructor() {
    super();
    this.state = {
      zoneIdList: []
    }
    this.runAllZones = this.runAllZones.bind(this);
  }

  runAllZones(zoneIdList, duration, sortOrder) {
    const zoneSettings = {
      
    }
    fetch("http://api.rach.io/1/public/zone/start_multiple", {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    })
  }

  render() {
    return (
      <div className="device" id={this.props.id}>
        <h2>{this.props.name}</h2>
        <ControlForm />
        <ZonesContainer zones={this.props.zones} />
      </div>
    )
  }
}

export default Device
