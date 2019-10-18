import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody, CardFooter } from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import Styles from './ClientList.module.scss';

const ClientList = ({ openSearchAndEdit }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className={Styles.HeaderContainer}>
            <div></div>
            <div className={Styles.Search} onClick={openSearchAndEdit}>
              <span>Buscar y editar</span>
            </div>
            <Button className={Styles.ButtonGo}>
              Ir sin seleccionar usuario
            </Button>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardBody></CardBody>
      </Card>
    </div>
  );
};

ClientList.propTypes = {
  openSearchAndEdit: PropTypes.func.isRequired
  //   name: PropTypes.string.isRequired,
  //   percentage: PropTypes.number.isRequired,
  //   updateHandler: PropTypes.func.isRequired,
  //   deleteHandler: PropTypes.func.isRequired,
};

export default ClientList;
