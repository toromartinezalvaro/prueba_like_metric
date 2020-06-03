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
  edition,
}) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.noHover}>{children}</div>
      <div className={Styles.hover}>
        {status !== 'SOLD' || edition ? (
          <>
            {option === options.EDIT && (
              <Button
                className={Styles.button}
                onClick={updateHandler}
                disabled={status === stateType.Sold.code && !edition}
              >
                <i className="fas fa-edit"></i>
              </Button>
            )}
            {option === options.DELETE && (
              <Button
                className={Styles.button}
                onClick={removeAreaHandler}
                disabled={status === stateType.Sold.code && !edition}
              >
                <i className="fas fa-trash-alt"></i>
              </Button>
            )}
          </>
        ) : (
          <span>No disponible</span>
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
  edition: PropTypes.bool.isRequired,
};

export default HoverContainer;