import React from 'react';

const schema = props => (
  <div>

    <div>
      <p>Pisos</p>
      <input type="text" onChange={event => { props.onFloorsChange(event) }} value={props.floors} />
    </div>

    <div>
      <p>Apartamentos</p>
      <input type="text" onChange={event => { props.onApartmentsChange(event) }} value={props.apartments} />
    </div>

    <div>
      <p>Piso mas bajo vendible</p>
      <input type="text" onChange={event => { props.onLowestBillableFloorChange(event) }} value={props.lowestBillableFloor} />
    </div>

  </div>
);

export default schema;