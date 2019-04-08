import React, { useState } from 'react';
import styles from './Input.module.scss';
import uuid from 'uuid/v4';

const input = props => {

  const errorStyle = {
    borderBottomColor: "#FF4040"
  };
  
  const [localValue, setLocalValue] = useState();
  const [errorMessages, setErrorMessages] = useState([]);
  const [valid, setValid] = useState(true);

  const validation = value => {
    setErrorMessages([]);
    return props.validations.reduce((current, next) => {

      const val = next.fn(value);
      if (!val) {
        setErrorMessages([...errorMessages, next.message]);
      }

      return current && val;

    }, true);
  };

  const localValueHandler = value => {   
    setValid(validation(value));
    setLocalValue(value);
  };

  const syncValues = () => {
    if (valid) {
      props.onChange(localValue);
    } else {
      setLocalValue(props.value);
    }
  };

  return (
    <div className={styles.Container}>
      <input type="text"
        style={!valid && localValue !== undefined ? errorStyle : {}}
        className={`${styles.Input} ${props.className}`}
        onChange={event => { localValueHandler(event.target.value) }}
        onBlur={syncValues}
        value={localValue === undefined ? props.value : localValue}
        disabled={props.disable} />
      <div className={styles.ErrorMessage}>
        {localValue !== undefined ? errorMessages.map((element, index) => <div key={uuid()}>{element}</div>) : ''}
      </div>
    </div>

  );
}

export default input;