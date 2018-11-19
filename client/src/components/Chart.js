import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import Charts from 'chart.js';


class Chart extends Component {
    render() {
        let data = {
            labels: this.props.labels,
            datasets: [
              {
                label: 'Home Temperature',
                fill: false,
                lineTension: 1,
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
                data: [this.props.data]
              }
            ]
          };
        return (
            <div>
            <Line
            data = {{data}}
            options = {{maintainAspectRatio: false}}
            height = {300}
            />
            </div>
            
        );
    }
}

export default Chart;