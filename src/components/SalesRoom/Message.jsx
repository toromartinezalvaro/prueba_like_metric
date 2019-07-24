import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardRoutes } from '../../routes/local/routes';
import Button from '../UI/Button/Button';
import agent from '../../config/config';
import { Role } from '../../helpers';
import { style } from './Message.module.scss';
const Message = props => {
  return agent.isAuthorized([Role.Admin, Role.Super]) ? (
    <div className={style.Container}>
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
    <div className={style.Container}>
      <h4>
        Debe contactarse con el administrador para que este escoja las
        estrategias
      </h4>
    </div>
  );
};

export default Message;
