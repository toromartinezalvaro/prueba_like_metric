import React, { Component } from "react";
import RackAreasService from "../../services/rackAreas/RackAreasServices";
import SummaryTable from "../../components/Summary/SummaryTable/SummaryTable";
import SummaryCell from "../../components/Summary/SummaryCell/SummaryCell";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import _ from "lodash";
import getHeat from "../../components/Summary/HeatMap/HeatMap";
import FloatingButton from "../../components/UI/FloatingButton/FloatingButton";

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
    arrayAreas: [],
    totals: {}
  };

  componentDidMount() {
    this.getAreas();
  }

  getAreas = () => {
    const towerId = this.props.match.params.towerId;
    if (!towerId) {
      return;
    }
    this.services.getAreas(towerId).then(response => {
      const data = response.data;
      let floors = [];
      const locations = data.map(area => {
        if (area.floor !== undefined) {
          floors.push(area.floor);
        }
        return area.location !== undefined ? area.location : 0;
      });
      if (floors.length > 0) {
        this.setState({
          areas: data,
          maxLocation: Math.max(...locations),
          maxFloor: Math.max(...floors),
          minFloor: Math.min(...floors),
          locations: _.range(1, Math.max(...locations) + 1),
          floors: _.range(Math.min(...floors), Math.max(...floors) + 1)
        });
      }

      let arrayEmpty = [[]];
      if (this.state.maxFloor > 0) {
        arrayEmpty = this.createNullMatrix(
          this.state.maxFloor - this.state.minFloor + 1,
          this.state.maxLocation
        );
      }
      this.assignTableValues(arrayEmpty);
    });
  };

  assignTableValues = arrayEmpty => {
    if (this.state.areas) {
      let objectAreas = [];
      let objectTotals = [];
      this.state.areas.forEach(property => {
        if (property.id !== undefined) {
          objectTotals = this.asignValues(property, arrayEmpty);
        } else {
          const ids = property.totalAreas.map(area => {
            if (this.state.maxFloor > 0) {
              arrayEmpty = this.createNullMatrix(
                this.state.maxFloor - this.state.minFloor + 1,
                this.state.maxLocation
              );
            }
            this.state.areas.forEach(property => {
              if (property.id !== undefined) {
                objectAreas = this.asignValues(property, arrayEmpty, area.id);
              } else {
              }
            });
            return {
              id: area.id,
              areas: objectAreas.array,
              name: objectAreas.name,
              min: area.mts2.min,
              max: area.mts2.max,
              avg: area.mts2.avg
            };
          });
          this.setState({ arrayAreas: ids });
        }
      });
      if (objectTotals !== []) {
        this.assignTableHeatMapValues(objectTotals);
      }
    }
  };

  assignTableHeatMapValues = objectTotals => {
    let total = 0;
    let length = 0;
    let min = 0;
    let max = 0;
    let avg = 0;
    console.log("arrayArea", objectTotals.array);
    if (objectTotals.array !== undefined) {
      objectTotals.array.map(area => {
        total = area.reduce((current, next) => {
          if (next) {
            current = current + next.area;
            if (length === 0) {
              min = next.area;
            }
            if (min > next.area) {
              min = next.area;
            } else if (max < next.area) {
              max = next.area;
            }
            length++;
          }
          return current;
        }, 0);
      });
    }

    avg = total / length;
    this.setState({
      mts2: objectTotals.array,
      totals: {
        min: min,
        max: max,
        avg: avg
      }
    });
  };

  asignValues = (area, array, id) => {
    let name = "";
    if (area.id !== undefined) {
      const { floor, location } = area;
      const total = area.areas.reduce((current, next) => {
        if (id === undefined) {
          current += next.measure;
        } else {
          if (next.areaType.id === id) {
            name = next.areaType.name;
            current += next.measure;
          }
        }
        return current;
      }, 0);
      array[floor - this.state.minFloor][location - 1] = {
        id: area.id,
        area: total,
        name: area.nomenclature
      };
    }
    return { array, name };
  };

  createNullMatrix = (m, n) => {
    return Array(m)
      .fill()
      .map(() => Array(n).fill());
  };

  getData = (summary, key, totals) => {
    if (summary !== undefined) {
      return summary.map(row =>
        row.map(value => (
          <SummaryCell
            k={key}
            style={{
              backgroundColor: getHeat(
                totals.min,
                totals.max,
                totals.avg,
                value,
                key
              )
            }}
          >
            {value}
          </SummaryCell>
        ))
      );
    }
  };

  makeSummary = data => {
    return data.map(area => (
      <SummaryTable
        title={area.name}
        intersect="Areas"
        headers={this.state.locations}
        columns={this.state.floors}
        data={this.getData(area.areas, "area", area)}
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
          
          {this.state.floors.length > 0 ? 
            <SummaryTable
            title="Totales"
            intersect="Areas"
            headers={this.state.locations}
            columns={this.state.floors}
            data={this.getData(this.state.mts2, "area", this.state.totals)}
            stats={[{}]}
          />: null}
          
          
          {console.log(this.state.totals)}
          {this.makeSummary(this.state.arrayAreas)}
        </CardBody>
        <FloatingButton
          route="detailAdmin"
          projectId={this.props.match.params.projectId}
          towerId={this.props.match.params.towerId}
        >
          Detalle
        </FloatingButton>
      </Card>
    );
  }
}
