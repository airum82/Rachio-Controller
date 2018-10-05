import React, { Component } from 'react';
import { apiKey } from '../APIkey';
import sprinklers from '../sprinklers.gif';
import DevicesContainer from './DevicesContainer';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import 'normalize.css';

export class App extends Component {
  constructor () {
    super()
    this.state = {
      userInfo: {},
      isLoading: true,
      error: ''
    }
  }

  retrievePersonInfo (id) {
    return fetch(`https://api.rach.io/1/public/person/${id}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => this.setState({ userInfo: result, isLoading: false }))
      .catch(error => this.setState({ error: error.message }))
  }

  componentDidMount () {
    fetch('https://api.rach.io/1/public/person/info', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => this.retrievePersonInfo(result.id))
      .catch(error => this.setState({ error: error.message }))
  }

  render () {
    const { devices, fullName } = this.state.userInfo
    return (
      <div className="main">
        {this.state.isLoading ?
          <div className="loading">
            <h1 className="title">Retrieving Devices Now</h1>
            <img src={sprinklers} alt="moving sprinklers to watch while we fetch your content" />
          </div>
          : <div className="main-display">
            <h1 className="title">Hello {fullName}</h1>
            <Route
              exact path="/"
              render={() => {
                return (
                  <h2 className="devices-intro">Your Devices:</h2>
                )
              }}
            />
            <DevicesContainer devices={devices} />
          </div >
        }
      </div>
    )
  }
}