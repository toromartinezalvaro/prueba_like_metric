import React from 'react';
import Icon from '@material-ui/core/Icon';
import { Button, Dialog, DialogContentText } from '@material-ui/core';
import style from './DeleteAction.module.scss';

const DeleteAction = ({
  isOpen,
  setClose,
  contractNumber,
  title,
  deleteContract,
  id,
}) => {
  const contractToDelete = () => {
    deleteContract(id);
  };
  return (
    <Dialog open={isOpen} scroll="body" fullWidth={true} maxWidth="md">
      <DialogContentText>
        <div className={style.Container}>
          <h1 className={style.Alert}>
            <Icon className="fas fa-exclamation-triangle" /> ATENCIÓN
            <Icon className="fas fa-exclamation-triangle" />
          </h1>
          <h3>
            <p>
              Estás apunto de borrar el contrato{' '}
              <strong>
                {contractNumber} - {title}
              </strong>
              , si lo haces este no se podrá recuperar.
            </p>
            <p>¿Deseas continuar?</p>
          </h3>
        </div>
        <div className={style.actionContainer}>
          <Button
            variant="contained"
            className={style.deleteButton}
            startIcon={<Icon className="fas fa-trash-alt" />}
            onClick={contractToDelete}
          >
            Eliminar contrato
          </Button>
          <Button
            variant="contained"
            color="secondary"
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
