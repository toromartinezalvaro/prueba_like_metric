/*
 * Created Date: Friday November 29th 2019
 * Author: Caraham
 * -----
 * Last Modified: Friday, 13th December 2019 9:47:31 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React, { useState } from 'react';
import {
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Styles from './Header.module.scss';
import Button2 from '../../UI/Button/Button';

const Header = (props) => {
  const [open, setOpen] = useState(false);

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
            <div>
              <div className={Styles.DeleteButton}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                  }}
                >
                  Eliminar
                </Button>
              </div>
              <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'Eliminar area'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    ¿Esta seguro de eliminar esta area?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button2
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(false);
                    }}
                    className={Styles.CancelButton}
                  >
                    Cancelar
                  </Button2>
                  <Button2
                    onClick={() => props.deleteArea(props.areaType.id)}
                    className={Styles.ConfirmButton}
                  >
                    Aceptar
                  </Button2>
                </DialogActions>
              </Dialog>
            </div>
          )}
        </div>
      )}
    </span>
  );
};

export default Header;
