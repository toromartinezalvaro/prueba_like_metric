import React, { Component } from "react";
import RackAreasService from "../../services/rackAreas/RackAreasServices";
import SummaryTable from "../../components/Summary/SummaryTable/SummaryTable";
import SummaryCell from "../../components/Summary/SummaryCell/SummaryCell";
import SummaryServices from "../../services/summary/SummaryService";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import _ from "lodash";
import getHeat from "../../components/Summary/HeatMap/HeatMap";
import { isDate } from "util";

export default class RackAreas extends Component {
  constructor(props) {
    super(props);
    this.services = new RackAreasService(this);
  }

  state = {
    areas: [],
    locations: [],
    floors: [],
    maxLocation: 0,
    maxFloor: 0,
    minFloor: 1,
    mts2: [[{ id: 0, area: 0, nomenclature: "0" }]],
    arrayAreas: []
  };

  componentDidMount() {
    this.getAreas();
  }

  getAreas = () => {
    this.services.getAreas().then(response => {
      const data = response.data;
      let floors = [];
      const locations = data.map(area => {
        if (area.floor !== undefined) {
          floors.push(area.floor);
        }
        return area.location !== undefined ? area.location : 0;
      });
      this.setState({
        areas: data,
        maxLocation: Math.max(...locations),
        maxFloor: Math.max(...floors),
        minFloor: Math.min(...floors),
        locations: _.range(1, Math.max(...locations) + 1),
        floors: _.range(Math.min(...floors), Math.max(...floors) + 1)
      });
      let areas = [[]];
      if (this.state.maxFloor > 0) {
        areas = this.createNullMatrix(
          this.state.maxFloor - this.state.minFloor + 1,
          this.state.maxLocation
        );
      }

      if (this.state.areas) {
        this.state.areas.forEach(property => {
          if (property.id !== undefined) {
            const { floor, location } = property;
            const total = property.areas.reduce((current, next) => {
              return current + next.measure;
            }, 0);
            areas[floor - Math.min(...floors)][location - 1] = {
              id: property.id,
              area: total,
              name: property.nomenclature
            };
          } else {
            const ids = property.idsAreas.map(id => {
              let areas = [[]];
              if (this.state.maxFloor > 0) {
                areas = this.createNullMatrix(
                  this.state.maxFloor - this.state.minFloor + 1,
                  this.state.maxLocation
                );
              }
              let name = "";
              this.state.areas.forEach(property => {
                if (property.id !== undefined) {
                  const { floor, location } = property;
                  const total = property.areas.reduce((current, next) => {
                    if (next.areaType.id === id) {
                      name = next.areaType.name;
                      current += next.measure;
                    }
                    return current;
                  }, 0);
                  areas[floor - Math.min(...floors)][location - 1] = {
                    id: property.id,
                    area: total,
                    name: property.nomenclature
                  };
                }
              });
              return { id: id, areas: areas, name: name };
            });
            this.setState({ arrayAreas: ids });
          }
        });
        this.setState({
          mts2: areas
        });
      }
    });
  };

  createNullMatrix = (m, n) => {
    return Array(m)
      .fill()
      .map(() => Array(n).fill());
  };

  getData = (summary, key) => {
    return summary.map(row =>
      row.map(value => (
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
      ))
    );
  };

  makeSummary = data => {
    return data.map(area => (
      <SummaryTable
        title={area.name}
        intersect="Areas"
        headers={this.state.locations}
        columns={this.state.floors}
        data={this.getData(area.areas, "area")}
        stats={[{}]}
      />
    ));
  };

  render() {
    return (
      <Card>
        <CardHeader>
          <p>Resumen Areas</p>
        </CardHeader>
        <CardBody>
          <SummaryTable
            title="Totales"
            intersect="Areas"
            headers={this.state.locations}
            columns={this.state.floors}
            data={this.getData(this.state.mts2, "area")}
            stats={[{}]}
          />
          {this.makeSummary(this.state.arrayAreas)}
        </CardBody>
      </Card>
    );
  }
}
