import React, { Component } from "react";
import Header from "./Header";
import Chart from "./Chart";

class App extends Component {
  render() {
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
