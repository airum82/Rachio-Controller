import React, { Component } from 'react';
import ZonesContainer from './ZonesContainer'
import { apiKey } from '../APIkey';
import ControlForm from './ControlForm';

class Device extends Component {
  constructor() {
    super();
    this.state = {
      selectedZones: [],
      zoneIdList: this.props.zones.map(zone => {
        return zone.id
      })
    }
    this.runAllZones = this.runAllZones.bind(this);
    this.selectZone = this.selectZone.bind(this);
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

  selectZone(id) {
    const isSelected = this.state.selectedZones.some(zone => {
      return zone === id
    })
    if(isSelected) {
      this.setState({
        selectedZones: this.state.selectedZones.filter(zone => {
          return zone !== id
        })
      })
    } else {
      this.setState({ 
        selectedZones: [...this.state.selectedZones, id]
      })
    }
  }

  render() {
    return (
      <div className="device" id={this.props.id}>
        <h2>{this.props.name}</h2>
        <button onClick={this.props.history.goBack}>back</button>
        <ControlForm />
        <ZonesContainer 
          zones={this.props.zones}
          selectZone={this.selectZone}
        />
      </div>
    )
  }
}

export default Device
