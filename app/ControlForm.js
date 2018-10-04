import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ControlForm extends Component {
  constructor() {
    super()
    this.state = {
      sortOrder: [],
      zones: [],
      type: '',
      duration: '0',
      zoneId: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {
    return (
      <div className="form">
        <h2>duration:</h2>
        <form 
          onSubmit={(event) => this.props.runAllZones(this.state.duration, event)}
          className="control-form"
        >
          <input type="text" name="duration" onChange={(e) => this.handleChange(e)}/>
          <button>run all zones</button>
        </form>
      </div>
    )
  }
}

export default ControlForm;

ControlForm.propTypes = {
  runAllZones: PropTypes.func
}