import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CurrencyInput from './CurrencyInput';

const DesistDialog = ({ open, desistRequestId, closeHandler }) => {
  const formRef = useRef();

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Cambiar precio</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Seleccione una forma para alterar el precio del apartamento desistido
        </DialogContentText>
        <Formik
          initialValues={{ priceType: 'basePrice', price: 0 }}
          onSubmit={(values) => {
            // TODO: Hacer la llamada al servicio aqui con el id que viene por props
            console.log(values);
          }}
          innerRef={formRef}
        >
          {({ values }) => {
            return (
              <Form>
                <Field name="priceType">
                  {({ field }) => {
                    return (
                      <FormControl component="fieldset">
                        <FormLabel component="legend">
                          Tipo de edicion
                        </FormLabel>
                        <RadioGroup {...field} row>
                          <FormControlLabel
                            value="basePrice"
                            control={<Radio />}
                            label="Valor inicial"
                          />
                          <FormControlLabel
                            value="manualPrice"
                            control={<Radio />}
                            label="Valor manual"
                          />
                        </RadioGroup>
                      </FormControl>
                    );
                  }}
                </Field>
                <Field
                  name="price"
                  label="Precio"
                  placeholder="$1,999.99"
                  component={CurrencyInput}
                  disabled={values.priceType === 'basePrice'}
                />
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Guardar
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
  closeHandler: PropTypes.func.isRequired,
};

DesistDialog.defaultProps = {
  open: false,
};

export default DesistDialog;
