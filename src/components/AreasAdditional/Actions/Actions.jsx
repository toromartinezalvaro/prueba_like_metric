/*
 * Created Date: Friday November 29th 2019
 * Author: Caraham
 * -----
 * Last Modified: Friday, 29th November 2019 10:05:03 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */
import React from 'react';
import Button from '../../UI/Button/Button';
import Styles from './Actions.module.scss';

const Actions = (props) => {
  return (
    <div>
      <Button onClick={props.handleClose} className={Styles.CancelButton}>
        Cancelar
      </Button>
      <Button
        onClick={() => props.handleUpdate(props.areaType.id)}
        className={Styles.ConfirmButton}
      >
        Editar
      </Button>
    </div>
  );
};

export default Actions;
