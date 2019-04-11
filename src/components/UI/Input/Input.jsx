import React, { useState } from 'react';
import styles from './Input.module.scss';

const input = props => {

  const errorStyle = {
    borderBottomColor: "#FF4040"
  };

  const [localValue, setLocalValue] = useState();
  const [errorMessages, setErrorMessages] = useState("");
  const [valid, setValid] = useState(true);

  const validation = value => {
    setErrorMessages("")
    return props.validations.reduce((current, next) => {

      const val = next.fn(value);
      if (!val) {
        setErrorMessages(next.message);
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
      props.onChange({ name: props.name === undefined ? "" : props.name, value: localValue });
    } else {
      setLocalValue(props.value);
    }
  };

  return (
    <div className={styles.Container}>
      <input
        name={props.name}
        type={props.type === undefined ? "text" : props.type }
        style={!valid && localValue !== undefined ? errorStyle : {}}
        className={`${styles.Input} ${props.className}`}
        onChange={event => { localValueHandler(event.target.value) }}
        onBlur={syncValues}
        value={localValue === undefined ? props.value : localValue}
        disabled={props.disable} />
      <div className={styles.ErrorMessage}>
        {errorMessages}
      </div>
    </div>

  );
}

export default input;