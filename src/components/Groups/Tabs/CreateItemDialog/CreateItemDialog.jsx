import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
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
  groups,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const groupOptions = () => {
    return groups.map((group) => {
      return (
        <MenuItem value={group.id} key={group.id}>
          {group.categoryName}
        </MenuItem>
      );
    });
  };

  const [item, setItem] = useState({
    name: '',
    PUC: '',
    contractCategoryId: '',
  });

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
          <FormControl variant="filled" fullWidth>
            <InputLabel>Seleccione el grupo a agregar item</InputLabel>
            <Select
              value={item.contractCategoryId}
              onChange={handleChangeText('contractCategoryId')}
            >
              {groupOptions()}
            </Select>
          </FormControl>
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
  groupId: PropTypes.number,
  groups: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  openCreateItemDialog: state.groups.createItemDialog.open,
  loadingField: state.groups.createItemDialog.loading,
  groups: state.groups.groupTabs.groups,
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
