import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ControlForm extends Component {
  constructor () {
    super()
    this.state = {
      sortOrder: [],
      zones: [],
      type: '',
      duration: '0',
      zoneId: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div className="form">
        <h2>run zones</h2>
        <h3>duration(in seconds):</h3>
        <form
          onSubmit={(event) => this.props.runZones(this.state.duration, event)}
          className="control-form"
        >
          <input type="text" name="duration" onChange={(e) => this.handleChange(e)}/>
          <button>run zones</button>
        </form>
        <p>(This will run all zones if no zones are selected)</p>
      </div>
    )
  }
}

export default ControlForm

ControlForm.propTypes = {
  runZones: PropTypes.func
}
