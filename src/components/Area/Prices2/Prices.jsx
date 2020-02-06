import React, { useEffect, useReducer, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Input from './Input';
import CurrencyInput from './CurrencyInput';
import reducer, { initialState } from './reducer';
import {
  fetchAreasStart,
  fetchAreasSuccess,
  fetchAreasFailure,
} from './actions';
import Services from '../../../services/area/AreaServices';
import Loader from '../../UI2/Loader/Loader';

const services = new Services();

const Prices = ({ open, areaTypeId, towerId, handleClose }) => {
  const formRef = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetch() {
      dispatch(fetchAreasStart());
      try {
        const res = await services.getPrices(towerId, areaTypeId);
        dispatch(fetchAreasSuccess(res.data));
      } catch (error) {
        dispatch(fetchAreasFailure());
        console.error(error);
      }
    }
    if (open && areaTypeId) {
      fetch();
    }
  }, [open]);

  const submit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const handleSubmit = (values) => {
    services.updateAreaType(areaTypeId, values);
    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Editar precios</DialogTitle>
      <DialogContent>
        <Loader isLoading={state.loading} variant="circular">
          {state.error ? (
            <DialogContentText>
              Ha ocurrido un error obteniendo la informacion del tipo de area.
            </DialogContentText>
          ) : (
            <Formik
              initialValues={state.areaType}
              onSubmit={handleSubmit}
              innerRef={formRef}
            >
              {({ values }) => {
                return (
                  <Form>
                    <Box mb={2}>
                      <Grid container spacing={1}>
                        <Grid item>
                          <Field
                            name="name"
                            label="Nombre"
                            component={Input}
                            disabled={values.primary}
                          />
                        </Grid>
                        <Grid item>
                          <Field
                            name="unit"
                            label="Unidad"
                            component={Input}
                            disabled
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <TableContainer component={Paper}>
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell align="right">Medida</TableCell>
                            <TableCell>Precio</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {values.areas.map((area, index) => {
                            return (
                              <TableRow key={area.id}>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="right"
                                >
                                  {area.measure}
                                </TableCell>
                                <TableCell>
                                  <Field
                                    name={`areas.${index}.price`}
                                    component={CurrencyInput}
                                    label="Precio"
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Form>
                );
              }}
            </Formik>
          )}
        </Loader>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={submit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Prices;
