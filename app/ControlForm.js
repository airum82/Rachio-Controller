import React, { Component } from 'react';

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
        <form onSubmit={(event) => this.props.runAllZones(this.state.duration, event)}>
          <input type="text" name="duration" onChange={(e) => this.handleChange(e)}/>
          <button>run all zones</button>
        </form>
      </div>
    )
  }
}

export default ControlForm;