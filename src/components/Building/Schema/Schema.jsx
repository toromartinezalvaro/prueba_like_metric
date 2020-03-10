import React, { useState } from 'react';
import styles from './Schema.module.scss';
import Card, { CardHeader, CardBody, CardFooter } from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';

const Schema = (props) => {
  const [hidden, setHidden] = useState(true);

  const inputValidation = [
    {
      fn: (value) => {
        const pattern = new RegExp('^[0-9]*$');
        return pattern.test(value);
      },
      message: 'Debe ser un numero',
    },
    {
      fn: (value) => {
        return parseInt(value, 10) >= 1;
      },
      message: 'Debe ser mayor o igual a 1',
    },
  ];

  const save = () => {
    if (props.update) {
      props.updateSchema();
      setHidden(true);
    } else {
      props.saveSchema();
    }
  };

  const toggleWarning = () => {
    props.toggleWarning();
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
        {console.log('CAN I EDIT?', !props.disableSold)}
        <div className={styles.Container}>
          <div>
            <p className={styles.Label}>Pisos vendibles:</p>
            <Input
              name="floors"
              className={styles.Input}
              onChange={props.onChange}
              value={props.floors}
              validations={inputValidation}
              disable={props.disableSold}
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
              onChange={(event) => {
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
            <div>
              <Button
                onClick={() => {
                  props.editMode();
                  toggleWarning();
                }}
                isDisabled={props.disableSold}
              >
                Editar
              </Button>
              <Button
                className={styles.CancelButton}
                onClick={() => {
                  props.editMode();
                }}
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => {
                  save();
                }}
              >
                Guardar
              </Button>
            </div>
          )}
          {props.disableWarning && (
            <Modal
              title={'Atención'}
              hidden={!props.disableWarning}
              onConfirm={toggleWarning}
              onCancel={() => {
                props.editMode();
                toggleWarning();
              }}
            >
              <span>
                Si edita el esquema tenga en cuenta que se{' '}
                <span className={styles.RedText}>ELIMINARAN</span> <br />
                las Areas, Agrupamientos, Estrategias y Ventas ya realizadas.
              </span>
            </Modal>
          )}
        </div>

        {props.sold && (
          <Modal
            title={'Actualizar nomenclatura'}
            hidden={props.sold}
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
