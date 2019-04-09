import React, { useState } from 'react';
import styles from './Input.module.scss';

const input = props => {

  const errorStyle = {
    borderBottomColor: "#FF4040"
  };
  const [initialTarget, setInitialTarget] = useState({ name: props.name, value: props.value })
  const [localTarget, setLocalTarget] = useState(initialTarget);
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

  const localTargetHandler = target => {   
    console.debug("event... ", initialTarget, target.value);
    setValid(validation(target.value));
    let currentTarget = initialTarget
    currentTarget.value = target.value
    setLocalTarget(currentTarget);
  };

  const syncValues = () => {
    if (valid) {
      props.onChange(localTarget);
    } else {
      setLocalTarget(initialTarget);
    }
  };

  return (
    <div className={styles.Container}>
      <input name={props.name} type="text"
        style={!valid && localTarget.value !== undefined ? errorStyle : {}}
        className={`${styles.Input} ${props.className}`}
        onChange={event => { localTargetHandler(event.target) }}
        onBlur={syncValues}
        value={localTarget === undefined ? props.value : localTarget.value}
        disabled={props.disable} />
      <div className={styles.ErrorMessage}>
        {errorMessages}
      </div>
    </div>

  );
}

export default input;