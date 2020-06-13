/*
 * Created Date: Friday June 12th 2020
 * Author: Caraham
 * -----
 * Last Modified: Friday, 12th June 2020 5:59:51 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2020 Instabuild
 */

import React from 'react';
import EmptyContentMessageView from '../../UI/EmptyContentMessageView';
import Styles from './MessageSold.module.scss';

const MessageSold = () => {
  return (
    <div className={Styles.Container}>
      <EmptyContentMessageView message="La vista de esquema se ha deshabilitado dado que ya se realizaron ventas en la torre" />
    </div>
  );
};

export default MessageSold;
