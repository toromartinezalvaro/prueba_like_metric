import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import styles from './OrganizationContact.module.scss';


const OrganizationContact = () => {
    return (
        <Grid container
            className={styles.gridContainer}
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={3}>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    required
                    select
                    className={styles.textField}
                    label="Unidad De Negocio"
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    required
                    select
                    className={styles.textField}
                    label="Dueño Del Contrato"
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={6} md={6}>
                <Grid container direction="row" alignItems="center" className={styles.leftInputs} spacing={4} justify="center">
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            required
                            select
                            className={styles.selectForced}
                            label="Unidad organizacional"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6} className = {styles.buttons}>
                        <Fab color="primary" size="small" aria-label="add" className={styles.fab}>
                            <AddIcon />
                        </Fab>
                        <Fab color="secondary" mx={2} size="small" aria-label="edit" className={styles.fab}>
                            <EditIcon />
                        </Fab>
                    </Grid>
                    <TextField
                        className={styles.leftInputs}
                        label="Persona Adicional De Contacto"
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
        </Grid >
    );
}

export default OrganizationContact;