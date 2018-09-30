import React, { Component } from 'react';

class ControlForm extends Component {
  constructor() {
    super()
    this.state = {
      sortOrder: [],
      zones: [],
      type: '',
      duration: '0'
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
        <input type="text" name="duration" onChange={(e) => this.handleChange(e)}/>
      </div>
    )
  }
}

export default ControlForm;