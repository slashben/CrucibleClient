import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
import RegistraitonPage from './components/RegistraitonPage'
import config from './config';

class App extends Component {
  constructor() {
    super();

    this.token = document.cookie;
    let socketUrl = config.crucibleMudSocketUri;
    if(this.token) {
      socketUrl += '?token=' + this.token;
    }
    console.log('cookie', document.cookie);
    console.log('url', socketUrl);

    this.socket = openSocket(socketUrl).on('authentication', data => {
      document.cookie = data.token;
      console.log('token: ' + JSON.stringify(data));
    });

    // this is in-memory only... probably should be in a cookie for browser refresh
    if(this.token) {
      this.socket.emit('authentication', {token: this.token});
    }
  }

  render() {
    return (
      <div id="app" className="App" onClick={this.focusInput}>
        <RegistraitonPage />
      </div>
    );
  }
}

export default App;
