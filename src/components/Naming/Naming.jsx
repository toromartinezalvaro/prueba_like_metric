import React from 'react';
import styles from './Naming.module.scss';
import Card, { CardHeader, CardBody, CardFooter } from "../../HOC/Card/Card";
import Input from '../UI/Input/Input';
import { isNullOrUndefined } from 'util';

const naming = props => {

  const header = [];
  const rows = []

  // console.log(`🏢 Pisos: ${props.floors}`);
  // console.log(`🏠 Apartamentos: ${props.apartments}`);
  // console.log(`🔻 Piso mas bajo: ${props.lowestFloor}`);

  for (let index = 0; index < props.apartments; index++) {
    header.push(<th key={`header-${index}`}>{index + 1}</th>);
  }

  for (let floor = 0; floor < props.floors; floor++) {
    rows.push(
      <tr key={`floor-${floor}`}>
        <th>{floor + parseInt(props.lowestFloor)}</th>
        {header.map((_, apartment) => (
          <td key={`apartment-${apartment}`}>
            <Input
              className={styles.Input}
              validations={[
                {fn: props.checkDuplicates, message: 'Nombres unicos'},
              ]}
              onChange={value => { props.onApartmentNameChange(floor, apartment, value) }}
              value={props.names[floor][apartment].name} />
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
        <div>
          <table>
            <thead>
              <tr>
                <th>Pisos / Apartamentos</th>
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

export default naming;