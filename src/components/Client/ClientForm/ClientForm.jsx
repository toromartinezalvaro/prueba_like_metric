import React from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

const clientFrom = ({
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
          <div>
            <span>Genero</span>
            <select name="gender" onChange={clientHandler}>
              <option value={null}>Seleccione el genero</option>
              {Object.entries(genders).map(([_, value]) => {
                return <option value={value.code}>{value.value}</option>;
              })}
            </select>
          </div>
          <div>
            <span>Tipo de cliente</span>
            <select>
              <option value={null}>Seleccione el tipo de cliente</option>
              {Object.entries(clientTypes).map(([_, value]) => {
                return <option value={value.code}>{value.value}</option>;
              })}
            </select>
          </div>
          <div>
            <span>Documento de identidad</span>
            <input />
          </div>
          <div>
            <span>Razon social</span>
            <input />
          </div>
          <div>
            <span>Nombre</span>
            <input />
          </div>
          <div>
            <span>Apellido</span>
            <input />
          </div>
          <div>
            <span>Numero de telefono</span>
            <input />
          </div>
          <div>
            <span>Celular</span>
            <input />
          </div>
          <div>
            <span>Email</span>
            <input />
          </div>
          <div>
            <span>Ciudad</span>
            <input />
          </div>
          <div>
            <span>Modulo</span>
            <input />
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
