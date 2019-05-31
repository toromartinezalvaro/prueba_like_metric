import React, { Component } from "react";
import RackAreasService from "../../services/rackAreas/RackAreasServices";
import SummaryTable from "../../components/Summary/SummaryTable/SummaryTable";
import SummaryCell from "../../components/Summary/SummaryCell/SummaryCell";
import SummaryServices from "../../services/summary/SummaryService";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import _ from "lodash";
import getHeat from "../../components/Summary/HeatMap/HeatMap";


export default class RackAreas extends Component {
  constructor(props) {
    super(props);
    this.services = new RackAreasService(this);
  }

  state = {
    areas: {},
    locations: [],
    floors: []
  };

  componentDidMount() {
    this.getAreas();
  }

  getAreas = () => {
    this.services.getAreas().then(response => {
      const data = response.data;
      let floors = [];
      const locations = data.map(area => {
        console.log("Area", area.areas)
        if (area.floor !== undefined) {
          floors.push(area.floor);
        }
        return area.location !== undefined ? area.location : 0;
      });
      this.setState({
        areas: data,
        locations: _.range(1, Math.max(...locations) + 1),
        floors: _.range(Math.min(...floors), Math.max(...floors) + 1)
      });
      console.log("areas", this.state.areas);
    });
  };

  getData = (summary, key) => {
    console.log("summary", summary)
      /* summary[0].map(value => {
        console.log(value)
        return value.location !== "areas" ? value.location : 0;
      }) */
       
      /* row.map(value => (
        <SummaryCell
          k={key}
          style={{
            backgroundColor: getHeat(
              summary.min,
              summary.max,
              summary.avg,
              value,
              key
            )
          }}
        >
          {value}
        </SummaryCell>
      )) */
        }
  render() {
    return (
      <Card>
        <CardHeader>
          <p>Resumen Areas</p>
        </CardHeader>
        <CardBody>
           {/* <SummaryTable
            title="Areas"
            intersect="Areas"
            headers={this.state.locations}
            columns={this.state.floors}
            data={this.getData(this.state.areas, "area")}
            stats={[
              { }
            ]}
          /> */} 
          {this.getData(this.state.locations, "area")}
        </CardBody>
      </Card>
    );
  }
}
