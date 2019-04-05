import React, { useState } from 'react';
import styles from './Input.module.scss';

const input = props => {

  const errorStyle = {
    borderBottomColor: "#FF4040"
  };

  let errorMessage = [];

  const [localValue, changeLocalValue] = useState();


  const validation = () => {
    return props.validations.reduce((current, next) => {

      const val = next.fn(localValue);

      if (!val) {
        errorMessage.push(next.message);
      }

      return current && val;

    }, true);
  };

  const syncValues = () => {
    if (validation()) {
      props.onChange(localValue);
    } else {
      changeLocalValue(props.value);
    }
  };

  return (
    <div className={styles.Container}>
      <input type="text"
        style={!validation() && localValue !== undefined ? errorStyle : {}}
        className={`${styles.Input} ${props.className}`}
        onChange={event => { changeLocalValue(event.target.value) }}
        onBlur={() => { syncValues() }}
        value={localValue === undefined ? props.value : localValue}
        disabled={props.disable} />
      <div className={styles.ErrorMessage}>
        {localValue !== undefined ? errorMessage.map(element => <div>{element}</div>) : ''}
      </div>
    </div>

  );
}

export default input;