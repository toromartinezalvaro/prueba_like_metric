/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 13th November 2019 12:28:46 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '../UI/Table/Table';
import Numbers from '../../helpers/numbers';

const Collapsables = (props) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <span>{'1'}</span>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Table
          intersect={''}
          headers={['Nomenclatura', 'Area', 'Precio x mts2', 'Precio']}
          columnsMinWidth={true}
          columns={[]}
          data={[]}
          maxHeight={{ maxHeight: '36vh' }}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Collapsables;
