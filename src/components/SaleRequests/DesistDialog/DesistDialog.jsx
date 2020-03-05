import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ManualPrice from './ManualPrice';
import PropertyDetails from '../../shared/PropertyDetails';
import RequestServices from '../../../services/SaleRequests';

const services = new RequestServices();

const DesistDialog = ({
  open,
  desistRequestId,
  closeHandler,
  updatePriceProperty,
  propertyId,
}) => {
  const formRef = useRef(null);

  const [isDisabled, setDisabled] = useState(false);

  const submit = () => {
    if (formRef.current) {
      setDisabled(true);
      formRef.current.handleSubmit();
    }
  };

  const onSubmitHandler = async (values) => {
    const { price } = values;
    const result = await updatePriceProperty(propertyId, {
      desistRequestId,
      price,
    });

    setDisabled(result);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Cambiar precio</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Agregue el precio manualmente del apartamento {}
        </DialogContentText>
        {/* <PropertyDetails /> */}
        <ManualPrice ref={formRef} onSubmit={onSubmitHandler} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={submit}
          variant="contained"
          color="primary"
          disabled={isDisabled}
        >
          Actualizar
        </Button>
        <Button onClick={closeHandler} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DesistDialog.propTypes = {
  open: PropTypes.bool,
  desistRequestId: PropTypes.number.isRequired,
  propertyId: PropTypes.number.isRequired,
  closeHandler: PropTypes.func.isRequired,
  updatePriceProperty: PropTypes.func.isRequired,
};

DesistDialog.defaultProps = {
  open: false,
};

export default DesistDialog;
