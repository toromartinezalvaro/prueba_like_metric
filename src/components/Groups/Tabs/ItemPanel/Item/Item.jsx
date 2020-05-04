import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import Services from '../../../../../services/group/groupService';
import { updateFieldItem, deleteFieldItem } from '../../action';
import { startApiFetch, failApiFetch, successApiFetch } from '../action';

const services = new Services();

export const Item = ({
  onUpdateField,
  onStartApi,
  onFailApi,
  onSuccessApi,
  onDeleteField,
  items,
  index,
  currentItem,
}) => {
  const [disabled, setDisabled] = useState(true);

  const [visible, setVisible] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [itemName, setItemName] = useState('');
  const [itemPUC, setItemPUC] = useState('');
  const handleChangeItemName = (element) => {
    const editableItem = element.target.value;
    setItemName(editableItem);
  };

  const handleChangeItemPUC = (element) => {
    const editableItem = element.target.value;
    setItemName(editableItem);
  };

  const handleChangeForEdit = async () => {
    if (disabled) {
      setDisabled((prevstate) => !prevstate);
    } else {
      onStartApi();
      try {
        const updatedItems = [...items];
        let fieldToUpdate = {};
        if (itemName && itemPUC) {
          fieldToUpdate = {
            ...updatedItems[index],
            name: itemName,
            PUC: itemPUC,
          };
        } else if (itemName && !itemPUC) {
          fieldToUpdate = {
            ...updatedItems[index],
            name: itemName,
          };
        } else if (!itemName && itemPUC) {
          fieldToUpdate = {
            ...updatedItems[index],
            PUC: itemPUC,
          };
        }
        const response = await services.createItem(fieldToUpdate);
        updatedItems[index] = fieldToUpdate;
        onUpdateField(updatedItems);
        setDisabled((prevstate) => !prevstate);
        onSuccessApi();
        setItemName('');
        setItemPUC('');
      } catch (error) {
        onFailApi();
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }
    }
  };

  const handleDeleteField = async () => {
    if (disabled) {
      onStartApi();
      try {
        const itemsBeforeDelete = [...items];
        const fieldToDelete = itemsBeforeDelete[index].id;
        const response = await services.deleteItem({ id: fieldToDelete });
        const itemsAfterDelete = itemsBeforeDelete.filter(
          (element) => element.id !== fieldToDelete,
        );
        onDeleteField(itemsAfterDelete);
        setDisabled((prevstate) => !prevstate);
        onSuccessApi();
      } catch (error) {
        onFailApi();
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }
    } else {
      setDisabled((prevstate) => !prevstate);
    }
  };
  return (
    <>
      <TableCell component="th" scope="row">
        <TextField
          defaultValue={currentItem.PUC}
          name="PUC"
          margin="dense"
          disabled={disabled}
          onChange={handleChangeItemPUC}
          fullWidth
          onMouseEnter={() => setVisible((prevState) => !prevState)}
          onMouseLeave={() => setVisible((prevState) => !prevState)}
        />
      </TableCell>
      <TableCell component="th" scope="row">
        <TextField
          defaultValue={currentItem.name}
          name="name"
          margin="dense"
          onChange={handleChangeItemName}
          disabled={disabled}
          onMouseEnter={() => setVisible((prevState) => !prevState)}
          onMouseLeave={() => setVisible((prevState) => !prevState)}
        />
        {visible && (
          <>
            <Button
              onClick={handleChangeForEdit}
              onMouseEnter={() => setVisible((prevState) => !prevState)}
              onMouseLeave={() => setVisible((prevState) => !prevState)}
            >
              <Icon
                className={disabled ? 'fas fa-pen' : 'fas fa-check'}
                color="primary"
              />
            </Button>
            <Button
              onClick={handleDeleteField}
              onMouseEnter={() => setVisible((prevState) => !prevState)}
              onMouseLeave={() => setVisible((prevState) => !prevState)}
            >
              <Icon className="fas fa-times" color="secondary" />
            </Button>
          </>
        )}
      </TableCell>
    </>
  );
};

Item.propTypes = {
  onUpdateField: PropTypes.func.isRequired,
  onStartApi: PropTypes.func.isRequired,
  onFailApi: PropTypes.func.isRequired,
  onSuccessApi: PropTypes.func.isRequired,
  onDeleteField: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  currentItem: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.groups.groupTabs.items,
});

const mapDispatchToprops = {
  onUpdateField: updateFieldItem,
  onStartApi: startApiFetch,
  onFailApi: failApiFetch,
  onSuccessApi: successApiFetch,
  onDeleteField: deleteFieldItem,
};

export default connect(
  mapStateToProps,
  mapDispatchToprops,
)(Item);
