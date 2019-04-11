import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash/array';
import Schema from '../../components/Schema/Schema';
import Naming from '../../components/Naming/Naming';

class Building extends Component {

  state = {
    floors: 1,
    apartments: 1,
    lowestFloor: 1,
    disable: false,
    update: false,
    names: []
  }

  componentDidMount() {
    this.updateNames();
  }

  onChangeHandler = target => {
    this.setState({
      [target.name]: target.value
    });
  }

  updateNames = () => {
    axios.get('http://localhost:1337/schema/1')
      .then(response => {
        if (response.data.length !== 0) {
          this.setState({
            floors: response.data.length,
            apartments: response.data[0].length,
            lowestFloor: response.data[0][0].floor,
            disable: true,
            update: true,
            names: response.data
          });
        }
      });
  }

  schemaEditMode = () => {
    this.setState({
      disable: !this.state.disable
    });
  }

  saveSchema = () => {
    console.log(`💾 Saving schema...`);
    axios
      .post('http://localhost:1337/schema', {
        towerId: 1,
        floors: parseInt(this.state.floors),
        properties: parseInt(this.state.apartments),
        startingFloor: parseInt(this.state.lowestFloor)
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
        properties: parseInt(this.state.apartments),
        startingFloor: parseInt(this.state.lowestFloor)
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

  apartmentNameChangeHandler = (floor, apartment, value) => {
    const name = value;
    let apartments = [...this.state.names];
    apartments[floor][apartment].name = name;
    axios
      .put('http://localhost:1337/schema/properties', apartments[floor][apartment])
      .then(() => {
        console.log('✅ updated');
      });
    this.setState({
      names: apartments
    });
  }

  render() {
    return (
      <div>
        <Schema
          floors={this.state.floors}
          apartments={this.state.apartments}
          lowestFloor={this.state.lowestFloor}
          disable={this.state.disable}
          update={this.state.update}
          onChange={this.onChangeHandler}
          editMode={this.schemaEditMode}
          saveSchema={this.saveSchema}
          updateSchema={this.updateSchema} />
        {!this.state.disable ? null :
          <Naming
            floors={this.state.floors}
            apartments={this.state.apartments}
            lowestFloor={this.state.lowestFloor}
            disable={this.state.disable}
            checkDuplicates={this.checkDuplicates}
            onApartmentNameChange={this.apartmentNameChangeHandler}
            names={this.state.names}
          />
        }
      </div>
    );
  }
}

export default Building;