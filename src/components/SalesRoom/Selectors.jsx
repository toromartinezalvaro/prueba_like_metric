import React from 'react';
import Button from '../UI/Button/Button';

const Selectors = props => {
  return (
    <div>
      <Button
        onClick={() => {
          props.makeArrayOfProperties(props.response, 'price');
        }}
      >
        Precio
      </Button>
      <Button
        onClick={() => {
          props.makeArrayOfProperties(props.response, 'mts2');
        }}
      >
        Mt2
      </Button>
    </div>
  );
};

export default Selectors;
