import React, { Component } from 'react';
import Card, { CardHeader, CardBody } from '../../HOC/Card/Card';

class Area extends Component {

  render() {
    return (
      <Card>
        <CardHeader>
          <p>Areas</p>
        </CardHeader>
        <CardBody>
          <table>
            <thead>
              <th>Header</th>
            </thead>
            <tbody>
              <tr>
                <th>row1</th>
                <td>val1</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    );
  }
}

export default Area;