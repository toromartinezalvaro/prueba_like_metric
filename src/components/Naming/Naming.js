import React, { Component } from 'react';
import styles from './Naming.module.scss';
import Card, { CardHeader, CardBody, CardFooter } from "../../HOC/Card/Card";

class naming extends Component {


  shouldComponentUpdate() {
    return this.props.disable;
  }


  render() {

    let header = [];
    const rows = []

    // console.log(`🏢 Pisos: ${this.props.floors}`);
    // console.log(`🏠 Apartamentos: ${this.props.apartments}`);
    // console.log(`🔻 Piso mas bajo: ${this.props.lowestFloor}`);

    for (let index = 0; index < this.props.apartments; index++) {
      header.push(<th key={`header-${index}`}>{index + 1}</th>);
    }

    for (let floor = 0; floor < this.props.floors; floor++) {
      rows.push(
        <tr key={`floor-${floor}`}>
          <th>{floor + parseInt(this.props.lowestFloor)}</th>
          {header.map((_, apartment) => (
            <td key={`apartment-${apartment}`}>
              <input type="text"
                onChange={event => { this.props.onApartmentNameChange(floor, apartment, event) }}
                value={this.props.apartmentsNames[floor][apartment].number} />
            </td>
          ))}
        </tr>
      );
    }

    return (
      <Card>
        <CardHeader>
          <p>Nomenclatura</p>
        </CardHeader>
        <CardBody>
          <div className={styles.Card}>
            <table>
              <thead>
                <tr>
                  <th>header</th>
                  {header}
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
        </CardBody>
        <CardFooter>

        </CardFooter>
      </Card>
    );
  }

};

export default naming;