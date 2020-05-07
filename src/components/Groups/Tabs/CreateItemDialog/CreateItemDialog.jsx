import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import Services from '../../../../services/group/groupService';
import { closeCreateItemDialog, apiStart, apiFail } from './action';
import Loader from '../../../UI2/Loader/Loader';
import { addOneItem } from '../action';

const services = new Services();

const CreateItemDialog = ({
  openCreateItemDialog,
  onCloseCreateItemDialog,
  loadingField,
  onStartApi,
  onFailApi,
  onAddOneItem,
  expandedGroup,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [item, setItem] = useState({
    name: '',
    PUC: '',
    contractCategoryId: '',
  });

  useEffect(() => {
    setItem((prevState) => {
      return { ...prevState, contractCategoryId: expandedGroup };
    });
  }, [expandedGroup]);

  const handleChangeText = (name) => (element) => {
    const newItem = { ...item, [name]: element.target.value };
    setItem(newItem);
  };

  const submitHandler = async () => {
    onStartApi();
    try {
      if (item.name && item.PUC) {
        const response = await services.createItem(item);
        onAddOneItem(response.data);
        setItem({ name: '', PUC: '', contractCategoryId: '' });
        onCloseCreateItemDialog();
      } else if (!item.name && item.PUC) {
        onFailApi();
        enqueueSnackbar('Debe agregar un nombre de item', { variant: 'error' });
      } else if (item.name && !item.PUC) {
        onFailApi();
        enqueueSnackbar('Debe agregar un numero de item', { variant: 'error' });
      } else if (!item.name && !item.PUC) {
        onFailApi();
        enqueueSnackbar('Debe llenar ambos campos', { variant: 'error' });
      }
    } catch (error) {
      onFailApi();
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  return (
    <Dialog open={openCreateItemDialog} fullWidth maxWidth="sm">
      <DialogTitle>Crear Item</DialogTitle>
      <DialogContent>
        <Loader isLoading={loadingField}>
          <TextField
            label="Id"
            fullWidth
            onChange={handleChangeText('PUC')}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Nombre"
            fullWidth
            onChange={handleChangeText('name')}
          />
        </Loader>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => onCloseCreateItemDialog()}>
          Cancelar
        </Button>
        <Button color="primary" onClick={submitHandler}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateItemDialog.propTypes = {
  openCreateItemDialog: PropTypes.bool.isRequired,
  onCloseCreateItemDialog: PropTypes.bool.isRequired,
  loadingField: PropTypes.bool.isRequired,
  onStartApi: PropTypes.func.isRequired,
  onFailApi: PropTypes.func.isRequired,
  onAddOneItem: PropTypes.func.isRequired,
  expandedGroup: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  openCreateItemDialog: state.groups.createItemDialog.open,
  loadingField: state.groups.createItemDialog.loading,
  expandedGroup: state.groups.groupTabs.expandedGroup,
});

const mapDispatchToProps = {
  onCloseCreateItemDialog: closeCreateItemDialog,
  onStartApi: apiStart,
  onFailApi: apiFail,
  onAddOneItem: addOneItem,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateItemDialog);
