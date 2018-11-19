import React, { Component } from "react";
import Header from "./Header";
import Chart from "./Chart";
import socketIOClient from 'socket.io-client';

class App extends Component {
  state = {
    endpoint: `${window.location.hostname}:4000`,
    data: {}
  }

  render() {
    const socket = socketIOClient(this.state.endpoint);

    socket.on('newLog', (log) => {
      console.log(log);
      this.setState({data: log})
    })

    return (
      <div>
        <Header title="TEMPERATURE MONITOR" />
        <div className="container">
          <div className="row">
            <div className="col sm">
              <Chart/>
            </div>
            <div className="col sm">
              <Chart/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
