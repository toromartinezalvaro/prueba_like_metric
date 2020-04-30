import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import styles from '../Groups.module.scss';

export default function Item({ group, deleteGroup, createOrUpdateGroup }) {
  const [disabled, setDisabled] = useState(true);
  const [tempGroup, setTempGroup] = useState(null);
  const [hoverMouse, setHoverMouse] = useState(false);
  const changeGroupName = (element) => {
    const groupName = { ...group, categoryName: element.target.value };
    setTempGroup(groupName);
  };
  const createOrEditField = () => {
    setDisabled((prevState) => !prevState);
    if (!disabled) {
      createOrUpdateGroup(tempGroup);
    }
  };
  const cancelOrDeleteField = (id) => () => {
    if (disabled) {
      deleteGroup(id);
    } else {
      setDisabled((prevState) => !prevState);
    }
  };
  return (
    <div className={styles.listContainer}>
      <TextField
        label="Nombre del grupo"
        variant="outlined"
        disabled={disabled}
        defaultValue={group.categoryName}
        classes={{ root: styles.texfieldOptions }}
        fullWidth
        onChange={changeGroupName}
        onMouseEnter={() => setHoverMouse((prevState) => !prevState)}
        onMouseLeave={() => setHoverMouse((prevState) => !prevState)}
      />
      {hoverMouse && (
        <>
          <Button
            color="primary"
            onClick={createOrEditField}
            onMouseEnter={() => setHoverMouse((prevState) => !prevState)}
            onMouseLeave={() => setHoverMouse((prevState) => !prevState)}
          >
            <Icon className={disabled ? 'fas fa-pen' : 'fas fa-check'} />
          </Button>
          <Button
            color="secondary"
            onClick={cancelOrDeleteField(group.id)}
            onMouseEnter={() => setHoverMouse((prevState) => !prevState)}
            onMouseLeave={() => setHoverMouse((prevState) => !prevState)}
          >
            <Icon className="fas fa-times" />
          </Button>
        </>
      )}
    </div>
  );
}
Item.propTypes = {
  group: PropTypes.array,
  createOrUpdateGroup: PropTypes.func,
  deleteGroup: PropTypes.func,
};
