import React, { Component } from 'react';
import ZonesContainer from './ZonesContainer'
import { apiKey } from '../APIkey';
import ControlForm from './ControlForm';

class Device extends Component {
  constructor() {
    super();
    this.state = {
      selectedZones: [],
      zoneIdList: []
    }
    this.runAllZones = this.runAllZones.bind(this);
    this.selectZone = this.selectZone.bind(this);
  }

  runAllZones(duration, event) {
    event.preventDefault()
    const body = {
      zones: this.state.zoneIdList.map((id, index) => {
        return {
          id,
          duration: parseInt(duration),
          sortOrder: index + 1
        }
      })
    }
    console.log(body)
    fetch("https://api.rach.io/1/public/zone/start_multiple", {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log(error.message))
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

  componentDidMount() {
    this.setState({
      zoneIdList: this.props.zones.map(zone => {
        return zone.id
      })
    })
  }

  render() {
    return (
      <div className="device" id={this.props.id}>
        <h2>{this.props.name}</h2>
        <button onClick={this.props.history.goBack}>back</button>
        <ControlForm runAllZones={this.runAllZones}/>
        <ZonesContainer 
          zones={this.props.zones}
          selectZone={this.selectZone}
        />
      </div>
    )
  }
}

export default Device
