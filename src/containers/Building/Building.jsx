import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Schema from '../../components/Building/Schema/Schema';
import Naming from '../../components/Building/Naming/Naming';

class Building extends Component {

  state = {
    floors: 1,
    properties: 1,
    lowestFloor: 1,
    disable: false,
    update: false,
    names: []
  }

  componentDidMount() {
    this.updateNames();
  }

  floorsChangeHandler = value => {
    this.setState({
      floors: value
    });
  }

  propertiesChangeHandler = value => {
    this.setState({
      properties: value
    });
  }

  lowestFloorChangeHandler = value => {
    this.setState({
      lowestFloor: value
    });
  }

  updateNames = () => {
    axios.get('http://localhost:1337/schema/1')
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
      });
  }

  toggleEditMode = () => {
    this.setState(prevState => ({
      disable: !prevState.disable
    }));
  }

  saveSchema = () => {
    axios
      .post('http://localhost:1337/schema', {
        towerId: 1,
        floors: parseInt(this.state.floors),
        properties: parseInt(this.state.properties),
        lowestFloor: parseInt(this.state.lowestFloor)
      })
      .then(() => {
        this.updateNames();
      });
  }

  updateSchema = () => {
    axios
      .put('http://localhost:1337/schema', {
        towerId: 1,
        floors: parseInt(this.state.floors),
        properties: parseInt(this.state.properties),
        lowestFloor: parseInt(this.state.lowestFloor)
      })
      .then(() => {
        this.updateNames();
      });
  }

  checkDuplicates = value => {
    const duplicate = value === '' ? true : this.state.names.reduce((current, next) => {
      return current && _.findIndex(next, e => e.name === value) === -1;
    }, true);
    return duplicate;
  }

  propertyNameChangeHandler = (floor, property, value) => {
    let names = [...this.state.names];
    names[floor][property].name = value;
    axios
      .put('http://localhost:1337/schema/properties', names[floor][property])
      .then(data => {
        console.log('✅ updated');
      });
    this.setState({
      names: names
    });
  }

  render() {
    return (
      <div>
        <Schema
          floors={this.state.floors}
          properties={this.state.properties}
          lowestFloor={this.state.lowestFloor}
          disable={this.state.disable}
          update={this.state.update}
          onFloorsChange={this.floorsChangeHandler}
          onPropertiesChange={this.propertiesChangeHandler}
          onLowestFloorChange={this.lowestFloorChangeHandler}
          editMode={this.toggleEditMode}
          saveSchema={this.saveSchema}
          updateSchema={this.updateSchema} />
        {!this.state.disable ? null :
          <Naming
            floors={this.state.floors}
            properties={this.state.properties}
            lowestFloor={this.state.lowestFloor}
            disable={this.state.disable}
            checkDuplicates={this.checkDuplicates}
            onPropertyNameChange={this.propertyNameChangeHandler}
            names={this.state.names}
          />
        }
      </div>
    );
  }
}

export default Building;