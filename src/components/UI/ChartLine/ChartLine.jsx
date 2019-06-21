import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import Button from "../Button/Button";

class LineChart extends React.Component {
  state = { arrayData: [] };

  render() {
    let arrayData = [];
    let dataGraph = [];

    let labels = [];
    const dataHelper = [
      { label: ["Mercado"], borderColor: "" },
      { label: ["Continua"], borderColor: "#29339B", fill: null },
      { label: ["Semi-Continua"], borderColor: "#018E42", fill: null },
      { label: ["Semi-Escalonada"], borderColor: "#EE2E31", fill: null },
      { label: ["Escalonada"], borderColor: "#29339B", fill: null }
    ];

    const groups = this.props.groups;

    const groupFilter = groups.find(group => {
      console.log("Grupo FIND", group.type);
      return group.type === this.props.groupActive;
    });

    if (groupFilter !== undefined) {
      if (groupFilter.strategies.length > 0) {
        dataGraph = groupFilter.strategies;
        if (dataGraph[0] !== undefined) {
          console.log("dataGraph[0].strategies.length", dataGraph.length);
          let lengthLabels = dataGraph[0].length;
          labels = Array.from(Array(lengthLabels), (x, index) => index + 1);
        }
      } else {
        return null;
      }
    }

    console.log("labels antes del push", labels);
    console.log("dataGraph antes del push", dataGraph);
    arrayData = [];

    for (let i = 0; i < dataGraph.length; i++) {
      const dataShow = dataGraph[i];
      console.log(dataGraph);
      arrayData.push({
        data: dataShow,
        label: dataHelper[i].label,
        borderColor: dataHelper[i].borderColor,
        fill: dataHelper[i].fill,
        lineTension: 0.05
      });
    }

    console.log("arrayData despues del push", arrayData);

    const data = {
      labels: labels,
      datasets: arrayData
    };

    var options = {
      title: {
        display: true,
        text: "Estrategias de incrementos"
      }
    };

    function addData(chart, label, data) {
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
    }

    return (
      <div>
        <Line data={data} options={options} />
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h4>Selecciona la estrategia para el {groupFilter.type}</h4>
          {dataGraph.map((group, index) => {
            if (index !== 0) {
              return (
                <Button onClick={() => this.handleClick()}>
                  {dataHelper[index].label}
                </Button>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
export default LineChart;
