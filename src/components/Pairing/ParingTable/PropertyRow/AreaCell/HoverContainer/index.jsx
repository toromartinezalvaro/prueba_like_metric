import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../UI2/Button';
import stateType from './stateType.enum';
import Styles from './HoverContainer.module.scss';

export const options = {
  EDIT: 'e',
  DELETE: 'd',
};

const HoverContainer = ({
  children,
  updateHandler,
  removeAreaHandler,
  option,
  status,
}) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.noHover}>{children}</div>
      <div className={Styles.hover}>
        {option === options.EDIT && (
          <Button
            className={Styles.button}
            onClick={updateHandler}
            disabled={status === stateType.Sold.code}
          >
            <i className="fas fa-edit"></i>
          </Button>
        )}
        {option === options.DELETE && (
          <Button
            className={Styles.button}
            onClick={removeAreaHandler}
            disabled={status === stateType.Sold.code}
          >
            <i className="fas fa-trash-alt"></i>
          </Button>
        )}
      </div>
    </div>
  );
};

HoverContainer.propTypes = {
  children: PropTypes.node,
  updateHandler: PropTypes.func.isRequired,
  option: PropTypes.oneOf(Object.values(options)),
  removeAreaHandler: PropTypes.func.isRequired,
  status: PropTypes.string,
};

export default HoverContainer;
