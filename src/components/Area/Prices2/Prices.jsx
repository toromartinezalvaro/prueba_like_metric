import React from 'react';
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

const Prices = ({
  areaTypeId,
  measurementUnit,
  services,
  towerId,
  anySold,
}) => {
  return (
    <Formik
      initialValues={{
        name: 'Balcon',
        unit: 'MT2',
        friends: [{ id: 1, val: 1 }, { id: 2, val: 2 }],
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      render={({ values, handleSubmit }) => {
        return (
          <Dialog open>
            <DialogTitle>Editar precios</DialogTitle>
            <DialogContent>
              <Form>
                <Box mb={2}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Field name="name" label="Nombre" component={Input} />
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
                      {values.friends.map((friend, index) => {
                        return (
                          <TableRow key={friend.id}>
                            <TableCell component="th" scope="row" align="right">
                              {friend.id}
                            </TableCell>
                            <TableCell>
                              <Field
                                name={`friends.${index}.val`}
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
            </DialogContent>
            <DialogActions>
              <Button>Cancelar</Button>
              <Button onClick={handleSubmit}>Guardar</Button>
            </DialogActions>
          </Dialog>
        );
      }}
    />
  );
};

export default Prices;
