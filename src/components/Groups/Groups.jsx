import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Fab, Icon, Card } from '@material-ui/core';
import styles from './Groups.module.scss';

const Group = ({ groups, createOrUpdateGroup, deleteGroup }) => {
  const [group, setGroup] = useState(undefined);
  const [groupList, setGroupList] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  useEffect(() => {
    const lockedGroups = groups.map((groupItem) => {
      return { ...groupItem, disabled: true };
    });
    setGroupList(lockedGroups);
  }, [groups]);
  const changeGroupItem = (index) => (element) => {
    const groupTemp = [...groupList];
    const selectedGroup = groupTemp[index];
    const currentGroup = {
      ...selectedGroup,
      categoryName: element.target.value,
    };
    groupTemp[index] = currentGroup;
    setGroup(groupTemp);
  };
  const addFieldToGroup = (index) => () => {
    const added = [...(group || groupList)];
    const selectedGroup = added[index];
    added[index] = { ...selectedGroup, disabled: true };
    createOrUpdateGroup(added[index]);
    setButtonDisabled(false);
    setGroupList(added);
  };
  const deleteFieldFromGroup = (index) => () => {
    const groupListWithoutItemDeleted = [...groupList];
    deleteGroup({ id: groupListWithoutItemDeleted[index].id });
    const indexToDelete = groupListWithoutItemDeleted.filter(
      (groupItem, i) => i !== index,
    );
    setGroupList(indexToDelete);
    const validation = indexToDelete.find(
      (item) => item.disabled === false || item.disabled === undefined,
    );
    if (validation) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };
  const editFieldToGroup = (groupName, index) => () => {
    const groupListItemToEdit = [...groupList];
    let selectedItemToEdited = groupListItemToEdit.find(
      (element) => element.categoryName === groupName,
    );
    selectedItemToEdited = { ...selectedItemToEdited, disabled: false };
    groupListItemToEdit[index] = selectedItemToEdited;
    setGroupList(groupListItemToEdit);
  };
  const displayGroupList = () => {
    return groupList.map((groupItem, index) => {
      return (
        <div className={styles.listContainer} key={index}>
          <TextField
            label="Nombre del grupo"
            variant="outlined"
            defaultValue={groupItem.categoryName}
            disabled={groupItem.disabled}
            onChange={changeGroupItem(index)}
          />
          <Button
            color="primary"
            onClick={
              groupItem.disabled
                ? editFieldToGroup(groupItem.categoryName, index)
                : addFieldToGroup(index)
            }
          >
            <Icon
              className={groupItem.disabled ? 'fas fa-pen' : 'fas fa-check'}
            />
          </Button>
          <Button color="secondary" onClick={deleteFieldFromGroup(index)}>
            <Icon className="fas fa-times" />
          </Button>
        </div>
      );
    });
  };

  const generateFieldGroup = () => {
    const groupArray = groupList;
    const validation = groupArray.find(
      (item) => item.disabled === false || item.disabled === undefined,
    );
    if (validation) {
      setButtonDisabled(true);
    } else {
      const index = groupList.length === 0 ? 0 : groupList.length;
      const currentGroup = [
        ...groupArray,
        { index, name: null, disabled: false },
      ];
      setButtonDisabled(true);
      setGroupList(currentGroup);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <Card classes={{ root: styles.header }}>
          <h2>Grupos</h2>
        </Card>
        <Card classes={{ root: styles.col1 }}>{displayGroupList()}</Card>
        <div className={styles.actionsContainer}>
          <Fab
            color="primary"
            classes={{ root: styles.fabButtonContainer }}
            disabled={buttonDisabled}
            onClick={generateFieldGroup}
          >
            <Icon className={`fas fa-plus ${styles.fabButton}`} />
          </Fab>
        </div>
      </div>
    </React.Fragment>
  );
};

Group.propTypes = {
  groups: PropTypes.array,
  createOrUpdateGroup: PropTypes.func,
  deleteGroup: PropTypes.func,
};

export default Group;
