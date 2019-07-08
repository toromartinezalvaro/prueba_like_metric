import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import Button from '../Button/Button';

class LineChart extends React.Component {
  

  


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
