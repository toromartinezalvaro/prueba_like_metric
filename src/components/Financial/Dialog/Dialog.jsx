import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Steps from './Steps';
import Info from './Info';

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

const Dialog = () => {
  const classes = useStyles();
  return (
    <MuiDialog open fullScreen TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="close">
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
  );
};

Dialog.propTypes = {};

export default Dialog;
