import React, { Component } from 'react';
import ZonesContainer from './ZonesContainer'
import { apiKey } from '../APIkey';
import ControlForm from './ControlForm';
import PropTypes from 'prop-types';

class Device extends Component {
  constructor() {
    super();
    this.state = {
      selectedZones: [],
      zoneIdList: [],
      error: ''
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
    return fetch("https://api.rach.io/1/public/zone/start_multiple", {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => this.setState({ error: error.message }))
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
        <h2 className="device-title">{this.props.name}</h2>
        <button 
          onClick={this.props.history.goBack}
          className="back-button"
        >
          back
        </button>
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

Device.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  zones: PropTypes.array,
  history: PropTypes.object
}
