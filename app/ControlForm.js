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

  startZone() {

  }

  render() {
    return (
      <div className="form">
        <form>
          <input type="text" name="duration" onChange={(e) => this.handleChange(e)}/>
        </form>
      </div>
    )
  }
}

export default ControlForm;