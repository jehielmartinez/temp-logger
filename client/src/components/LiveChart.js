import React, { Component } from "react";
import {Line} from 'react-chartjs-2';

class LiveChart extends Component {

    //   componentDidUpdate(prevProps, prevState) {
    //       if (prevProps.labels !== this.props.labels){
    //         this.data.labels = this.props.labels;
    //         this.data.datasets.data = this.props.data
    //     }
    //   }

  render() {
    let data = {
        labels: this.props.labels,
        datasets: [
          {
            label: 'Home Temperature',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.props.data
          }
        ]
      };

    return (
     <Line
        data = {data}
        redraw = {true}
     />
    );
  }
}

export default LiveChart;
