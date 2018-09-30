import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
        'Authorization': 'Bearer 76980330-8f0b-4659-a341-527364acf134',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => this.setState({ userInfo: result }))
    .then(error => console.log(error))
  }

  componentDidMount() {
    console.log('fire')
    fetch('https://api.rach.io/1/public/person/info',{
      headers: { 
        'Authorization': 'Bearer 76980330-8f0b-4659-a341-527364acf134',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => this.retrievePersonInfo(result.id))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        Hello Arram!
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

const apiKey = '76980330-8f0b-4659-a341-527364acf134';