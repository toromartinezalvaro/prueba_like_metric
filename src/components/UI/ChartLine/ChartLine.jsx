import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

class BarChart extends React.Component {
  render() {
    let arrayData = [];
    let dataGraph = [];
    let labels = [];
    const dataHelper = [
      { label: ['Continua'], borderColor: '#29339B' },
      { label: ['Semi-Continua'], borderColor: '#018E42' },
      { label: ['Semi-Escalonada'], borderColor: '#EE2E31' },
      { label: ['Escalonada'], borderColor: '#29339B' },
    ];
    const groupFilter = this.props.data.filter(
      group => group.type === this.props.groupActive,
    );

    if (groupFilter[0] !== undefined) {
      dataGraph = groupFilter[0].strategies;
      if (dataGraph[0] !== undefined) {
        let lengthLabels = dataGraph[0].length;
        labels = Array.from(Array(lengthLabels), (x, index) => index + 1);
      }
    }
    for (let i = 0; i < dataGraph.length; i++) {
      arrayData.push({
        data: dataGraph[i],
        label: dataHelper[i].label,
        borderColor: dataHelper[i].borderColor,
        fill: null,
        lineTension: 0.05,
      });
    }
    const data = {
      labels: labels,
      datasets: arrayData,
    };



    var options = {
      title: {
        display: true,
        text: 'Estrategias de incrementos',
      },
    };

    return <Line data={data} options={options} />;
  }
}
export default BarChart;
