import React, { memo, useReducer, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import MuiDialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Loader from '../../UI2/Loader';
import Header from '../Header';
import MonthlyPayments from '../Table';
import Styles from './Dialog.module.scss';
import {
  fetchQuotationStart,
  fetchQuotationSuccess,
  fetchQuotationFailure,
} from './actions';
import reducer, { initialState } from './reducer';
import QuotationsServices from '../../../services/Quotations';

const services = new QuotationsServices();

const Dialog = ({
  open,
  closeHandler,
  quotationData,
  spawnMessage,
  towerId,
}) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  const putQuotation = async () => {
    try {
      dispatch(fetchQuotationStart());
      await services.putQuotationToPermanent(store.quotation.id);
      spawnMessage('Se agregó correctamente la cotización', 'success');
      closeHandler();
    } catch (error) {
      dispatch(fetchQuotationFailure());
      spawnMessage(error.response.data.message, 'error');
    }
  };

  const deleteQuotation = async () => {
    try {
      dispatch(fetchQuotationStart());
      if (!store.error) {
        await services.deleteQuotation(store.quotation.id);
        spawnMessage('Se canceló correctamente la cotización', 'info');
      }
      closeHandler();
    } catch (error) {
      dispatch(fetchQuotationFailure());
      spawnMessage(
        `Hubo un problema cancelando la cotización ${error.response.data.message}`,
        'error',
      );
    }
  };

  useEffect(() => {
    let active = true;
    async function fetchQuotation() {
      try {
        dispatch(fetchQuotationStart());
        const response = await services.postTempQuotation(
          quotationData,
          towerId,
        );
        if (active) {
          dispatch(fetchQuotationSuccess(response.data));
        }
      } catch (error) {
        spawnMessage(error.response.data.message, 'error');
        dispatch(fetchQuotationFailure());
      }
    }
    if (open) {
      fetchQuotation();
    }
    return () => {
      active = false;
    };
  }, [open]);

  return (
    <MuiDialog open={open} fullScreen>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={deleteQuotation}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Generador de cotizaciones</Typography>

          <div className={Styles.toolbarRightSide}>
            <Button
              autoFocus
              color="secondary"
              variant="contained"
              disableElevation
              onClick={putQuotation}
              disabled={store.loading || store.error}
            >
              Guardar cotización
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <DialogTitle>Cotización</DialogTitle>
      <DialogContent>
        <Loader isLoading={store.loading}>
          {store.error ? (
            <DialogContentText>
              Ha ocurrido un error obteniendo la cotización, cierre el modal e
              inténtelo de nuevo
            </DialogContentText>
          ) : (
            <>
              <Header quotation={store.quotation} />
              <MonthlyPayments quotation={store.quotation} />
            </>
          )}
        </Loader>
      </DialogContent>
    </MuiDialog>
  );
};

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  quotationData: PropTypes.shape({
    propertyId: PropTypes.number,
    identityDocument: PropTypes.string,
    propertyPrice: PropTypes.number,
  }),
  spawnMessage: PropTypes.number,
  towerId: PropTypes.string.isRequired,
};

export default memo(Dialog);
