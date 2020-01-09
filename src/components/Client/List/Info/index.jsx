import axios from 'axios'; // TODO: Remove
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../../../UI/Button/Button';
import PropertyCells from './PropertyCells';

const Info = ({ client, handleClose }) => {
  // useEffect(() => {
  //   return null;
  // }, [client]);

  const selectProperty = (id) => {
    axios.get('')
  };

  return (
    <Dialog open={client !== null}>
      {client && (
        <Fragment>
          <DialogTitle id="form-dialog-title">{client.name}</DialogTitle>
          <DialogContent>
            <PropertyCells
              properties={client.properties}
              selectProperty={selectProperty}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  );
};

Info.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    properties: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        floor: PropTypes.number,
        location: PropTypes.number,
      }),
    ),
  }),
  handleClose: PropTypes.func,
};

export default Info;
