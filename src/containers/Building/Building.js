import React, { Component } from 'react';
import axios from 'axios';
import Schema from '../../components/Schema/Schema';
import Naming from '../../components/Naming/Naming';

class Building extends Component {

  state = {
    floors: 1,
    apartments: 1,
    lowestFloor: 1,
    disable: false,
    naming: []
  }

  componentDidMount() {
    this.updateNamingArray();
  }

  floorsChangeHandler = event => {
    this.setState({ floors: event.target.value });
  }

  apartmentsChangeHandler = event => {
    this.setState({ apartments: event.target.value });
  }

  lowestFloorChangeHandler = event => {
    this.setState({ lowestFloor: event.target.value });
  }

  updateNamingArray = () => {
    axios.get('http://localhost:1337/schema/1')
      .then(response => {
        if (response.data.length !== 0) {
          this.setState({
            floors: response.data.length,
            apartments: response.data[0].length,
            lowestFloor: response.data[0][0].floor,
            disable: true,
            naming: response.data
          });
        }
      });
  }

  saveSchema = () => {
    console.log(`💾 Saving schema...`);
    if (this.state.disable) {
      this.setState({ disable: false, naming: [] });
    } else {
      axios
        .post('http://localhost:1337/schema', {
          towerId: 1,
          floors: parseInt(this.state.floors),
          properties: parseInt(this.state.apartments),
          startingFloor: parseInt(this.state.lowestFloor)
        })
        .then(data => {
          this.updateNamingArray();
        });
    }
  }

  apartmentNameChangeHandler = (floor, apartment, event) => {
    const name = event.target.value;
    const duplicate = this.state.naming.reduce((current, next) => current || next.indexOf(name) !== -1, false);
    if (duplicate) console.log(`😅 Duplicate value!`);
    let apartments = [...this.state.naming];
    apartments[floor][apartment].name = name;
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
        {this.state.naming.length === 0 ? null :
          <Naming
            floors={this.state.floors}
            apartments={this.state.apartments}
            lowestFloor={this.state.lowestFloor}
            disable={this.state.disable}
            onApartmentNameChange={this.apartmentNameChangeHandler}
            apartmentsNames={this.state.naming}
          />
        }
      </div>
    );
  }
}

export default Building;