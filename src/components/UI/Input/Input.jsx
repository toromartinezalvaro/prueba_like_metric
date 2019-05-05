import React, { useState } from "react";
import styles from "./Input.module.scss";
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";

const input = props => {
  const errorStyle = {
    borderBottomColor: "#FF4040"
  };

  const [localValue, setLocalValue] = useState();
  const [errorMessages, setErrorMessages] = useState("");
  const [valid, setValid] = useState(true);

  const validation = value => {
    setErrorMessages("");
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
      let value = localValue === undefined ? props.value : localValue;
      props.onChange({
        name: props.name === undefined ? "" : props.name,
        value: cleanValue(value)
      });
    } else {
      setLocalValue(props.value);
    }
  };

  const cleanNumberMask = value => {
    return value.replace(",", "");
  };

  const cleanCurrencyMask = value => {
    return cleanNumberMask(value).replace("$", "");
  };

  const handleFocus = event => event.target.select();

  const cleanValue = value => {
    if (props.mask === "number") {
      return cleanNumberMask(value);
    } else if (props.mask === "currency") {
      return cleanCurrencyMask(value);
    } else {
      return value;
    }
  };

  const getMask = () => {
    if (props.mask === "number") {
      return createNumberMask({ prefix: "" });
    } else if (props.mask === "currency") {
      return createNumberMask({ allowDecimal: true, decimalLimit: 3 });
    } else {
      return false;
    }
  };

  return (
    <div className={styles.Container}>
      <MaskedInput
        mask={getMask()}
        guide={false}
        name={props.name}
        type={props.type === undefined ? "text" : props.type}
        style={
          !valid && localValue !== undefined
            ? { ...errorStyle, ...props.style }
            : props.style
        }
        className={`${styles.Input} ${props.className}`}
        onChange={event => {
          localValueHandler(event.target.value);
        }}
        onFocus={handleFocus}
        onBlur={syncValues}
        value={localValue === undefined ? props.value : localValue}
        disabled={props.disable}
      />
      <div className={styles.ErrorMessage}>{errorMessages}</div>
    </div>
  );
};

export default input;
