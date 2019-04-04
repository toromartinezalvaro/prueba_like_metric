import React from 'react';
import styles from './Schema.module.scss';
import Card, { CardHeader, CardBody, CardFooter } from "../../HOC/Card/Card";

const schema = props => (
  <Card>
    <CardHeader>
      <p>Esquema</p>
    </CardHeader>
    <CardBody >
      <div className={styles.Container}>
        <div >
          <p>Pisos vendibles</p>
          <input type="text" onChange={event => { props.onFloorsChange(event) }} value={props.floors} disabled={props.disable}/>
        </div>

        <div>
          <p>Apartamentos</p>
          <input type="text" onChange={event => { props.onApartmentsChange(event) }} value={props.apartments}  disabled={props.disable}/>
        </div>

        <div>
          <p>Piso mas bajo vendible</p>
          <input type="text" onChange={event => { props.onLowestFloorChange(event) }} value={props.lowestFloor}  disabled={props.disable}/>
        </div>
      </div>
    </CardBody>
    <CardFooter>
      <div className={styles.Actions}>
        <button onClick={() => { props.onSaveSchema() }}>Guardar</button>
      </div>
    </CardFooter>
  </Card>
);

export default schema;