import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip';
import styles from './Input.module.scss';

const Input = (props) => {
  const errorStyle = {
    borderBottomColor: '#FF4040',
  };

  const [clearValue, setClearValue] = useState(props.clearValue);
  const [dirty, setDirty] = useState(false);
  const [localValue, setLocalValue] = useState();
  const [errorMessages, setErrorMessages] = useState('');
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (props.updateWithProp) {
      setLocalValue(props.value);
    }
  }, [props.value]);

  const validation = (value) => {
    setErrorMessages('');
    return (props.validations || []).reduce((current, next) => {
      const val = next.fn(cleanValue(value));
      if (!val) {
        return setErrorMessages(next.message);
      }
      if (val !== true) {
        if (val.floor === props.floor && val.location === props.location) {
          return true;
        } 
          return setErrorMessages(next.message);
        
      }
      return current && val;
    }, true);
  };
  const localValueHandler = (value) => {
    setValid(validation(value));
    setLocalValue(value);
  };

  const syncValues = () => {
    if (valid) {
      if (dirty && props.zeroDefault && localValue === '') {
        setLocalValue('0');
      }
      let value = localValue === undefined ? props.value : localValue;
      if (
        props.mask === 'number' ||
        props.mask === 'percentage' ||
        props.mask === 'currency'
      ) {
        if (value === '.' || value === '-') {
          value = 0;
        }
      }
      if (value !== props.value && !props.forceUpdate) {
        props.onChange({
          name: props.name === undefined ? '' : props.name,
          value: cleanValue(value),
        });
      }
      if (clearValue) {
        setLocalValue(undefined);
      }
    } else {
      setLocalValue(props.value);
    }
  };

  const cleanNumberMask = (value) => {
    return value ? value.toString().replace(/,/g, '') : '';
  };

  const cleanCurrencyMask = (value) => {
    return cleanNumberMask(value).replace('$', '');
  };

  const cleanPercentageMask = (value) => {
    return cleanNumberMask(value).replace('%', '');
  };

  const handleFocus = (event) => {
    if (localValue == 0 || (localValue === undefined && props.value == 0)) {
      setDirty(true);
      setLocalValue('');
    }
  };

  const cleanValue = (value) => {
    if (props.mask === 'number') {
      return cleanNumberMask(value);
    }
    if (props.mask === 'currency') {
      return cleanCurrencyMask(value);
    } if (props.mask === 'percentage') {
      return cleanPercentageMask(value);
    } else {
      return value;
    }
  };

  // const getMask = () => {
  //   if (props.mask === "number") {
  //     return createNumberMask({ prefix: "" });
  //   } else if (props.mask === "currency") {
  //     return createNumberMask({ allowDecimal: true, decimalLimit: 3 });
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <div className={styles.Container}>
      {props.mask === 'currency' ||
      props.mask === 'number' ||
      props.mask === 'percentage' ? (
        <NumberFormat
          data-tip={props.tooltip}
          thousandSeparator={true}
          prefix={props.mask === 'currency' ? '$' : ''}
          suffix={props.mask === 'percentage' ? '%' : ''}
          name={props.name}
          type={props.type === undefined ? 'text' : props.type}
          style={
            !valid && localValue !== undefined
              ? { ...errorStyle, ...props.style }
              : props.style
          }
          className={`${styles.Input} ${props.className}`}
          onChange={(event) => {
            localValueHandler(event.target.value);
            if (props.forceUpdate) {
              props.onChange({
                name: props.name === undefined ? '' : props.name,
                value: cleanValue(event.target.value),
              });
            }
          }}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              localValueHandler(event.target.value);
              event.target.blur();
            }
            props.onKeyDown();
          }}
          onFocus={handleFocus}
          onBlur={syncValues}
          value={localValue === undefined ? props.value : localValue}
          disabled={props.disable}
          placeholder={props.placeholder}
        />
      ) : (
        <input
          data-tip={props.tooltip}
          name={props.name}
          type={props.type === undefined ? 'text' : props.type}
          style={
            !valid && localValue !== undefined
              ? { ...errorStyle, ...props.style }
              : props.style
          }
          className={`${styles.Input} ${props.className}`}
          onChange={(event) => {
            localValueHandler(event.target.value);
            if (props.forceUpdate) {
              props.onChange({
                name: props.name === undefined ? '' : props.name,
                value: cleanValue(event.target.value),
              });
            }
          }}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              localValueHandler(event.target.value);
              event.target.blur();
            }
            props.onKeyDown();
          }}
          onFocus={handleFocus}
          onBlur={syncValues}
          value={localValue === undefined ? props.value : localValue}
          disabled={props.disable}
          placeholder={props.placeholder}
        />
      )}
      <div className={styles.ErrorMessage}>{errorMessages}</div>
      <ReactTooltip />
    </div>
  );
};

Input.defaultProps = {
  onKeyDown: () => null,
};

export default Input;
