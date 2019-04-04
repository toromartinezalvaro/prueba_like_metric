import React, { Component } from 'react';
import axios from 'axios';
import Schema from '../../components/Schema/Schema';
import Naming from '../../components/Naming/Naming';

class Building extends Component {

  state = {
    floors: 0,
    apartments: 0,
    lowestFloor: 1,
    disable: false,
    naming: []
  }

  componentDidMount() {
    this.updateNamingArray();
  }

  floorsChangeHandler = event => {
    const floors = parseInt(event.target.value);
    this.setState({
      floors: floors
      //naming: this.updateNamingArray(floors, this.state.apartments)
    });

  }

  apartmentsChangeHandler = event => {
    const apartments = parseInt(event.target.value);
    this.setState({
      apartments: apartments
      //naming: this.updateNamingArray(this.state.floors, apartments)
    });
  }

  lowestFloorChangeHandler = event => {
    this.setState({ lowestFloor: parseInt(event.target.value) });
  }

  updateNamingArray = () => {
    axios.get('http://localhost:1337/schema/1')
      .then(response => {
        if (response.data.length === 0) {

        } else {
          this.setState({
            floors: response.data.length,
            apartments: response.data[0].length,
            lowestFloor: response.data[0][0].floor,
            disable: true,
            naming: response.data
          });
          this.forceUpdate();
        }
      });
  }

  saveSchema = () => {
    console.log(`💾 Saving schema...`);
    axios
      .post('http://localhost:1337/schema', {
        tower_id: 1,
        floors: this.state.floors,
        properties: this.state.apartments,
        startingFloor: this.state.lowestFloor
      })
      .then(data => {
        this.updateNamingArray();
      });
  }

  apartmentNameChangeHandler = (floor, apartment, event) => {
    const name = event.target.value;
    const duplicate = this.state.naming.reduce((current, next) => current || next.indexOf(name) !== -1, false);
    if (duplicate) console.log(`😅 Duplicate value!`);
    let apartments = [...this.state.naming];
    apartments[floor][apartment].number = name;
    axios
      .put('http://localhost:1337/schema', apartments[floor][apartment])
      .then(data => {
        console.log('✅ updated');
      });
    this.setState({ naming: apartments });
  }

  render() {
    return (
      <div>
        <Schema
          floors={this.state.floors}
          apartments={this.state.apartments}
          lowestFloor={this.state.lowestFloor}
          onFloorsChange={this.floorsChangeHandler}
          onApartmentsChange={this.apartmentsChangeHandler}
          onLowestFloorChange={this.lowestFloorChangeHandler}
          onSaveSchema={this.saveSchema}
          disable={this.state.disable} />
        <Naming
          floors={this.state.floors}
          apartments={this.state.apartments}
          lowestFloor={this.state.lowestFloor}
          disable={this.state.disable}
          onApartmentNameChange={this.apartmentNameChangeHandler}
          apartmentsNames={this.state.naming}
        />
      </div>
    );
  }
}

export default Building;