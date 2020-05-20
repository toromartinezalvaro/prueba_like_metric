import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
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
import SaleRequestsServices from '../../../services/SaleRequests';

const services = new ClientServices();
const saleRequestServices = new SaleRequestsServices();

const DesistDialog = ({
  open,
  desistRequestId,
  closeHandler,
  updatePriceProperty,
  propertyId,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const formRef = useRef(null);

  const [isDisabled, setDisabled] = useState(false);
  const [property, setProperty] = useState(null);
  const [suggestedPrice, setSuggestedPrice] = useState(0);
  const [suggestedPriceBeforeAssign, setSuggestedPriceBeforeAssign] = useState(
    0,
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await services.getPropertyInfo(propertyId);
        setProperty(response.data);
        const res = await saleRequestServices.getPropertySuggestedPrice(
          propertyId,
        );

        setSuggestedPriceBeforeAssign(res.data);
      } catch (error) {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
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

  const handleReject = async () => {
    await saleRequestServices.rejectDesistRequest(desistRequestId);
    closeHandler();
  };

  const setPrice = () => {
    setSuggestedPrice(suggestedPriceBeforeAssign);
  };

  return (
    <Dialog open={open} maxWidth="lg" fullWidth>
      <DialogTitle>Cambiar precio</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Agregue el precio manualmente del apartamento:{' '}
          {property && <span>{property.name}</span>}
        </DialogContentText>

        {property && <AreasDetails property={property} />}

        <Box my={2}>
          <Typography variant="caption">
            * Esta propiedad pertenece al ${property && property.group}
          </Typography>
        </Box>
        <Box my={2}>
          <Typography variant="caption">
            <Button variant="outlined" color="primary" onClick={setPrice}>
              Seleccionar precio sugerido con base al incremento actual
            </Button>
          </Typography>
        </Box>
        <ManualPrice
          ref={formRef}
          onSubmit={onSubmitHandler}
          suggestedPrice={suggestedPrice}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReject} color="secondary" disabled={isDisabled}>
          Rechazar
        </Button>
        <Button onClick={submit} color="primary" disabled={isDisabled}>
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
