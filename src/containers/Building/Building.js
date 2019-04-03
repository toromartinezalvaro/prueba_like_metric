import React, { Component } from 'react';
import Schema from '../../components/Schema/Schema';
import Naming from '../../components/Naming/Naming';

class Building extends Component {

  state = {
    floors: 0,
    apartments: 0,
    lowestBillableFloor: 1,
    naming: []
  }

  floorsChangeHandler = event => {
    const floors = event.target.value
    this.setState({
      floors: floors,
      naming: this.updateNamingArray(floors, this.state.apartments)
    });

  }

  apartmentsChangeHandler = event => {
    const apartments = event.target.value;
    this.setState({
      apartments: apartments,
      naming: this.updateNamingArray(this.state.floors, apartments)
    });
  }

  lowestBillableFloorChangeHandler = event => {
    this.setState({ lowestBillableFloor: event.target.value });
  }

  updateNamingArray = (floors, apartments) => Array(parseInt(floors)).fill().map(() => Array(parseInt(apartments)).fill(""));

  apartmentNameChangeHandler = (floor, apartment, event) => {
    const name = event.target.value;
    const duplicate = this.state.naming.reduce((current, next) => current || next.indexOf(name) !== -1, false);
    if (duplicate) console.log(`😅 Duplicate value!`);
    let apartments = [...this.state.naming];
    apartments[floor][apartment] = name;
    console.log(`🗒 ${apartments}`);
    this.setState({ naming: apartments });
  }

  render() {
    return (
      <div>
        <Schema floors={this.state.floors} apartments={this.state.apartments} lowestBillableFloor={this.state.lowestBillableFloor}
          onFloorsChange={this.floorsChangeHandler}
          onApartmentsChange={this.apartmentsChangeHandler}
          onLowestBillableFloorChange={this.lowestBillableFloorChangeHandler} />
        <Naming floors={this.state.floors}
          apartments={this.state.apartments}
          lowestBillableFloor={this.state.lowestBillableFloor}
          onApartmentNameChange={this.apartmentNameChangeHandler}
          apartmentsNames={this.state.naming}
        />
      </div>
    );
  }
}

export default Building;