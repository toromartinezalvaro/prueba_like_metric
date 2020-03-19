import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import Styles from './Selectors.module.scss';

const PRICE_WITH_INCREMENTS = 'priceWithIncrements';
const PRICE = 'price';
const M2 = 'mts2';
const GROUPS = 'groups';
const NAME = 'name';

const Selectors = (props) => {
  const [selectedButton, setSelectedButton] = useState(
    `${props.agent === 'super' ? PRICE_WITH_INCREMENTS : NAME}`,
  );

  return (
    <div className={Styles.container}>
      <Button
        className={
          selectedButton !== PRICE_WITH_INCREMENTS && Styles.outlineButton
        }
        onClick={() => {
          setSelectedButton(PRICE_WITH_INCREMENTS);
          props.makeArrayOfProperties(props.response, 'priceWithIncrements');
        }}
      >
        Precio con incrementos
      </Button>
      <Button
        className={selectedButton !== PRICE && Styles.outlineButton}
        onClick={() => {
          setSelectedButton(PRICE);
          props.makeArrayOfProperties(props.response, 'price');
        }}
      >
        Precio sin incrementos
      </Button>

      <Button
        className={selectedButton !== M2 && Styles.outlineButton}
        onClick={() => {
          setSelectedButton(M2);
          props.makeArrayOfProperties(props.response, 'mts2');
        }}
      >
        Mt2
      </Button>
      <Button
        className={selectedButton !== GROUPS && Styles.outlineButton}
        onClick={() => {
          setSelectedButton(GROUPS);
          props.makeArrayOfProperties(props.response, 'groups');
        }}
      >
        Tipos
      </Button>
      <Button
        className={selectedButton !== NAME && Styles.outlineButton}
        onClick={() => {
          setSelectedButton(NAME);
          props.makeArrayOfProperties(props.response, 'name');
        }}
      >
        Nomenclatura
      </Button>
    </div>
  );
};

export default Selectors;
