import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import Button from '../Button/Button';

class LineChart extends React.Component {
  

  

  /* componentDidMount() {
    const groupFilter = this.findGroup();

    const labels = this.makeArrayLabels(groupFilter);

    const arrayDataSets = this.makeArrayDataSets(groupFilter.strategies);

    this.setState({
      groupActive: this.props.groupActive,
      data: {
        labels: labels,
        datasets: arrayDataSets,
      },
      options: {
        title: {
          display: true,
          text: 'Estrategias de incrementos',
        },
      },
    });
  }

  componentDidUpdate() {
    if (this.state.groupActive !== this.props.groupActive) {
      const groupFilter = this.findGroup();

      const labels = this.makeArrayLabels(groupFilter);

      const arrayDataSets = this.makeArrayDataSets(groupFilter.strategies);

      this.setState({
        groupActive: this.props.groupActive,
        data: {
          labels: labels,
          datasets: arrayDataSets,
        },
        options: {
          title: {
            display: true,
            text: 'Estrategias de incrementos',
          },
        },
      });
    }
  } */
  /* function addData(chart, label, data) {
      chart.data.labels.push(label);
      chart.data.datasets.forEach(dataset => {
        dataset.data.push(data);
      });
      chart.update();
    }

    function removeData(chart) {
      chart.data.labels.pop();
      chart.data.datasets.forEach(dataset => {
        dataset.data.pop();
      });
      chart.update();
    } */

  render() {
    console.log('group p.. ',this.props.currentGroup)
    return (
      <div>
        <Line data={{labels: this.props.labels, datasets: this.props.currentGroup}} /* options={this.state.options} */ />
      </div>
    );
  }
}
export default LineChart;
