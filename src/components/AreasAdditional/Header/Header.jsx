/*
 * Created Date: Friday November 29th 2019
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 11th December 2019 9:52:29 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import { Button, Tooltip } from '@material-ui/core';
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
              onClick={(e) => props.handleClickOpen(e)}
            >
              Editar
            </Button>
          </div>
          {props.areaType.anySold ? (
            <div className={Styles.Button}>
              <Tooltip
                title="No se puede eliminar, se ha vendido una propiedad con una area de este tipo"
                placement="top"
              >
                <span>
                  <Button
                    variant="contained"
                    disabled
                    startIcon={<DeleteIcon />}
                  >
                    Eliminar
                  </Button>
                </span>
              </Tooltip>
            </div>
          ) : (
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
          )}
        </div>
      )}
    </span>
  );
};

export default Header;
