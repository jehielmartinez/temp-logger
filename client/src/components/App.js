import React, { Component } from "react";
import Header from "./Header";
import Chart from "./Chart";
import socketIOClient from "socket.io-client";

class App extends Component {
  state = {
    endpoint: `${window.location.hostname}:4000`,
    labels: [],
    data: [],
    log: {}
  };

  socket = socketIOClient(this.state.endpoint);

  updateData = log => {
    const { created_on, metric } = log;

    let labels = this.state.labels;
    let data = this.state.data;

    labels.push(Number(created_on));
    data.push(Number(metric));

    this.setState({
      labels: labels,
      data: data
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.log !== this.state.log) {
      this.updateData(this.state.log);
    }
  }

  render() {
    this.socket.on("newLog", log => {
      this.setState({ log: log });
    });

    return (
      <div>
        <Header title="TEMPERATURE MONITOR" />
        <div className="container">
          <div className="row">
            <div className="col sm">Hello!</div>
            <div className="col sm">
              <Chart labels={this.state.labels} data={this.state.data}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
