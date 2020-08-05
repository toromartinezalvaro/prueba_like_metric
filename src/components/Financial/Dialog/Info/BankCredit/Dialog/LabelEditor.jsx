import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Grid from '@material-ui/core/Grid';
import HoverContainer from '../../../../../UI2/HoverContainer';
import withFormikField from '../../../../../../HOC/withFormikFieldV2';

const Field = withFormikField(TextField);

const LabelEditor = ({ units, submitHandler, suffix }) => {
  const { towerId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [editMode, setEditMode] = useState(false);

  const toggleEditModeHandler = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  return editMode ? (
    <Formik
      initialValues={{
        units,
      }}
      onSubmit={submitHandler}
    >
      {() => (
        <Form>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Field
                name="units"
                variant="outlined"
                label="Unidades"
                size="small"
              />
            </Grid>
            <Grid item>
              <IconButton type="submit" size="small">
                <SaveIcon />
              </IconButton>
              <IconButton
                onClick={toggleEditModeHandler}
                type="submit"
                size="small"
              >
                <CancelIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  ) : (
    <HoverContainer
      noHover={<Typography component="span">{`${units}${suffix}`}</Typography>}
      hover={<i onClick={toggleEditModeHandler} className="far fa-edit"></i>}
    />
  );
};

LabelEditor.defaultProps = {
  suffix: '',
};

LabelEditor.propTypes = {
  units: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  suffix: PropTypes.string,
  submitHandler: PropTypes.func,
};

export default LabelEditor;
