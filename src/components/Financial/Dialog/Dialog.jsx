import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Steps from './Steps';
import Info from './Info';
import {
  openFinancialDialog,
  closeFinancialDialog,
  setFinancialDialogData,
} from './actions';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = ({
  propertyPrice,
  m2,
  open,
  openHandler,
  closeHandler,
  setData,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setData({ propertyPrice, m2 });
  }, [open]);

  return (
    <>
      <Button
        onClick={openHandler}
        variant="outlined"
        color="primary"
        fullWidth
      >
        Plan de pagos especial
      </Button>
      <MuiDialog open={open} fullScreen TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={closeHandler}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Financiero
            </Typography>
          </Toolbar>
        </AppBar>
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Steps />
            </Grid>
            <Grid item xs={6}>
              <Info />
            </Grid>
          </Grid>
        </Box>
      </MuiDialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  open: state.financial.dialog.root.open,
});

const mapDispatchToProps = {
  openHandler: openFinancialDialog,
  closeHandler: closeFinancialDialog,
  setData: setFinancialDialogData,
};

Dialog.propTypes = {
  propertyPrice: PropTypes.number.isRequired,
  m2: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  openHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dialog);
