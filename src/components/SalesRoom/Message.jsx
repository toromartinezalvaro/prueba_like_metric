import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardRoutes } from '../../routes/local/routes';
import Button from '../UI/Button/Button';
import agent from '../../config/config';
import { Role } from '../../helpers';

const Message = props => {
  return agent.isAuthorized([Role.Admin, Role.Super]) ? (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h4>
        Antes de poder ver la sala de ventas necesita escoger las estrategias
      </h4>
      <Link to={DashboardRoutes.base + '/strategy' + '/' + props.route}>
        <Button>
          Ir a Estrategia <i className="fas fa-angle-double-right" />
        </Button>
      </Link>
    </div>
  ) : (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h4>
        Debe contactarse con el administrador para que este escoja las
        estrategias
      </h4>
    </div>
  );
};

export default Message;
