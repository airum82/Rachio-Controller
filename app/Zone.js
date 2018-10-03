import React, { Component } from 'react';
import { apiKey } from '../APIkey';

class Zone extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      duration: 0,
      selected: false,
      error: ''
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.startZone = this.startZone.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  toggleForm() {
    this.setState({ showForm: !this.state.showForm });
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSelect() {
    this.props.selectZone(this.props.id)
    this.setState({ selected: !this.state.selected })
  }

  startZone(event) {
    event.preventDefault();
    const body = {
      id: this.props.id,
      duration: parseInt(this.state.duration)
    };
    return fetch('https://api.rach.io/1/public/zone/start', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .then(() => this.toggleForm())
    .catch(error => this.setState({ error: error.message }))
  }

  render() {
    return (
      <div className="zone" id={this.props.id}>
        <h3 className="zone-title">{this.props.name}</h3>
        <img 
          className={this.state.selected ? 'selected' : ''}
          onClick={this.handleSelect}
          src={this.props.image} 
          alt="picture of this particular zone" 
        />
        <div className="zone-buttons">
          <button 
            onClick={this.toggleForm}
            className="toggle-form"
          >
            {this.state.showForm ? 'cancel' : 'start zone'}
          </button>
          <button 
            onClick={this.handleSelect}
            className="select-zone"
          >
            {this.state.selected ? 'unselect' : 'select zone'}
          </button>
        </div>
       <form 
        className={this.state.showForm ? 'zone-form' : 'hidden-form'}
        onSubmit={this.startZone}
       >
        <h4>duration</h4>
        <input name="duration" type="text" onChange={this.handleInput}/>
        <button>start</button>
       </form>
      </div>
    )
  }
}

export default Zone;