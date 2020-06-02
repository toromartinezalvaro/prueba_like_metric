import React from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import NumberFormat from 'react-number-format';
import Loader from '../../../UI2/Loader';
import SchemaServices from '../../../../services/schema/SchemaServices';
import withFormikField from '../../../../HOC/widthFormikField';

const Input = withFormikField(TextField);

const services = new SchemaServices();

const validationSchema = yup.object().shape({
  floors: yup
    .number()
    .min(1)
    .required(),
  properties: yup
    .number()
    .min(1)
    .required(),
  lowestFloor: yup
    .number()
    .min(1)
    .required(),
});

export default function Dialog() {
  const { towerId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const updateSchema = async (values) => {
    try {
      const response = await services.putSchema(towerId, values);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        type="tel"
        allowNegative={false}
        decimalSeparator={false}
      />
    );
  }

  return (
    <MuiDialog open>
      <DialogTitle>Editar esquema</DialogTitle>
      <DialogContent>
        <Loader>
          <Formik
            initialValues={{ floors: 3, properties: 3, lowestFloor: 3 }}
            onSubmit={updateSchema}
            validationSchema={validationSchema}
          >
            {() => (
              <Form>
                <Grid container>
                  <Grid xs={4}>
                    <Field
                      name="floors"
                      autoFocus
                      margin="dense"
                      label="Pisos vendibles"
                      fullWidth
                      component={Input}
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}
                    />
                  </Grid>
                  <Grid xs={4}>
                    <Box px={2}>
                      <Field
                        name="properties"
                        margin="dense"
                        label="Apartamentos"
                        fullWidth
                        component={Input}
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Field
                      name="lowestFloor"
                      margin="dense"
                      label="Piso mas bajo vendible"
                      fullWidth
                      component={Input}
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}
                    />
                  </Grid>
                </Grid>

                <FormControl fullWidth margin="dense">
                  <InputLabel id="stratum-label">Estrato</InputLabel>
                  <Select labelId="stratum-label">
                    <MenuItem value={10}>Vivienda de interes social</MenuItem>
                    <MenuItem value={20}>Medio</MenuItem>
                    <MenuItem value={30}>Medio-Alto</MenuItem>
                    <MenuItem value={40}>Alto</MenuItem>
                  </Select>
                </FormControl>
              </Form>
            )}
          </Formik>
        </Loader>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Cancelar</Button>
        <Button color="primary">Guardar</Button>
      </DialogActions>
    </MuiDialog>
  );
}
