import React, { Component } from 'react';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import Table from '../../components/UI/Table/Table';
import IconButton from '../../components/UI/Button/IconButton/IconButton';

class Area extends Component {

  state = {
    areasNames: ['Interior'],
    properties: ['201'],
    data: [['80']]
  }

  add = () => {
    this.setState(prevState => ({
      areasNames: [...prevState.areasNames, "area agregada"],
      data: [...prevState.data, ['120']]
    }))
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <p>Areas</p>
        </CardHeader>
        <CardBody>
          <IconButton onClick={this.add} />
          <Table intercept={'Areas'} headers={this.state.areasNames} columns={this.state.properties} data={this.state.data} />
        </CardBody>
      </Card>
    );
  }
}

export default Area;