import React, { useState, useContext, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import Styles from './Settings.module.scss';
import Context from '../../../containers/StrategyV2/context';
import { togglePrice } from '../../../containers/StrategyV2/actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
Transition.displayName = 'TransitionComponent';

const Settings = () => {
  const { state, dispatch } = useContext(Context);

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const togglePriceHandler = useCallback(() => {
    dispatch(togglePrice());
  }, []);

  return (
    <Box mb={1}>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar classes={{ root: Styles.appBar }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Configuración</Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <List subheader={<ListSubheader>Precios</ListSubheader>}>
            <ListItem button onClick={togglePriceHandler}>
              <ListItemText>Mostrar precios sin incrementos</ListItemText>
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={togglePriceHandler}
                  checked={state.settings.prices.withoutIncrements}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Settings;
