import React, { Component } from 'react';
import { apiKey } from '../APIkey';

class Zone extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      duration: 0
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.startZone = this.startZone.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  toggleForm() {
    this.setState({ showForm: !this.state.showForm });
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  startZone(event) {
    event.preventDefault();
    console.log(parseInt(this.state.duration))
    fetch('https://api.rach.io/1/public/zone/start', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        id: this.props.id,
        duration: parseInt(this.state.duration)
      })
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error.message))
  }

  render() {
    return (
      <div className="zone" id={this.props.id}>
        <h3>{this.props.name}</h3>
        <img src={this.props.image} alt="picture of this particular zone" />
        <button onClick={this.toggleForm}>
          {this.state.showForm ? 'cancel' : 'start zone'}
        </button>
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