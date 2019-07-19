import React, { useState } from 'react';
import styles from './Schema.module.scss';
import Card, { CardHeader, CardBody, CardFooter } from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';

const Schema = props => {
  const [hidden, setHidden] = useState(true);

  const inputValidation = [
    {
      fn: value => {
        const pattern = new RegExp('^[0-9]*$');
        return pattern.test(value);
      },
      message: 'Debe ser un numero',
    },
    {
      fn: value => {
        return parseInt(value) >= 1;
      },
      message: 'Debe ser mayor o igual a 1',
    },
  ];

  const save = () => {
    if (props.update) {
      props.updateSchema();
    } else {
      props.saveSchema();
    }
    setHidden(true);
  };

  const cancel = () => {
    props.editMode();
    setHidden(true);
  };

  return (
    <Card>
      <CardHeader>
        <p>Esquema</p>
      </CardHeader>
      <CardBody>
        <div className={styles.Container}>
          <div>
            <p className={styles.Label}>Pisos vendibles:</p>
            <Input
              name="floors"
              className={styles.Input}
              onChange={props.onChange}
              value={props.floors}
              validations={inputValidation}
              disable={props.disable}
            />
          </div>

          <div>
            <p className={styles.Label}>Apartamentos:</p>
            <Input
              name="properties"
              className={styles.Input}
              onChange={props.onChange}
              value={props.properties}
              validations={inputValidation}
              disable={props.disable}
            />
          </div>

          <div>
            <p className={styles.Label}>Piso mas bajo vendible:</p>
            <Input
              name="lowestFloor"
              className={styles.Input}
              onChange={props.onChange}
              value={props.lowestFloor}
              validations={inputValidation}
              disable={props.disable}
            />
          </div>
          <div>
            <p className={styles.Label}>Estrato:</p>
            <select
              value={props.stratum}
              onChange={event => {
                props.updateStratum(event.target.value);
              }}
            >
              {Object.entries(props.stratums).map(([key, value]) => {
                return <option value={value.code}>{value.value}</option>;
              })}
            </select>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div className={styles.Actions}>
          {props.disable ? (
            <Button onClick={props.editMode}>Editar</Button>
          ) : (
            <Button
              onClick={() => {
                setHidden(false);
              }}
            >
              Guardar
            </Button>
          )}
        </div>
        {hidden ? null : (
          <Modal
            title={'Actualizar nomenclatura'}
            hidden={hidden}
            onConfirm={save}
            onCancel={cancel}
          >
            Guardar este nuevo esquema eliminara toda la nomenclatura anterior{' '}
            <br /> deseas continuar?
          </Modal>
        )}
      </CardFooter>
    </Card>
  );
};

export default Schema;
