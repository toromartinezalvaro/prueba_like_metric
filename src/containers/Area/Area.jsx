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

  render() {

    const inputs = this.state.data.map((row, index) =>
      row.map((e2, i2) => (
        <Input value={e2.area} />
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