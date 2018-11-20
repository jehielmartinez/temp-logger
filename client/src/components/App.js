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
    log: {},
    queryData: [],
    queryLabels: []
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

  getDataFromDates = (dates) => {
    console.log(dates);
    let formatDates = {
      from: moment(dates.from).unix(),
      to: moment(dates.to).unix()
    }
    console.log(formatDates);

    const url = `http://${this.state.endpoint}/send?from=${formatDates.from}&to=${formatDates.to}`

    fetch(url, {method: 'GET'})
    .then((res) => {
      return res.json();
    })
    .then((data)=>{
      this.processData(data);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  processData = (data) => {
   let queryData = [];
   let queryLabels = [];

    data.forEach(log => {
      queryData.push(Number(log.metric));
      queryLabels.push(moment(Number(log.created_on)).format('DD-MM-YY HH:mm'));
    });

    this.setState({queryData, queryLabels});
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
            data = {this.state.queryData}
            labels = {this.state.queryLabels}
            />
            <Form
            getDataFromDates = {this.getDataFromDates}
            />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
