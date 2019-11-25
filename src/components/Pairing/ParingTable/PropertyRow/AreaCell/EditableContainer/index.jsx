import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../UI2/Button';
import Styles from './EditableContainer.module.scss';

const EditableContainer = ({ children, updateHandler }) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.noHover}>{children}</div>
      <div className={Styles.hover}>
        <Button className={Styles.button} onClick={updateHandler}>
          <i className="fas fa-edit"></i>
        </Button>
        <Button className={Styles.button}>
          <i className="fas fa-trash-alt"></i>
        </Button>
      </div>
    </div>
  );
};

EditableContainer.propTypes = {
  children: PropTypes.node,
  updateHandler: PropTypes.func.isRequired,
};

export default EditableContainer;
