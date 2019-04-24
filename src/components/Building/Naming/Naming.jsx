import React from 'react';
import styles from './Naming.module.scss';
import Card, { CardHeader, CardBody, CardFooter } from "../../UI/Card/Card";
import Input from '../../UI/Input/Input';

const naming = props => {

  const header = [];
  const rows = []

  // console.log(`🏢 Pisos: ${props.floors}`);
  // console.log(`🏠 Apartamentos: ${props.properties}`);
  // console.log(`🔻 Piso mas bajo: ${props.lowestFloor}`);

  for (let index = 0; index < props.properties; index++) {
    header.push(<th key={`header-${index}`}>{index + 1}</th>);
  }

  for (let floor = 0; floor < props.floors; floor++) {
    rows.push(
      <tr key={`floor-${floor}`}>
        <th>{floor + parseInt(props.lowestFloor)}</th>
        {header.map((_, property) => (
          <td key={`property-${property}`}>
            <Input
              className={styles.Input}
              validations={[
                {fn: props.checkDuplicates, message: 'Nombres unicos'},
              ]}
              onChange={target => { 
                props.onPropertyNameChange(floor, property, target.value) 
              }}
              value={props.names[floor][property].name} />
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