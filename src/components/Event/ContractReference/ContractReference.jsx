import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './ContractReference.module.scss';

const Option = (props) => {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
};

const ContractReference = () => {
  return (
    <div className={styles.itemSelect}>
      <Select
        required
        inputId="react-select-single"
        TextFieldProps={{
          label: 'Socio de negocios',
          InputLabelProps: {
            htmlFor: 'react-select-single',
            shrink: true,
          },
        }}
        placeholder="Seleccione un contrato"
        components={Option}
      />
    </div>
  );
};

export default ContractReference;
