import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ManualPrice from './ManualPrice';
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

  const [isLast, setIsLast] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    async function fetchDesistStatus() {
      if (open) {
        try {
          const res = await services.getGroupDesistStatus(desistRequestId);
          setIsLast(res.data.isLast);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchDesistStatus();
  }, [open]);

  const submit = () => {
    if (formRef.current) {
      setDisabled(true);
      formRef.current.handleSubmit();
    }
  };

  const onSubmitHandler = (values) => {
    const { price } = values;
    updatePriceProperty(propertyId, { desistRequestId, price });
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Cambiar precio</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {!isLast
            ? 'Agregue el precio manualmente del apartamento'
            : 'El precio se actualizara de acuerdo con la lista'}
        </DialogContentText>
        <ManualPrice
          ref={formRef}
          onSubmit={onSubmitHandler}
          isHidden={isLast}
        />
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
