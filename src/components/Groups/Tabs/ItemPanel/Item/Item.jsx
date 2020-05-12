import React, { useState, useRef, useEffect } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import Services from '../../../../../services/group/groupService';
import { updateFieldItem, deleteFieldItem } from '../../action';
import { startApiFetch, failApiFetch, successApiFetch } from '../action';
import withFormikField from '../../../../../HOC/widthFormikField';
import { setOpen } from '../CantDeleteDialog/action';
import PreventDelete from './PreventDelete';

const services = new Services();

const FormikTextField = withFormikField(TextField);

export const Item = ({
  currentItem,
  onUpdateField,
  onStartApi,
  onFailApi,
  onSuccessApi,
  onDeleteField,
  items,
  index,
  onSetOpenCantDelete,
  itemsFiltered,
}) => {
  const formRef = useRef();

  const [disabled, setDisabled] = useState(true);

  const [visible, setVisible] = useState(false);

  const [open, setOpenModal] = useState(false);

  const [selectedValue, setSelectedValue] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [itemName, setItemName] = useState('');
  const [itemPUC, setItemPUC] = useState('');
  const handleChangeItemName = (element) => {
    const editableItem = element.target.value;
    setItemName(editableItem);
  };

  const handleChangeItemPUC = (element) => {
    const editableItem = element.target.value;
    setItemPUC(editableItem);
  };

  useEffect(() => {
    setItemName(currentItem.name);
    setItemPUC(currentItem.PUC);
  }, [currentItem]);

  const handleChangeForEdit = async () => {
    if (disabled) {
      setDisabled((prevstate) => !prevstate);
    } else {
      try {
        const updatedItems = [...itemsFiltered];
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
        const itemSelected = items.findIndex(
          (element) => element.id === fieldToUpdate.id,
        );
        const response = await services.createItem(fieldToUpdate);
        const afterArray = [...items];
        afterArray[itemSelected] = fieldToUpdate;
        onUpdateField(afterArray);
        setDisabled((prevstate) => !prevstate);
      } catch (error) {
        onFailApi();
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }
    }
  };

  const prepareToDelete = () => {
    setOpenModal(true);
  };

  const handleDeleteField = async (readyForDelete = false) => {
    if (disabled) {
      if (readyForDelete) {
        try {
          const itemList = [...items];
          const itemsBeforeDelete = [...itemsFiltered];
          const fieldToDelete = itemsBeforeDelete[index].id;
          const response = await services.deleteItem({ id: fieldToDelete });
          const itemsAfterDelete = itemList.filter(
            (element) => element.id !== fieldToDelete,
          );
          onDeleteField(itemsAfterDelete);
          setDisabled(true);
        } catch (error) {
          if (error.response.data.message === 'itemAssociate') {
            onSetOpenCantDelete('item');
            onSuccessApi();
          } else {
            onFailApi();
            enqueueSnackbar(error.response.data.message, { variant: 'error' });
          }
        }
      }
    } else {
      setDisabled((prevstate) => !prevstate);
    }
  };

  const handleClose = (value) => {
    setOpenModal(false);
    setSelectedValue(value);
    handleDeleteField(value);
  };

  return (
    <>
      <TableCell component="th" scope="row">
        <Formik
          enableReinitialize
          innerRef={formRef}
          initialValues={{ PUC: itemPUC }}
        >
          {() => (
            <Form id={currentItem.PUC}>
              <Field
                name="PUC"
                margin="dense"
                disabled={disabled}
                onChange={handleChangeItemPUC}
                fullWidth
                className={currentItem.PUC}
                component={FormikTextField}
                onMouseEnter={() => setVisible((prevState) => !prevState)}
                onMouseLeave={() => setVisible((prevState) => !prevState)}
              />
            </Form>
          )}
        </Formik>
      </TableCell>
      <TableCell component="th" scope="row">
        <Formik
          enableReinitialize
          innerRef={formRef}
          initialValues={{ name: itemName }}
        >
          {() => (
            <Form>
              <Field
                name="name"
                margin="dense"
                className={currentItem.name}
                onChange={handleChangeItemName}
                disabled={disabled}
                component={FormikTextField}
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
                    onClick={disabled ? prepareToDelete : handleDeleteField}
                    onMouseEnter={() => setVisible((prevState) => !prevState)}
                    onMouseLeave={() => setVisible((prevState) => !prevState)}
                  >
                    <Icon className="fas fa-times" color="secondary" />
                  </Button>
                </>
              )}
            </Form>
          )}
        </Formik>
      </TableCell>
      <PreventDelete
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
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
  onSetOpenCantDelete: PropTypes.func.isRequired,
  itemsFiltered: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    items: state.groups.groupTabs.items,
    itemsFiltered: state.groups.groupItemField.itemsFiltered,
  };
};

const mapDispatchToprops = {
  onUpdateField: updateFieldItem,
  onStartApi: startApiFetch,
  onFailApi: failApiFetch,
  onSuccessApi: successApiFetch,
  onDeleteField: deleteFieldItem,
  onSetOpenCantDelete: setOpen,
};

export default connect(
  mapStateToProps,
  mapDispatchToprops,
)(Item);
