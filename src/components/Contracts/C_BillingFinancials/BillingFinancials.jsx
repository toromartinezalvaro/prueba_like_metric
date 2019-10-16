
import React, { useState } from 'react';
import styles from './BillingFinancials.module.scss';

import BusinessPatner from '../C_BusinessPatner/BusinessPatner';
import GeneralInformation from '../C_GeneralInfo/GeneralInfo';

import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';


import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const BillingFinancials = () => {
    return (
        <Button
            variant="contained"
            color="primary"
            className={styles.button}
            startIcon={<AddIcon />}>
            Agregar Transacción de Facturas
        </Button>
    );
}

export default BillingFinancials;