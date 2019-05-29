import _ from "lodash";
import React, { Component } from "react";
import Naming from "../../components/Building/Naming/Naming";
import Schema from "../../components/Building/Schema/Schema";
import Error from "../../components/UI/Error/Error";
import errorHandling from "../../services/commons/errorHelper";
import SchemeServices from "../../services/schema/SchemaServices";

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
    isLoading: false
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
    this.services
      .getSchema("ff234f80-7b38-11e9-b198-3de9b761aac6")
      .then(response => {
        if (response.data.length !== 0) {
          this.setState({
            floors: response.data.floors,
            properties: response.data.totalProperties,
            lowestFloor: response.data.lowestFloor,
            disable: true,
            update: true,
            names: response.data.properties
          });
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

  toggleEditMode = () => {
    this.setState(prevState => ({
      disable: !prevState.disable
    }));
  };

  saveSchema = () => {
    this.services
      .postSchema({
        towerId: "ff234f80-7b38-11e9-b198-3de9b761aac6",
        floors: parseInt(this.state.floors),
        properties: parseInt(this.state.properties),
        lowestFloor: parseInt(this.state.lowestFloor)
      })
      .then(() => {
        this.updateNames();
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message
        });
        this.setState({ currentErrorMessage: "" });
      });
  };

  updateSchema = () => {
    this.services
      .putSchema({
        towerId: "ff234f80-7b38-11e9-b198-3de9b761aac6",
        floors: parseInt(this.state.floors),
        properties: parseInt(this.state.properties),
        lowestFloor: parseInt(this.state.lowestFloor)
      })
      .then(() => {
        this.updateNames();
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message
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
      towerId: "ff234f80-7b38-11e9-b198-3de9b761aac6"
    };
    this.services
      .putProperties(names[floor - this.state.lowestFloor][location - 1])
      .then(data => {
        console.log(data);
      });
    this.setState({
      names: names
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
      </div>
    );
  }
}

export default Building;
