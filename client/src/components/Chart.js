import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends Component {

    render() {
        let data = {
            labels: this.props.labels,
            datasets: [
              {
                label: 'Home Temperature',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(82,88,124,0.6)',
                borderColor: 'rgba(82,88,124,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(82,88,124,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(82,88,124,1)',
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

export default Chart;