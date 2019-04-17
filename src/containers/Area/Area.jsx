import React, { Component } from 'react';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import Table from '../../components/UI/Table/Table';
import Input from '../../components/UI/Input/Input';
import axios from 'axios';

class Area extends Component {

  state = {
    areasNames: ['interior'],
    properties: ['Column', '202'],
    data: []
  }

  componentDidMount() {
    axios.get('http://localhost:1337/areas')
      .then(response => {
        this.setState({
          areasNames: response.data.areaTypes,
          properties: response.data.properties,
          data: response.data.propertiesAreas
        })
      })
  }

  add = () => {
    this.setState(prevState => ({
      areasNames: [...prevState.areasNames, "area agregada"],
      data: [...prevState.data, ['120']]
    }))
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
        <Input validations={[]} onChange={value => { this.areaChangeHandler(rowIndex, cellIndex, value) }} value={e2.measure} />
      ))
    );

    return (
      <Card>
        <CardHeader>
          <p>Areas</p>
        </CardHeader>
        <CardBody>
          {/* <IconButton onClick={this.add} /> */}
          <Table intersect={'Areas'} headers={this.state.areasNames} columns={this.state.properties} data={inputs} />
        </CardBody>
      </Card>
    );
  }
}

export default Area;