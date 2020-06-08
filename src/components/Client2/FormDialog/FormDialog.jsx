import React, {
  useState,
  useReducer,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import NumberFormat from 'react-number-format';
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

const services = new Services();

const defaultClient = {
  id: null,
  identityDocument: '',
  name: '',
  email: '',
  phoneNumber: '',
  properties: [],
};

function NumberFormatCustom(props) {
  const { ...other } = props;
  return (
    <NumberFormat
      {...other}
      type="tel"
      allowNegative={false}
      decimalSeparator={false}
      format="##########"
    />
  );
}

const validationSchema = yup.object().shape({
  identityDocument: yup
    .string()
    .matches(
      /^[a-zA-Z0-9-]*$/,
      'El documento solo puede contener números y letras',
    )
    .required('Debe ingresar un documento de identidad'),
  name: yup.string().required('Debe ingresar un nombre'),
  email: yup
    .string()
    .email('El correo electrónico es invalido')
    .required('Debe ingresar un correo electrónico'),
  phoneNumber: yup
    .number()
    .typeError('Teléfono debe ser un número')
    .integer('Debe ser un número real')
    .positive('Debe ser un número real')
    .required('Debe ingresar un número de teléfono'),
});

const FormDialog = ({ client, open, onCloseHandler }) => {
  const history = useHistory();
  const formRef = useRef();
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
    if (open && client) {
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
        `Se ${innerClient.id ? 'actualizó' : 'creó'} correctamente el usuaro`,
        'success',
      );
    } catch (error) {
      dispatch(clientRequestFailure());
      makeAlert(error.message, 'error');
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
      const tempClient = { ...res.data };
      tempClient.associated = true;
      setInnerClient(tempClient);
      dispatch(fetchAddToTowerSuccess());
    } catch (error) {
      dispatch(fetchAddToTowerFailure());
      makeAlert(error.message, 'error');
    }
  };

  function gotoSalesroom() {
    history.push(
      `${DashboardRoutes.base}${DashboardRoutes.salesRoom.value}${towerId}/${state.createdClient}`,
    );
  }

  return (
    <Dialog open={open} onClose={onCloseHandler} fullWidth>
      <DialogTitle>Cliente</DialogTitle>
      <DialogContent>
        <DialogContentText>Información del cliente</DialogContentText>
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
                  label="Correo electrónico"
                  component={Input}
                />
                <Field
                  error={errors.phoneNumber}
                  touched={touched.phoneNumber}
                  name="phoneNumber"
                  placeholder="3001234567"
                  label="Número de teléfono"
                  component={Input}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
                <Grid container spacing={1} direction="row-reverse">
                  <Grid item>
                    {!innerClient.id && (
                      <Button
                        disabled={!state.createdClient}
                        type="submit"
                        variant="contained"
                        color="secondary"
                        disableElevation
                        onClick={gotoSalesroom}
                      >
                        Ir a sala de ventas
                      </Button>
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
