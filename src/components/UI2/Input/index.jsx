import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
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
      setState(event.target.float);
    } else {
      onChange(event);
    }
  };

  return (
    <div className={`${Styles.container} ${className}`}>
      <NumberFormat
        className={Styles.input}
        onChange={handleOnChange}
        value={useInternalState ? state : value}
        {...rest}
      />
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
