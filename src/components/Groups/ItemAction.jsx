import React, { useEffect, useState } from 'react';
import { Card, Fab, Icon, TextField, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './Items.module.scss';

const ItemAction = ({
  items,
  createOrUpdateItem,
  deleteItem,
  contractCategoryId,
  setGlobalItemList,
}) => {
  const [item, setItem] = useState(undefined);
  const [itemList, setItemList] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const itemLocked = items.map((singleItem) => {
      return { ...singleItem, disabled: true };
    });
    setItemList(itemLocked);
  }, [items]);

  const changeItem = (name, index) => (element) => {
    const itemTemp = [...itemList];
    const selectedItem = itemList[index];
    const currentItem = {
      ...selectedItem,
      [name]: element.target.value,
    };
    itemTemp[index] = currentItem;
    setItemList(itemTemp);
  };

  const changeItemPUC = (index) => (element) => {
    const itemTemp = [...itemList];
    const selectedItem = itemList[index];
    const currentItem = {
      ...selectedItem,
      PUC: element.target.value,
    };
    itemTemp[index] = currentItem;
    setItemList(itemTemp);
  };
  const addFieldToItem = (index) => () => {
    const added = [...itemList];
    const selectedItem = added[index];
    added[index] = { ...selectedItem, disabled: true };
    createOrUpdateItem(added[index]);
    setButtonDisabled(false);
    setItemList(added);
    setGlobalItemList(added[index]);
  };

  const deleteFieldFromItem = (index) => () => {
    const itemListWithoutItemDeleted = [...itemList];
    deleteItem({ id: itemListWithoutItemDeleted[index].id });
    const indexToDelete = itemListWithoutItemDeleted.filter(
      (itemValue, i) => i !== index,
    );
    setItemList(indexToDelete);
    setGlobalItemList(indexToDelete, true);
    const validation = indexToDelete.find(
      (itemValue) =>
        itemValue.disabled === false || itemValue.disabled === undefined,
    );
    if (validation) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const editFieldToItem = (id, index) => () => {
    const itemListItemToEdit = [...itemList];
    let selectedItemToEdited = itemListItemToEdit.find(
      (element) => element.id === id,
    );
    selectedItemToEdited = { ...selectedItemToEdited, disabled: false };
    itemListItemToEdit[index] = selectedItemToEdited;
    setItemList(itemListItemToEdit);
  };
  const generateFieldItem = () => {
    const itemArray = itemList;
    const validation = itemArray.find(
      (itemValue) =>
        itemValue.disabled === false || itemValue.disabled === undefined,
    );
    if (validation) {
      setButtonDisabled(true);
    } else {
      const index = itemList.length === 0 ? 0 : itemList.length;
      const currentItem = [
        ...itemArray,
        { index, PUC: null, name: null, disabled: false, contractCategoryId },
      ];
      setButtonDisabled(true);
      setItemList(currentItem);
    }
  };
  const displayNames = () => {
    return itemList.map((itemValue, index) => {
      return (
        <div className={styles.cont} key={index}>
          <TextField
            defaultValue={itemValue.name}
            classes={{ root: styles.field }}
            onChange={changeItem('name', index)}
            disabled={itemValue.disabled}
          />
          <Button
            color="primary"
            onClick={
              itemValue.disabled
                ? editFieldToItem(itemValue.categoryName, index)
                : addFieldToItem(index)
            }
            size="small"
          >
            <Icon
              className={itemValue.disabled ? 'fas fa-pen' : 'fas fa-check'}
            />
          </Button>
          <Button
            color="secondary"
            onClick={deleteFieldFromItem(index)}
            size="small"
          >
            <Icon className="fas fa-times" />
          </Button>
        </div>
      );
    });
  };
  const displayIds = () => {
    return itemList.map((itemValue, index) => {
      return (
        <div className={styles.contPUC} key={index}>
          <TextField
            defaultValue={itemValue.PUC}
            InputLabelProps={{
              shrink: true,
            }}
            type="number"
            classes={{ root: styles.field }}
            onChange={changeItemPUC(index)}
            disabled={itemValue.disabled}
          />
        </div>
      );
    });
  };
  return (
    <div>
      <Card classes={{ root: styles.wrapContainer }} elevation={2}>
        <div className={styles.PUC}>
          <div className={styles.header}>
            <h5 className={styles.title}>ID</h5>
            <hr />
          </div>
          {displayIds()}
        </div>
        <div className={styles.NAME}>
          <div className={styles.header}>
            <h5 className={styles.title}>NOMBRE</h5>
            <hr />
          </div>
          {displayNames()}
        </div>
      </Card>
      <div className={styles.actionsContainer}>
        <Fab
          color="primary"
          size="medium"
          classes={{ root: styles.fabButtonContainer }}
          disabled={buttonDisabled}
          onClick={generateFieldItem}
        >
          <Icon className={`fas fa-plus ${styles.fabButton}`} />
        </Fab>
      </div>
    </div>
  );
};

ItemAction.propTypes = {
  items: PropTypes.array,
  createOrUpdateItem: PropTypes.func,
  deleteItem: PropTypes.func,
  contractCategoryId: PropTypes.number,
  setGlobalItemList: PropTypes.func,
};

export default ItemAction;
