import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Paper, Icon, Fab } from '@material-ui/core';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import styles from './Groups.module.scss';

const Group = ({ groups, createOrUpdateGroup, deleteGroup }) => {
  const [group, setGroup] = useState(undefined);
  const [groupList, setGroupList] = useState([]);
  const [columns] = useState([{ name: 'groups', title: 'Grupos' }]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  useEffect(() => {
    const lockedGroups = groups.map((groupItem) => {
      return { ...groupItem, disabled: true, hoverMouse: false };
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

  const hoverMouseAction = (index, visible) => {
    const added = [...(group || groupList)];
    const selectedGroup = added[index];
    added[index] = { ...selectedGroup, hoverMouse: visible };
    setGroupList(added);
  };

  const displayGroupList = () => {
    return groupList.map((groupItem, index) => {
      const groupComponent = (
        <div className={styles.listContainer} key={index}>
          <TextField
            label="Nombre del grupo"
            variant="outlined"
            defaultValue={groupItem.categoryName}
            disabled={groupItem.disabled}
            onChange={changeGroupItem(index)}
            onMouseEnter={() => hoverMouseAction(index, true)}
            onMouseLeave={() => hoverMouseAction(index, false)}
          />
          {groupItem.hoverMouse && (
            <>
              <Button
                color="primary"
                onMouseEnter={() => hoverMouseAction(index, true)}
                onMouseLeave={() => hoverMouseAction(index, false)}
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
              <Button
                onMouseEnter={() => hoverMouseAction(index, true)}
                onMouseLeave={() => hoverMouseAction(index, false)}
                color="secondary"
                onClick={deleteFieldFromGroup(index)}
              >
                <Icon className="fas fa-times" />
              </Button>
            </>
          )}
        </div>
      );
      const object = { groups: groupComponent };
      return object;
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
    <>
      <div className={styles.container}>
        <Paper classes={{ root: styles.container }}>
          <Grid rows={displayGroupList()} columns={columns}>
            <Table />
            <TableHeaderRow />
          </Grid>
        </Paper>
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
    </>
  );
};

Group.propTypes = {
  groups: PropTypes.array,
  createOrUpdateGroup: PropTypes.func,
  deleteGroup: PropTypes.func,
};

export default Group;
