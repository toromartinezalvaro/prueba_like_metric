import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useSnackbar } from 'notistack';
import Services from '../../../../services/group/groupService';
import { closeCreateDialog, apiStart, apiFail } from './action';
import withFormikField from '../../../../HOC/widthFormikField';
import Loader from '../../../UI2/Loader/Loader';
import { addOneGroup } from '../action';

const services = new Services();

const FormikTextField = withFormikField(TextField);

const CreateGroupDialog = ({
  openCreateGroupDialog,
  onCloseCreateDialog,
  loadingField,
  onStartApi,
  onFailApi,
  onAddOneGroup,
  companyId,
}) => {
  const formRef = useRef();

  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (contractCategory) => {
    onStartApi();
    const values = { ...contractCategory, companyId };
    try {
      const response = await services.createGroup(values);
      onAddOneGroup(response.data);
      onCloseCreateDialog();
    } catch (error) {
      onFailApi();
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  const submit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <Dialog open={openCreateGroupDialog} fullWidth maxWidth="sm">
      <DialogTitle>Crear grupo</DialogTitle>
      <DialogContent>
        <Loader isLoading={loadingField}>
          <Formik
            initialValues={{
              categoryName: '',
            }}
            innerRef={formRef}
            onSubmit={submitHandler}
          >
            {() => (
              <Form>
                <Field
                  name="categoryName"
                  label="Ingrese un nombre de grupo"
                  component={FormikTextField}
                  autoFocus
                  margin="dense"
                  fullWidth
                />
              </Form>
            )}
          </Formik>
        </Loader>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => onCloseCreateDialog()}>
          Cancelar
        </Button>
        <Button color="primary" onClick={submit}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateGroupDialog.propTypes = {
  openCreateGroupDialog: PropTypes.bool.isRequired,
  onCloseCreateDialog: PropTypes.bool.isRequired,
  loadingField: PropTypes.bool.isRequired,
  onStartApi: PropTypes.func.isRequired,
  onFailApi: PropTypes.func.isRequired,
  onAddOneGroup: PropTypes.func.isRequired,
  companyId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  openCreateGroupDialog: state.groups.createGroupDialog.open,
  loadingField: state.groups.createGroupDialog.loading,
  companyId: state.groups.groupTabs.companyId,
});

const mapDispatchToProps = {
  onCloseCreateDialog: closeCreateDialog,
  onStartApi: apiStart,
  onFailApi: apiFail,
  onAddOneGroup: addOneGroup,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateGroupDialog);
