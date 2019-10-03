import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Styles from './Input.module.scss';

const CURRENCY = 'currency';
const PERCENTAGE = 'percentage';

const Input = ({
  useInternalState,
  className,
  value,
  onChange,
  mask,
  ...rest
}) => {
  const [state, setState] = useState(value);

  useEffect(() => {
    if (useInternalState) {
      setState(value);
    }
  }, [value]);

  const handleOnChange = (event) => {
    if (useInternalState) {
      setState(event.target.value);
    } else {
      onChange(event);
    }
  };

  return (
    <div className={`${Styles.container} ${className}`}>
      {mask === CURRENCY ? <span>$</span> : null}
      <input
        className={Styles.input}
        value={useInternalState ? state : value}
        onChange={handleOnChange}
        {...rest}
      />
      {mask === PERCENTAGE ? (
        <div>
          <span>%</span>
        </div>
      ) : null}
    </div>
  );
};

Input.propTypes = {
  useInternalState: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  mask: PropTypes.oneOf([CURRENCY, PERCENTAGE]),
};

Input.defaultProps = {
  useInternalState: false,
  className: '',
  value: '',
  onChange: () => null,
  mask: null,
};

export default Input;
