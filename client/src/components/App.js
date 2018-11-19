import React, { Component } from "react";
import Header from "./Header";
import socketIOClient from "socket.io-client";
import LiveChart from "./LiveChart";
import moment from "moment";
import Chart from "./Chart";
import Form from "./Form";

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

    let data = this.state.data;
    let labels = this.state.labels;

    labels.push(moment(Number(created_on)).format('DD-MM-YY HH:mm'));
    data.push(Number(metric));

    this.setState({
      data: data,
      labels: labels
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
        <div className="m-3">
          <div className="row">
            <div className="col sm">
            <LiveChart
            data = {this.state.data}
            labels = {this.state.labels}
            />
            </div>
            <div className="col sm">
            <Chart
            />
            <Form/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
