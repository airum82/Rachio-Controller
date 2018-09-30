import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { apiKey } from '../APIkey';
import DevicesContainer from './DevicesContainer';
import './index.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      userInfo: {}
    }
  }

  retrievePersonInfo(id) {
    fetch(`https://api.rach.io/1/public/person/${id}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => this.setState({ userInfo: result }))
    .then(error => console.log(error))
  }

  componentDidMount() {
    fetch('https://api.rach.io/1/public/person/info',{
      headers: { 
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => this.retrievePersonInfo(result.id))
      .catch(error => console.log(error))
  }

  render() {
    const { devices } = this.state.userInfo
    return (
      <div>
        <h1>Hello Arram!</h1>
        <DevicesContainer devices={devices}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);