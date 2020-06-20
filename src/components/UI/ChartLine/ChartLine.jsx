import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import Button from '../Button/Button';
import styles from './ChartLine.module.scss';

class LineChart extends React.Component {
  state = {
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              // Include a dollar sign in the ticks
              callback(value, i, values) {
                const stringValue = value.toString();
                const index = stringValue.search(/[1-9]/);
                return `$${stringValue.substring(
                  0,
                  index,
                )}${stringValue
                  .substring(index, stringValue.length)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
                // return '$' + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, ',');
              },
            },
          },
        ],
      },

      tooltips: {
        callbacks: {
          label(tooltipItem, data) {
            const value =
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            if (parseInt(value) >= 1000) {
              return `$${value
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
            }
            return `$${value}`;
          },
        },
      },
    },
  };

  render() {
    return (
      <div className={styles.Container}>
        <Line
          data={{
            labels: this.props.labels,
            datasets: this.props.currentGroup,
          }}
          options={this.state.options}
        />
      </div>
    );
  }
}
export default LineChart;
