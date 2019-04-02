import React from 'react';

const naming = props => {

  const header = [];
  const rows = []

  // console.log(`🏢 Pisos: ${props.floors}`);
  // console.log(`🏠 Apartamentos: ${props.apartments}`);
  // console.log(`🔻 Piso mas bajo: ${props.lowestBillableFloor}`);

  for (let index = 0; index < props.apartments; index++) {
    header.push(<th key={`header-${index}`}>{index + 1}</th>);
  }

  for (let floor = 0; floor < props.floors - (parseInt(props.lowestBillableFloor) - 1); floor++) {
    rows.push(
      <tr key={`floor-${floor}`}>
        <th>{floor + parseInt(props.lowestBillableFloor)}</th>
        {header.map((_, apartment) => (
          <td key={`apartment-${apartment}`}><input onChange={event => { props.onApartmentNameChange(floor, apartment, event) }} type="text" /></td>
        ))}
      </tr>
    );
  }

  return (
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
  );
};

export default naming;