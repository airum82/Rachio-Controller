import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { apiKey } from '../APIkey';
import sprinklers from '../sprinklers.gif'
import DevicesContainer from './DevicesContainer';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      userInfo: {},
      isLoading: true
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
    .then(result => this.setState({ userInfo: result, isLoading: false }))
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
      <div className="main">
        { this.state.isLoading ?
          <div className="loading">
          <h1>Retrieving Devices Now</h1>
          <img src={sprinklers} alt="moving sprinklers to watch while we fetch your content" />
          </div> 
          :
          <div className="main-display">
            <h1>Hello Arram!</h1>
            <DevicesContainer devices={devices} />
          </div >
      }
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);