import React, { useEffect } from 'react';
import uuidV4 from 'uuid/v4';
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
import { closeSalesSpeedDialog, setSalesSpeedDialogData } from './actions';
import WidgetGroup from '../../../Shared/WidgetGroup/WidgetGroup';
import SaleSpeed from './SalesSpeed';
import InventoryRotation from './RotationMonths';
import InitialFee from '../InfoWidgets/InitialFee';
import EARate from '../InfoWidgets/EARate';
import DateWidget from './Date';
import UnitsWidget from './Units';
import AveragePriceWidget from './AveragePrice';
import Widget, { LG, Type } from '../../../Shared/Widget';

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

const InventorySalesSepeedModal = ({
  propertyPrice,
  m2,
  open,
  closeHandler,
  setData,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setData({ propertyPrice, m2 });
  }, [open]);

  return (
    <>
      <MuiDialog open={open} TransitionComponent={Transition}>
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
              Velocidad de ventas
            </Typography>
          </Toolbar>
        </AppBar>
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid container spacing={2}>
              {/* <Grid key={uuidV4()} spacing={2}>
                <WidgetGroup
                  showGroup
                  widgets={[
                    <Typography
                      key={uuidV4()}
                      variant="body1"
                      className={classes.title}
                    >
                    </Typography>,
                  ]}
                />
              </Grid> */}
              <Grid key={uuidV4()}>
                <WidgetGroup
                  showGroup
                  widgets={[
                    <DateWidget key={uuidV4()} />,
                    <UnitsWidget key={uuidV4()} />,
                    <AveragePriceWidget key={uuidV4()} />,
                    <SaleSpeed key={uuidV4()} />,
                    <InventoryRotation type={Type.objetive} key={uuidV4()} />,
                    <EARate type={Type.objetive} key={uuidV4()} />,
                    <InitialFee key={uuidV4()} />,
                  ]}
                  key={uuidV4()}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </MuiDialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return { open: state.strategy.salesSpeedDialog.root.open };
  // return { open: true };
};

const mapDispatchToProps = {
  closeHandler: closeSalesSpeedDialog,
  setData: setSalesSpeedDialogData,
};

InventorySalesSepeedModal.propTypes = {
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
)(InventorySalesSepeedModal);
