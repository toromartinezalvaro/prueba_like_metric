
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import styles from './BillingFinancials.module.scss';

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