import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ManualPrice from './ManualPrice';
import AreasDetails from '../../shared/Areas';
import ClientServices from '../../../services/client/ClientsServices';

const services = new ClientServices();

const DesistDialog = ({
  open,
  desistRequestId,
  closeHandler,
  updatePriceProperty,
  propertyId,
}) => {
  const formRef = useRef(null);

  const [isDisabled, setDisabled] = useState(false);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await services.getPropertyInfo(propertyId);
        setProperty(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    if (open) {
      fetchData();
    }
  }, [propertyId]);

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
        {property && <span>{property.name}</span>}
        {property && <AreasDetails property={property} />}
        <Box my={2}>
          <Typography variant="caption">
            * Esta propiedad pertenece al {property && property.group}
          </Typography>
        </Box>
        <ManualPrice ref={formRef} onSubmit={onSubmitHandler} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={submit}
          variant="contained"
          color="secondary"
          disabled={isDisabled}
        >
          Rechazar
        </Button>
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
