import React, { Component, Fragment } from "react";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import Table from "../../components/UI/Table/Table";
import Input from "../../components/UI/Input/Input";
import IconButton from "../../components/UI/Button/IconButton/IconButton";
import Modal from "../../components/UI/Modal/Modal";
import axios from "axios";
import EditableHeader from "../../components/Area/EditableHeader/EditableHeader";

class Area extends Component {
  state = {
    areaType           : "",
    areaMeasurementUnit: "MT2",
    areasNames         : ["interior"],
    properties         : ["Column", "202"],
    data               : [],
    hidden             : true
  };

  componentDidMount() {
    axios.get("http://localhost:1337/areas").then(response => {
      const editableHeaders = response.data.areaTypes.map(areaType => (
        <EditableHeader
          onClick={() => {
            this.deleteAreaType(areaType.id);
          }}
        >
          {areaType.name}
        </EditableHeader>
      ));
      this.setState({
        areasNames: editableHeaders,
        properties: response.data.properties,
        data      : response.data.propertiesAreas
      });
    });
  }

  areaTypeHandler = value => {
    this.setState({ areaType: value });
  };

  measurementUnitHandler = event => {
    this.setState({ areaMeasurementUnit: event.target.value });
  };

  toggleAreaTypeModal = () => {
    this.setState(prevState => ({ hidden: !prevState.hidden }));
  };

  deleteAreaType = areaTypeId => {
    axios
      .delete(`http://localhost:1337/areas/area-types/${areaTypeId}`)
      .then(data => {
        console.log(data);
      });
  };

  addAreaType = () => {
    console.log("agregando nueva area");
    axios
      .post("http://localhost:1337/areas/area-types", {
        name           : this.state.areaType,
        measurementUnit: this.state.areaMeasurementUnit,
        towerId        : 1
      })
      .then(data => {
        console.log(data);
        axios.get("http://localhost:1337/areas").then(response => {
          this.setState({
            areasNames: response.data.areaTypes,
            properties: response.data.properties,
            data      : response.data.propertiesAreas,
            hidden    : true
          });
        });
      });
  };

  areaChangeHandler = (rowIndex, cellIndex, value) => {
    console.log("entrando");
    const       currentData                  = this.state.data;
    currentData[rowIndex][cellIndex].measure = value;
    axios
      .put("http://localhost:1337/areas/1", currentData[rowIndex][cellIndex])
      .then(response => {
        console.log(response);
        this.setState({ data: currentData });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const inputs = this.state.data.map((row, rowIndex) =>
      row.map((e2, cellIndex) => (
        <Input
          style       = {{ width: "75px", fontSize: "16px" }}
          validations = {[]}
          onChange    = {value => {
            this.areaChangeHandler(rowIndex, cellIndex, value);
          }}
          value = {e2.measure}
        />
      ))
    );

    return (
      <Fragment>
        <Card>
          <CardHeader>
            <p>Areas</p>
          </CardHeader>
          <CardBody>
            <Table
              intersect={"Areas"}
              headers={[
                ...this.state.areasNames,
                <IconButton onClick={this.toggleAreaTypeModal} />
              ]}
              columns={this.state.properties}
              data={[...inputs, [[], [], []]]}
            />
          </CardBody>
        </Card>
        <Modal
          title={"Agregar nuevo tipo de area"}
          hidden={this.state.hidden}
          onConfirm={this.addAreaType}
          onCancel={this.toggleAreaTypeModal}
        >
          <div style={{ display: "flex" }}>
            <Input
              validations={[]}
              onChange={this.areaTypeHandler}
              value={this.state.areaType}
            />
            <select
              onChange={this.measurementUnitHandler}
              placeholder={"Tipo de medida"}
              value={this.state.areaMeasurementUnit}
            >
              <option value={"MT2"}>MT2</option>
              <option value={"UNIDAD"}>Unidad</option>
            </select>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default Area;
