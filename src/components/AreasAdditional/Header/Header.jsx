/*
 * Created Date: Friday November 29th 2019
 * Author: Caraham
 * -----
 * Last Modified: Friday, 29th November 2019 10:28:39 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Styles from './Header.module.scss';

const Header = (props) => {
  return (
    <span className={Styles.Header}>
      {props.areaType.name}
      {props.areaType.id === props.activePanel && (
        <div className={Styles.ContainerButtons}>
          <div className={Styles.Button}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={props.handleClickOpen}
            >
              Editar
            </Button>
          </div>
          <div className={Styles.Button}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => props.deleteArea(props.areaType.id)}
            >
              Eliminar
            </Button>
          </div>
        </div>
      )}
    </span>
  );
};

export default Header;
