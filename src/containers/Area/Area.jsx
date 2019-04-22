import React, { Component } from 'react';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import Table from '../../components/UI/Table/Table';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import axios from 'axios';

class Area extends Component {

  state = {
    areaType: '',
    areasNames: ['interior'],
    properties: ['Column', '202'],
    data: []
  }

  componentDidMount() {
    axios.get('http://localhost:1337/areas')
      .then(response => {
        const { areaTypes, properties, propertiesAreas } = response.data
        if (areaTypes, properties, propertiesAreas) {
          this.setState({
            areasNames: areaTypes,
            properties: properties,
            data: propertiesAreas
          })
        } else {
          console.log("Error with areas response")
        }
      })
  }

  addAreaType = target => {
    axios.put('http://localhost:1337/areas/area-types', {name: target.value, towerId: 1})
    .then(data=> {
      console.log(data);
      axios.get('http://localhost:1337/areas')
      .then(response => {
        this.setState({
          areasNames: response.data.areaTypes,
          properties: response.data.properties,
          data: response.data.propertiesAreas
        })
      })
    })
  }

  areaChangeHandler = (rowIndex, cellIndex, value) => {
    console.log('entrando')
    const currentData = this.state.data;
    currentData[rowIndex][cellIndex].measure = value;
    axios.put('http://localhost:1337/areas/1', currentData[rowIndex][cellIndex])
      .then(response => {
        console.log(response)
        this.setState({ data: currentData });
      }).catch(error => {
        console.log(error)
      })
  }

  render() {

    const inputs = this.state.data.map((row, rowIndex) =>
      row.map((e2, cellIndex) => (
        <Input validations={[]} onChange={target => { this.areaChangeHandler(rowIndex, cellIndex, target.value) }} value={e2.measure} />
      ))
    );

    return (
      <Card>
        <CardHeader>
          <p>Areas</p>
        </CardHeader>
        <CardBody>
          <Input name="areaType" validations={[]} onChange={this.addAreaType} value={this.state.areaType}/>
          <Button>Agregar</Button>
          <Table intersect={'Areas'} headers={this.state.areasNames} columns={this.state.properties} data={inputs} />
        </CardBody>
      </Card>
    );
  }
}

export default Area;