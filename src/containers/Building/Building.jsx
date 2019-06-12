import _ from "lodash";
import React, { Component } from "react";
import Naming from "../../components/Building/Naming/Naming";
import Schema from "../../components/Building/Schema/Schema";
import Error from "../../components/UI/Error/Error";
import errorHandling from "../../services/commons/errorHelper";
import SchemeServices from "../../services/schema/SchemaServices";
import FloatingButton from "../../components/UI/FloatingButton/FloatingButton";

class Building extends Component {
  constructor(props) {
    super(props);
    this.services = new SchemeServices(this);
  }

  state = {
    floors: 1,
    properties: 1,
    lowestFloor: 1,
    disable: false,
    update: false,
    names: [],
    currentErrorMessage: "",
    isLoading: false,
    showFloatingButton: false,
    loadingNaming: false
  };

  componentDidMount() {
    console.log("match ", this.props.match);
    this.updateNames();
    this.setState({ isLoading: true });
  }

  onChangeHandler = target => {
    this.setState({
      [target.name]: target.value
    });
  };


  updateNames = () => {
    this.setState({ isLoading: true });
    this.services
      .getSchema(this.props.match.params.towerId)
      .then(response => {
        console.log("responseUpdateNames", response)
        if (response.data.length !== 0) {
          this.updateStatesWithResponse(response);
          this.setupShowFloatingButton(response.data.properties);
        }
        this.setState({ isLoading: false });
        console.log(`🦄 No entro al error`);
      })
      .catch(error => {
        console.log(`🐶 error: ${error}`);
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message
        });
        this.setState({ currentErrorMessage: "" });
      });
  };

  updateStatesWithResponse = response => {
    let { floors, totalProperties, lowestFloor, properties } = response.data;
    floors = _.defaultTo(floors, 0);
    totalProperties = _.defaultTo(totalProperties, 0);
    lowestFloor = _.defaultTo(lowestFloor, 0);
    console.log("properties", properties)
    this.setState({
      floors: floors,
      properties: totalProperties,
      lowestFloor: lowestFloor,
      update: true,
      disable: floors > 0,
      names: properties,
      isLoading: false
    });
  };

  setupShowFloatingButton = properties => {
    if (properties.length <= 0) {
      return;
    }

    let showFloating = properties.find(arrayProperties => {
      let anyNomenclature = arrayProperties.find(nomenclature => {
        return nomenclature !== null && nomenclature.name !== "0";
      });
      return anyNomenclature !== undefined;
    });
    if (showFloating !== undefined) {
      this.setState({ showFloatingButton: true });
    }
  };

  toggleEditMode = () => {
    this.setState(prevState => ({
      disable: !prevState.disable
    }));
  };

  saveSchema = () => {
    this.setState({ loadingNaming: true, disable: true });
    this.services
      .postSchema({
        towerId: this.props.match.params.towerId,
        floors: parseInt(this.state.floors),
        properties: parseInt(this.state.properties),
        lowestFloor: parseInt(this.state.lowestFloor)
      })
      .then(() => {
        this.setState({ floors: [], disable: true, names: [] });
        this.updateNames();
        this.setState({ loadingNaming: false });
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
          loadingNaming: false
        });
        this.setState({ currentErrorMessage: "" });
      });
  };

  updateSchema = () => {
    this.setState({ loadingNaming: true, disable: true });
    this.services
      .putSchema({
        towerId: this.props.match.params.towerId,
        floors: parseInt(this.state.floors),
        properties: parseInt(this.state.properties),
        lowestFloor: parseInt(this.state.lowestFloor)
      })
      .then(() => {
        this.setState({ floors: [], disable: true, names: [] });
        this.updateNames();
        this.setState({ loadingNaming: false });
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
          loadingNaming: false
        });
      });
    this.setState({ currentErrorMessage: "" });
  };

  checkDuplicates = value => {
    const duplicate =
      value === ""
        ? true
        : this.state.names.reduce((current, next) => {
            return (
              current &&
              _.findIndex(next, e => (e ? e.name === value : false)) === -1
            );
          }, true);
    return duplicate;
  };

  propertyNameChangeHandler = (id, floor, location, value) => {
    let names = [...this.state.names];
    names[floor - this.state.lowestFloor][location - 1] = {
      id: id,
      floor: floor,
      location: location,
      name: value,
      towerId: this.props.match.params.towerId
    };
    this.services
      .putProperties(names[floor - this.state.lowestFloor][location - 1])
      .then(data => {
        console.log(data);
        this.updateNames()
      });
    this.setState({
      names: names,
      showFloatingButton: true
    });
  };

  render() {
    return (
      <div>
        {this.state.currentErrorMessage !== "" ? (
          <Error message={this.state.currentErrorMessage} />
        ) : null}
        <div>
          <Schema
            floors={this.state.floors}
            properties={this.state.properties}
            lowestFloor={this.state.lowestFloor}
            disable={this.state.disable}
            update={this.state.update}
            onChange={this.onChangeHandler}
            editMode={this.toggleEditMode}
            saveSchema={this.saveSchema}
            updateSchema={this.updateSchema}
          />
          {!this.state.disable ? null : (
            <Naming
              loadingNaming={this.state.loadingNaming}
              floors={this.state.floors}
              properties={this.state.properties}
              lowestFloor={this.state.lowestFloor}
              disable={this.state.disable}
              checkDuplicates={this.checkDuplicates}
              headers={[...Array(this.state.properties).keys()].map(o => o + 1)}
              columns={[...Array(this.state.floors).keys()].map(
                o => o + this.state.lowestFloor
              )}
              onPropertyNameChange={this.propertyNameChangeHandler}
              names={this.state.names}
            />
            
          )}
        </div>
        {this.state.showFloatingButton ? (
          <FloatingButton
            route="areas"
            projectId={this.props.match.params.projectId}
            towerId={this.props.match.params.towerId}
          >
            Areas
          </FloatingButton>
        ) : null}
      </div>
    );
  }
}

export default Building;
