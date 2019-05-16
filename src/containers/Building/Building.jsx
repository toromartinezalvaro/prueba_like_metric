import React, { Component } from "react";
import _ from "lodash";
import Schema from "../../components/Building/Schema/Schema";
import Naming from "../../components/Building/Naming/Naming";
import SchemeServices from "../../services/schema/SchemaServices";
import errorHandling from "../../services/commons/errorHelper";
import Error from "../../components/UI/Error/Error";

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
      .getSchema(1)
      .then(response => {
        if (response.data.length !== 0) {
          this.setState({
            floors: response.data.length,
            properties: response.data[0].length,
            lowestFloor: response.data[0][0].floor,
            disable: true,
            update: true,
            names: response.data
          });
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
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
        towerId: 1,
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
        towerId: 1,
        floors: parseInt(this.state.floors),
        properties: parseInt(this.state.properties),
        lowestFloor: parseInt(this.state.lowestFloor),
      },
      )
      .then(() => {
        this.updateNames();
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
        });
      });
    this.setState({ currentErrorMessage: "" });
  };

  checkDuplicates = value => {
    const duplicate =
      value === ""
        ? true
        : this.state.names.reduce((current, next) => {
            return current && _.findIndex(next, e => e.name === value) === -1;
          }, true);
    return duplicate;
  };

  propertyNameChangeHandler = (floor, property, value) => {
    let names = [...this.state.names];
    names[floor][property].name = value;
    this.services.putProperties(names[floor][property]).then(data => {
      console.log("✅ updated");
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
