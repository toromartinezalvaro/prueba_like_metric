import React from 'react';
import { RadioGroup, ReversedRadioButton } from 'react-radio-buttons';
import Card, { CardHeader, CardBody, CardFooter } from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import styles from './ClientForm.module.scss';

const clientFrom = ({
  genderHandler,
  clientTypeHandler,
  modules,
  genders,
  clientTypes,
  clientHandler,
  saveClient,
  ...rest
}) => {
  return (
    <Card>
      <CardHeader>
        <span>Agregar nuevo cliente</span>
      </CardHeader>
      <CardBody>
        <div>
          <div className={styles.inputGroup}>
            <div className={styles.label}>
              <div>Genero</div>
            </div>
            <div>
              <RadioGroup onChange={genderHandler} horizontal>
                {Object.entries(genders).map(([_, value]) => {
                  return (
                    <ReversedRadioButton value={value.code}>
                      {value.value}
                    </ReversedRadioButton>
                  );
                })}
              </RadioGroup>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.label}>
              <div>Tipo de cliente</div>
            </div>
            <div>
              <RadioGroup onChange={clientTypeHandler} horizontal>
                {Object.entries(clientTypes).map(([_, value]) => {
                  return (
                    <ReversedRadioButton value={value.code}>
                      {value.value}
                    </ReversedRadioButton>
                  );
                })}
              </RadioGroup>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.label}>
              <div>Documento de identidad</div>
            </div>
            <Input
              validations={[]}
              name="identityDocument"
              onChange={clientHandler}
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.label}>
              <span>Razon social</span>
            </div>
            <Input
              validations={[]}
              name="socialReason"
              onChange={clientHandler}
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.label}>
              <div>Nombre</div>
            </div>
            <Input validations={[]} name="name" onChange={clientHandler} />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.label}>
              <div>Apellido</div>
            </div>
            <Input validations={[]} name="surname" onChange={clientHandler} />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.label}>
              <div>Numero de telefono</div>
            </div>
            <Input
              validations={[]}
              name="phoneNumber"
              onChange={clientHandler}
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.label}>
              <div>Celular</div>
            </div>
            <Input
              validations={[]}
              name="mobileNumber"
              onChange={clientHandler}
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.label}>
              <div>Email</div>
            </div>
            <Input validations={[]} name="email" onChange={clientHandler} />
          </div>
          {/* <div className={styles.inputGroup}>
            <div className={styles.label}>
              <div>Ciudad</div>
            </div>
            <Input validations={[]} name="city" onChange={clientHandler} />
          </div> */}
          <div>
            <span>Modulo</span>
            <select
              name="module"
              onChange={event => {
                clientHandler(event.target);
              }}
            >
              <option value={null}>Seleccione un modulo</option>
              {modules.map(module => {
                return <option value={module.id}>{module.name}</option>;
              })}
            </select>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button onClick={saveClient}>Agregar cliente</Button>
      </CardFooter>
    </Card>
  );
};

export default clientFrom;
