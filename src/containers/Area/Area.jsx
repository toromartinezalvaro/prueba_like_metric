import React, { Component, Fragment } from "react";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import Table from "../../components/UI/Table/Table";
import Input from "../../components/UI/Input/Input";
import IconButton from "../../components/UI/Button/IconButton/IconButton";
import Modal from "../../components/UI/Modal/Modal";
import axios from "axios";
import EditableHeader from "../../components/Area/EditableHeader/EditableHeader";
import Prices from "../../components/Area/Prices/Prices";

class Area extends Component {
  state = {
    areaTypeId: null,
    areaType: "",
    areaMeasurementUnit: "MT2",
    areasNames: [],
    properties: [],
    data: [],
    hidden: true,
    editingAreaType: false,
    deleteAreaTypeId: null,
    hideDeleteModal: true
  };

  modalContent = () => {
    if (this.state.editingAreaType) {
      return (
        <Fragment>
          <div style={{ display: "flex" }}>
            <Input
              validations={[]}
              onChange={this.areaTypeHandler}
              value={this.state.areaType}
            />
            {this.state.areaMeasurementUnit}
          </div>
          <Prices
            areaTypeId={this.state.areaTypeId}
            measurementUnit={this.state.areaMeasurementUnit}
          />
        </Fragment>
      );
    } else {
      return (
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
      );
    }
  };

  processHeaders = headers => {
    return headers.map(areaType => (
      <div
        onDoubleClick={() => {
          this.toggleAreaTypeModal(areaType);
        }}
      >
        <EditableHeader
          onClick={() => {
            this.toggleDeleteModal(areaType.id);
          }}
          canBeDeleted={areaType.name.toLowerCase() === "interior"}
        >
          {`${areaType.name} ${areaType.measurementUnit}`}
        </EditableHeader>
      </div>
    ));
  };

  toggleDeleteModal = id => {
    if (id === undefined) {
      this.setState(prevState => ({
        deleteAreaTypeId: null,
        hideDeleteModal: !prevState.hideDeleteModal
      }));
    } else {
      this.setState(prevState => ({
        deleteAreaTypeId: id,
        hideDeleteModal: !prevState.hideDeleteModal
      }));
    }
  };

  componentDidMount() {
    this.updateTableInformation();
  }

  updateTableInformation = () => {
    axios.get("http://localhost:1337/areas").then(response => {
      this.setState({
        areasNames: this.processHeaders(response.data.areaTypes),
        properties: response.data.properties,
        data: response.data.propertiesAreas
      });
    });
  };

  areaTypeHandler = target => {
    this.setState({ areaType: target.value });
  };

  measurementUnitHandler = event => {
    this.setState({ areaMeasurementUnit: event.target.value });
  };

  toggleAreaTypeModal = areaType => {
    if (areaType === undefined) {
      this.setState(prevState => ({
        hidden: !prevState.hidden,
        areaType: "",
        areaMeasurementUnit: "MT2",
        editingAreaType: false
      }));
    } else {
      this.setState(prevState => ({
        hidden: !prevState.hidden,
        areaTypeId: areaType.id,
        areaType: areaType.name,
        areaMeasurementUnit: areaType.measurementUnit,
        editingAreaType: true
      }));
    }
  };

  deleteAreaType = () => {
    axios
      .delete(
        `http://localhost:1337/areas/area-types/${this.state.deleteAreaTypeId}`
      )
      .then(data => {
        this.toggleDeleteModal();
        this.updateTableInformation();
      });
  };

  updateAreaType = () => {
    axios
      .put(`http://localhost:1337/areas/area-types/${this.state.areaTypeId}`, {
        name: this.state.areaType,
        measurementUnit: this.state.areaMeasurementUnit,
        towerId: 1
      })
      .then(data => {
        console.log(data);
        this.updateTableInformation();
        this.setState({ hidden: true });
      });
  };

  addAreaType = () => {
    axios
      .post("http://localhost:1337/areas/area-types", {
        name: this.state.areaType,
        measurementUnit: this.state.areaMeasurementUnit,
        towerId: 1
      })
      .then(data => {
        console.log(data);
        this.updateTableInformation();
        this.setState({ hidden: true });
      });
  };

  areaChangeHandler = (rowIndex, cellIndex, value) => {
    const currentData = this.state.data;
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
    const inputs = this.state.data.map((row, rowIndex) => {
      return row.map((e2, cellIndex) => (
        <Input
          style={{ width: "75px", fontSize: "16px" }}
          validations={[
            {
              fn: value => {
                return value !== null;
              },
              message: "No puede estar vacío"
            }
          ]}
          onChange={target => {
            this.areaChangeHandler(rowIndex, cellIndex, target.value);
          }}
          value={e2.measure}
        />
      ));
    });

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
                <IconButton
                  onClick={() => {
                    this.toggleAreaTypeModal();
                  }}
                />
              ]}
              columns={this.state.properties}
              data={[...inputs, [[], [], []]]}
            />
          </CardBody>
        </Card>
        <Modal
          title={"Agregar nuevo tipo de area"}
          hidden={this.state.hidden}
          onConfirm={
            this.state.editingAreaType ? this.updateAreaType : this.addAreaType
          }
          onCancel={this.toggleAreaTypeModal}
        >
          {this.modalContent()}
        </Modal>
        <Modal
          title={"Eliminar tipo de area"}
          hidden={this.state.hideDeleteModal}
          onConfirm={this.deleteAreaType}
          onCancel={this.toggleDeleteModal}
        >
          Deseas eliminar este tipo de area?
        </Modal>
      </Fragment>
    );
  }
}

export default Area;
