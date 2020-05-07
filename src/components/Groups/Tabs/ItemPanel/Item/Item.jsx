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

  const { enqueueSnackbar } = useSnackbar();

  const [itemName, setItemName] = useState('');
  const [itemPUC, setItemPUC] = useState('');
  const handleChangeItemName = (element) => {
    const editableItem = element.target.value;
    setItemName(editableItem);
  };

  const submit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    setItemName(currentItem.name);
    setItemPUC(currentItem.PUC);
  }, [currentItem]);

  const handleChangeItemPUC = (element) => {
    const editableItem = element.target.value;
    setItemName(editableItem);
  };

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

  const handleDeleteField = async () => {
    if (disabled) {
      onStartApi();
      try {
        const itemsBeforeDelete = [...itemsFiltered];
        const fieldToDelete = itemsBeforeDelete[index].id;
        const response = await services.deleteItem({ id: fieldToDelete });
        const itemsAfterDelete = itemsBeforeDelete.filter(
          (element) => element.id !== fieldToDelete,
        );
        onDeleteField(itemsAfterDelete);
        setDisabled((prevstate) => !prevstate);
        onSuccessApi();
      } catch (error) {
        if (error.response.data.message === 'itemAssociate') {
          onSetOpenCantDelete('item');
          onSuccessApi();
        } else {
          onFailApi();
          enqueueSnackbar(error.response.data.message, { variant: 'error' });
        }
      }
    } else {
      setDisabled((prevstate) => !prevstate);
    }
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
                    onClick={handleDeleteField}
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
  const current =
    state.groups.groupItemField.itemsFiltered[
      state.groups.groupItemField.index
    ];
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
