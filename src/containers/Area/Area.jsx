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
import FloatingButton from "../../components/UI/FloatingButton/FloatingButton";

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
    types: [],
    hidden: true,
    editingAreaType: false,
    deleteAreaTypeId: null,
    hideDeleteModal: true,
    currentErrorMessage: "",
    showFloatingButton: false
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
            towerId={this.props.match.params.towerId}
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

  processHeaders = (headers, totals) => {
    let totalArea = 0;
    return headers.map(areaType => {
      console.log("totals", totals);
      if (totals !== undefined && totals !== []) {
        totalArea = totals.reduce((current, total) => {
          console.log("total",total.total)
          console.log("areaType.id",areaType.id)
          total.type === areaType.id ? current += total.total : current = current;
          return current;
        }, 0);
      }
      console.log(totalArea);
      return (
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
            <p>Total: {totalArea}</p>
          </EditableHeader>
        </div>
      );
    });
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
    const towerId = this.props.match.params.towerId;
    if (!towerId) {
      return;
    }

    this.services
      .getAreas(towerId)
      .then(response => {
        this.setState({ data: response.data.propertiesAreas });
        console.log("response" + response);
        console.log("this.state.types", this.state.types);
        let totalAreas = [];
        let types = [];
        if (this.state.data) {
          totalAreas.push(
            this.state.data.map(data => {
              let areas = data.map(area => {
                if (!types.find(type => type.type === area.type)) {
                  types.push({ type: area.type, total: area.measure });
                } else {
                  let objIndex = types.findIndex(obj => obj.type === area.type);
                  types[objIndex].total += area.measure;
                }
                return area.measure;
              });
              return areas;
            })
          );
        }
        this.setState({ types: types });
        this.setState({
          areasNames: this.processHeaders(
            response.data.areaTypes,
            this.state.types
          ),
          properties: response.data.properties,
          isLoading: false
        });
        let showFloating = response.data.propertiesAreas.find(arrayAreas => {
          let anyArea = arrayAreas.find(area => {
            return area !== null && area.measure !== 0;
          });
          return anyArea !== undefined;
        });
        if (showFloating !== undefined) {
          this.setState({ showFloatingButton: true });
        }
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
        towerId: this.props.match.params.towerId
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
        towerId: this.props.match.params.towerId
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
    if (value !== "") {
      const currentData = this.state.data;
      currentData[rowIndex][cellIndex].measure = value;
      this.services
        .putAreasByTowerId(
          this.props.match.params.towerId,
          currentData[rowIndex][cellIndex]
        )
        .then(response => {
          console.log(response);
          this.setState({ data: currentData, showFloatingButton: true });
        })
        .catch(error => {
          let errorHelper = errorHandling(error);
          this.setState({
            currentErrorMessage: errorHelper.message
          });
        });
      this.setState({ currentErrorMessage: "" });
    }
  };

  render() {
    const inputs = this.state.data.map((row, rowIndex) => {
      return row.map((e2, cellIndex) => (
        <Input
          mask="number"
          style={{ width: "75px" }}
          validations={[
            {
              fn: value => {
                console.log(value);
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
                width={{ width: "125px" }}
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
        {this.state.showFloatingButton ? (
          <FloatingButton
            route="prime"
            projectId={this.props.match.params.projectId}
            towerId={this.props.match.params.towerId}
          >
            Primas
          </FloatingButton>
        ) : null}
      </div>
    );
  }
}

export default Area;
