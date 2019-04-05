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
        <div>
          <p className={styles.Label}>Pisos vendibles:</p>
          <input type="text" className={styles.Input} onChange={event => { props.onFloorsChange(event) }} value={props.floors} disabled={props.disable} />
        </div>

        <div>
          <p className={styles.Label}>Apartamentos:</p>
          <input type="text" className={styles.Input} onChange={event => { props.onApartmentsChange(event) }} value={props.apartments} disabled={props.disable} />
        </div>

        <div>
          <p className={styles.Label}>Piso mas bajo vendible:</p>
          <input type="text" className={styles.Input} onChange={event => { props.onLowestFloorChange(event) }} value={props.lowestFloor} disabled={props.disable} />
        </div>
      </div>
    </CardBody>
    <CardFooter>
      <div className={styles.Actions}>
        <button onClick={() => { props.onSaveSchema() }}>{props.disable ? 'Editar' : 'Guardar'}</button>
      </div>
    </CardFooter>
  </Card>
);

export default schema;