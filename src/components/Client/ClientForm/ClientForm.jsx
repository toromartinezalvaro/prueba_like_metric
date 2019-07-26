import React from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

const clientFrom = ({
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
            <select name="clientType" onChange={clientHandler}>
              <option value={null}>Seleccione el tipo de cliente</option>
              {Object.entries(clientTypes).map(([_, value]) => {
                return <option value={value.code}>{value.value}</option>;
              })}
            </select>
          </div>
          <div>
            <span>Documento de identidad</span>
            <input name="identityDocument" onChange={clientHandler} />
          </div>
          <div>
            <span>Razon social</span>
            <input name="socialReason" onChange={clientHandler} />
          </div>
          <div>
            <span>Nombre</span>
            <input name="name" onChange={clientHandler} />
          </div>
          <div>
            <span>Apellido</span>
            <input name="surname" onChange={clientHandler} />
          </div>
          <div>
            <span>Numero de telefono</span>
            <input name="phoneNumber" onChange={clientHandler} />
          </div>
          <div>
            <span>Celular</span>
            <input name="mobileNumber" onChange={clientHandler} />
          </div>
          <div>
            <span>Email</span>
            <input name="email" onChange={clientHandler} />
          </div>
          <div>
            <span>Ciudad</span>
            <input name="city" onChange={clientHandler} />
          </div>
          <div>
            <span>Modulo</span>
            <select name="module" onChange={clientHandler}>
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
