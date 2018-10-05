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
    };
    this.runZones = this.runZones.bind(this);
    this.selectZone = this.selectZone.bind(this);
  }

  runZones(duration, event) {
    event.preventDefault()
    let source;
    if(this.state.selectedZones.length) {
      source = this.state.selectedZones
    } else {
      source = this.state.zoneIdList
    }
    const body = {
      zones: source.map((zone, index) => {
        return {
          id: zone.id || zone,
          duration: parseInt(duration),
          sortOrder: parseInt(zone.sortOrder) || index
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
    .then(result => {
      if(result) {
        this.setState(
          { error: 'something went wrong, most likely at least one of these zones is not enabled' });
          setTimeout(() => {
            this.setState({ error: ''})
          }, 4000);
      }
    })
    .catch(error => console.log(error.message))
  }

  selectZone(id, sortOrder) {
    const isSelected = this.state.selectedZones.some(zone => {
      return zone.id === id
    })
    if(isSelected) {
      this.setState({
        selectedZones: this.state.selectedZones.filter(zone => {
          return zone.id !== id
        })
      })
    } else {
      this.setState({ 
        selectedZones: [...this.state.selectedZones, { id, sortOrder }]
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
        <ControlForm runZones={this.runZones}/>
        { this.state.error ? <p>{this.state.error}</p> : ''}
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
  id: PropTypes.string || PropTypes.number,
  name: PropTypes.string,
  zones: PropTypes.array,
  history: PropTypes.object
}
