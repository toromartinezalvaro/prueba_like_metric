import React, { Component, Fragment } from "react";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import Table from "../../components/UI/Table/Table";
import Input from "../../components/UI/Input/Input";
import IconButton from "../../components/UI/Button/IconButton/IconButton";
import Modal from "../../components/UI/Modal/Modal";
import EditableHeader from "../../components/Area/EditableHeader/EditableHeader";
import AreaServices from "../../services/area/AreaServices";
import Prices from "../../components/Area/Prices/Prices";
import errorHandling from "../../services/commons/errorHelper";
import Error from "../../components/UI/Error/Error";

class Area extends Component {
  constructor(props) {
    super(props);
    this.services = new AreaServices(this);
  }

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
    hideDeleteModal: true,
    currentErrorMessage: ""
  };

  modalContent = () => {
    console.log("modalContent ====> ", this.state.areaType);
    if (this.state.editingAreaType) {
      return (
        <Fragment>
          <div style={{ display: "flex" }}>
            <Input
              name="areaType"
              validations={[]}
              onChange={this.areaTypeHandler}
              value={this.state.areaType}
              disable={this.state.areaType === "Interior"}
            />
            {this.state.areaMeasurementUnit}
          </div>
          <Prices
            areaTypeId={this.state.areaTypeId}
            measurementUnit={this.state.areaMeasurementUnit}
            services={this.services}
          />
        </Fragment>
      );
    } else {
      return (
        <div style={{ display: "flex" }}>
          <Input
            name="areaType"
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
            <option value={"UNT"}>Unidad</option>
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
    this.setState({ isLoading: true });
  }

  updateTableInformation = () => {
    this.services
      .getAreas()
      .then(response => {
        this.setState({
          areasNames: this.processHeaders(response.data.areaTypes),
          properties: response.data.properties,
          data: response.data.propertiesAreas,
          isLoading: false
        });
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message
        });
      });
    this.setState({ currentErrorMessage: "" });
  };

  areaTypeHandler = target => {
    this.setState({ [target.name]: target.value });
  };

  measurementUnitHandler = event => {
    this.setState({ areaMeasurementUnit: event.target.value });
  };

  toggleAreaTypeModal = areaType => {
    console.log(
      `🌞 this is how areaType is comming ${JSON.stringify(areaType)}`
    );
    if (areaType === undefined) {
      console.log(
        `⚠ So this is the current state ${JSON.stringify(this.state.areaType)}`
      );
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

      console.log(`🌞 ====> ${JSON.stringify(areaType)}`);
    }
  };

  deleteAreaType = () => {
    this.services
      .deleteArea(this.state.deleteAreaTypeId)
      .then(data => {
        this.toggleDeleteModal();
        this.updateTableInformation();
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message
        });
      });
    this.setState({ currentErrorMessage: "" });
  };

  updateAreaType = () => {
    this.services
      .putArea(this.state.areaTypeId, {
        id: this.state.areaTypeId,
        name: this.state.areaType,
        measurementUnit: this.state.areaMeasurementUnit,
        towerId: "ff234f80-7b38-11e9-b198-3de9b761aac6"
      })
      .then(data => {
        console.log(data);
        this.toggleAreaTypeModal();
        this.updateTableInformation();
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message
        });
      });
    this.setState({ currentErrorMessage: "" });
  };

  addAreaType = () => {
    this.services
      .postArea({
        name: this.state.areaType,
        measurementUnit: this.state.areaMeasurementUnit,
        towerId: "ff234f80-7b38-11e9-b198-3de9b761aac6"
      })
      .then(data => {
        console.log(data);
        this.toggleAreaTypeModal();
        this.updateTableInformation();
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message
        });
      });
    this.setState({ currentErrorMessage: "" });
  };

  areaChangeHandler = (rowIndex, cellIndex, value) => {
    const currentData = this.state.data;
    currentData[rowIndex][cellIndex].measure = value;
    this.services
      .putAreasByTowerId("ff234f80-7b38-11e9-b198-3de9b761aac6", currentData[rowIndex][cellIndex])
      .then(response => {
        console.log(response);
        this.setState({ data: currentData });
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message
        });
      });
    this.setState({ currentErrorMessage: "" });
  };

  render() {
    const inputs = this.state.data.map((row, rowIndex) => {
      return row.map((e2, cellIndex) => (
        <Input
          mask="number"
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
      <div>
        {this.state.currentErrorMessage !== "" ? (
          <Error message={this.state.currentErrorMessage} />
        ) : null}
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
                data={[...inputs]}
              />
            </CardBody>
          </Card>
          {this.state.hidden ? null : (
            <Modal
              title={"Agregar nuevo tipo de area"}
              hidden={this.state.hidden}
              onConfirm={
                this.state.editingAreaType
                  ? this.updateAreaType
                  : this.addAreaType
              }
              onCancel={this.toggleAreaTypeModal}
            >
              {this.modalContent()}
            </Modal>
          )}
          <Modal
            title={"Eliminar tipo de area"}
            hidden={this.state.hideDeleteModal}
            onConfirm={this.deleteAreaType}
            onCancel={this.toggleDeleteModal}
          >
            Deseas eliminar este tipo de area?
          </Modal>
        </Fragment>
      </div>
    );
  }
}

export default Area;
