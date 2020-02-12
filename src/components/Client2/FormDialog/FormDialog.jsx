import React, { useState, useReducer, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import reducer, { initialState } from './reducer';
import {
  fetchAddToTowerStart,
  fetchAddToTowerSuccess,
  fetchAddToTowerFailure,
  restartState,
  clientRequestStart,
  clientRequestSuccess,
  clientRequestFailure,
  createdClient,
} from './actions';
import { addClient } from '../../../containers/Client/actions';
import Input from './Input';
import ClientActions from './ClientActions';
import Services from '../../../services/client/ClientsServices';
import ContainerContext from '../../../containers/Client/context';
import Context from './context';
import { DashboardRoutes } from '../../../routes/local/routes';
import LoadingButton from '../../UI2/LoadingButton';
import Styles from './FormDialog.module.scss';

const services = new Services();

const defaultClient = {
  id: null,
  identityDocument: '',
  name: '',
  email: '',
  phoneNumber: '',
  properties: [],
};

const validationSchema = yup.object().shape({
  identityDocument: yup
    .string()
    .required('Debe ingresar un documento de identidad'),
  name: yup.string().required('Debe ingresar un nombre'),
  email: yup
    .string()
    .email('El correo electronico es invalido')
    .required('Debe ingresar un correo electronico'),
  phoneNumber: yup.string().required('Debe ingresar un numero de telefono'),
});

const FormDialog = ({ client, open, onCloseHandler }) => {
  const {
    towerId,
    dispatch: containerDispatcher,
    makeAlert,
    createClient,
    updateClient,
  } = useContext(ContainerContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [innerClient, setInnerClient] = useState(defaultClient);

  useEffect(() => {
    if (client && open) {
      if (client.id) {
        setInnerClient(client);
      } else {
        const key = Number.isNaN(Number(client.identityDocument))
          ? 'name'
          : 'identityDocument';
        setInnerClient({
          ...defaultClient,
          [key]: client.identityDocument,
        });
      }
      dispatch(restartState());
    } else {
      setInnerClient(defaultClient);
    }
  }, [client]);

  const handleSubmit = async (values) => {
    try {
      dispatch(clientRequestStart());
      if (innerClient.id) {
        const res = await services.putClient(
          innerClient.identityDocument,
          towerId,
          values,
        );
        containerDispatcher(updateClient(res.data));
        dispatch(clientRequestSuccess());
      } else {
        const res = await services.postClient(towerId, values);
        containerDispatcher(createClient(res.data));
        dispatch(clientRequestSuccess());
        dispatch(createdClient(res.data.id));
      }
      makeAlert(
        `Se ${innerClient.id ? 'actualizo' : 'creo'} correctamente el usuaro`,
        'success',
      );
    } catch (error) {
      dispatch(clientRequestFailure());
      makeAlert(error.response.data.message, 'error');
    }
  };

  const handleAddToTower = async () => {
    dispatch(fetchAddToTowerStart());
    try {
      const res = await services.addClientToTower(
        innerClient.identityDocument,
        towerId,
      );
      containerDispatcher(addClient(res.data));
      dispatch(fetchAddToTowerSuccess());
    } catch (error) {
      dispatch(fetchAddToTowerFailure());
      makeAlert(error.response.data.message, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onCloseHandler} fullWidth>
      <DialogTitle>Cliente</DialogTitle>
      <DialogContent>
        <DialogContentText>Informacion del cliente</DialogContentText>
        <Box mb={2}>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ ...innerClient }}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  error={errors.identityDocument}
                  touched={touched.identityDocument}
                  name="identityDocument"
                  placeholder="1234567890"
                  label="Documento de identidad"
                  component={Input}
                  disabled={innerClient.id !== null}
                />
                <Field
                  error={errors.name}
                  touched={touched.name}
                  name="name"
                  label="Nombre"
                  placeholder="Jhon Doe"
                  component={Input}
                />
                <Field
                  error={errors.email}
                  touched={touched.email}
                  name="email"
                  placeholder="contact@email.com"
                  label="Correo electronico"
                  component={Input}
                />
                <Field
                  error={errors.phoneNumber}
                  touched={touched.phoneNumber}
                  name="phoneNumber"
                  placeholder="3001234567"
                  label="Numero de telefono"
                  component={Input}
                />
                <Grid container spacing={1} direction="row-reverse">
                  <Grid item>
                    {!innerClient.id && (
                      <Link
                        to={`${DashboardRoutes.base}${DashboardRoutes.salesRoom.value}${towerId}/${state.createdClient}`}
                        className={Styles.link}
                      >
                        <Button
                          disabled={!state.createdClient}
                          type="submit"
                          variant="contained"
                          color="secondary"
                          disableElevation
                        >
                          Ir a sala de ventas
                        </Button>
                      </Link>
                    )}
                  </Grid>
                  <Grid item>
                    <LoadingButton
                      loading={state.clientRequestLoading}
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={innerClient.id === null && state.createdClient}
                      disableElevation
                    >
                      {innerClient.id ? 'Actualizar' : 'Crear'}
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        <Context.Provider value={{ state, handleAddToTower }}>
          <ClientActions client={innerClient} />
        </Context.Provider>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onCloseHandler}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialog.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string,
    identityDocument: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
  open: PropTypes.bool.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
};

export default FormDialog;
