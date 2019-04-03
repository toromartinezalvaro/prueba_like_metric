import React from 'react';
import styles from './Naming.module.scss';
import Card, { CardHeader, CardBody, CardFooter } from "../../HOC/Card/Card";

const naming = props => {

  const header = [];
  const rows = []

  // console.log(`🏢 Pisos: ${props.floors}`);
  // console.log(`🏠 Apartamentos: ${props.apartments}`);
  // console.log(`🔻 Piso mas bajo: ${props.lowestBillableFloor}`);

  for (let index = 0; index < props.apartments; index++) {
    header.push(<th key={`header-${index}`}>{index + 1}</th>);
  }

  for (let floor = 0; floor < props.floors; floor++) {
    rows.push(
      <tr key={`floor-${floor}`}>
        <th>{floor + parseInt(props.lowestBillableFloor)}</th>
        {header.map((_, apartment) => (
          <td key={`apartment-${apartment}`}>
            <input type="text"
              onChange={event => { props.onApartmentNameChange(floor, apartment, event) }}
              value={props.apartmentsNames[floor][apartment]} />
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
    </Card>
  );
};

export default naming;