/*
 * Created by Jcatman on Fri Nov 01 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import NumberFormat from 'react-number-format';
import BillingFinancials from '../../Content/BillingFinancials/BillingFinancials';
import styles from './BillingFinancials.module.scss';

const ExpandBillingFinancials = ({
  sendBillings,
  towerId,
  events,
  currentEvent,
  dataIfEdit,
  watchingContract,
  sendToDelete,
}) => {
  const [AmountWithoutIva, setAmountWithoutIva] = useState();
  const [AmountWithIva, setAmountWithIva] = useState();
  const displayOnHeader = (amountWithoutIva, amountWithIva) => {
    setAmountWithoutIva(amountWithoutIva);
    setAmountWithIva(amountWithIva);
  };
  return (
    <ExpansionPanel className={styles.expansionPanel} mt={4} expanded={true}>
      <ExpansionPanelSummary aria-controls="generalInformationContent">
        <Typography className={styles.heading}>
          <div
            className={`${styles.circleIcon}  ${styles.circleColorFinantials}`}
          >
            <Icon className={`${styles.icon} fas fa-tag`} />
          </div>
          <div className={styles.titleExpand}>
            <div className={styles.col1}>Facturación y Finanzas</div>
            <div className={styles.col2}>
              <div className={styles.displayValue}>
                Valor antes del IVA total:
                <NumberFormat
                  value={Number(AmountWithoutIva).toFixed(0)}
                  displayType="text"
                  className={styles.totalAmount}
                  decimalSeparator={false}
                  thousandSeparator
                  prefix="$"
                />
              </div>
            </div>
            <div className={styles.col3}>
              <div className={styles.displayValue}>
                Valor de IVA total :
                <NumberFormat
                  value={Number(AmountWithIva - AmountWithoutIva).toFixed(0)}
                  displayType="text"
                  className={styles.totalAmount}
                  decimalSeparator={false}
                  thousandSeparator
                  prefix="$"
                />
              </div>
            </div>
            <div className={styles.col4}>
              <div className={styles.displayValue}>
                Valor despues de IVA total:
                <NumberFormat
                  value={Number(AmountWithIva).toFixed(0)}
                  displayType="text"
                  className={styles.totalAmount}
                  decimalSeparator={false}
                  thousandSeparator
                  prefix="$"
                />
              </div>
            </div>
          </div>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <BillingFinancials
            towerId={towerId}
            sendBillings={sendBillings}
            events={events}
            currentEvent={currentEvent}
            dataIfEdit={dataIfEdit}
            watchingContract={watchingContract}
            sendToDelete={sendToDelete}
            displayOnHeader={displayOnHeader}
          />
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpandBillingFinancials;
