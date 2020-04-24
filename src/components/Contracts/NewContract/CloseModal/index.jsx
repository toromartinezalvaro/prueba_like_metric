import React from 'react';
import Icon from '@material-ui/core/Icon';
import { Button, Dialog, DialogContentText } from '@material-ui/core';
import style from './DeleteAction.module.scss';

const DeleteAction = ({ open, setClose, confirmClose }) => {
  const contractToClose = () => {
    confirmClose();
  };
  return (
    <Dialog open={open} scroll="body" fullWidth={true} maxWidth="md">
      <DialogContentText>
        <div className={style.Container}>
          <h1 className={style.Alert}>
            <Icon className="fas fa-exclamation-triangle icon" /> ATENCIÓN
            <Icon className="fas fa-exclamation-triangle icon" />
          </h1>
          <h3>
            <p>
              Estás apunto cerrar el contrato sin guardar, la información que
              hayas modificado no se podrá recuperar
            </p>
            <p>¿Deseas continuar?</p>
          </h3>
        </div>
        <div className={style.actionContainer}>
          <Button
            variant="contained"
            className={style.deleteButton}
            startIcon={<Icon className="fas fa-trash-alt" />}
            onClick={contractToClose}
            color="secondary"
          >
            Cerrar contrato
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={`${style.button} ${style.buttonMargin}`}
            startIcon={<Icon className="fas fa-ban" />}
            onClick={setClose}
          >
            Cancelar
          </Button>
        </div>
      </DialogContentText>
    </Dialog>
  );
};

export default DeleteAction;
