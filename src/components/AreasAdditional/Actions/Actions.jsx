/*
 * Created Date: Friday November 29th 2019
 * Author: Caraham
 * -----
 * Last Modified: Friday, 29th November 2019 10:05:03 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */
import React from 'react';
import Button from '@material-ui/core/Button';

const Actions = (props) => {
  return (
    <div>
      <Button
        onClick={() => props.handleUpdate(props.areaType.id)}
        isDisabled={props.disableWhenSold}
        color="primary"
        size="small"
      >
        Editar
      </Button>
      <Button size="small" onClick={props.handleClose}>
        Cancelar
      </Button>
    </div>
  );
};

export default Actions;
