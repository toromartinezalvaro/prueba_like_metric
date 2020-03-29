import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidV4 from 'uuid';
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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Styles from './Settings.module.scss';
import { toggleShowNoIncrement, changeGroup } from './actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
Transition.displayName = 'TransitionComponent';

const Settings = ({
  selectedGroup,
  showPricesWithoutIncrement,
  groups,
  onTogglePrice,
  onChangeGroup,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const togglePriceHandler = useCallback(() => {
    onTogglePrice();
  }, []);

  const changeGroupHandler = (event) => {
    onChangeGroup(event.target.value);
  };

  return (
    <Box mb={1}>
      <FormControl classes={{ root: Styles.formControl }}>
        <InputLabel id="group-select">Grupo</InputLabel>
        <Select
          labelId="group-select"
          value={selectedGroup}
          onChange={changeGroupHandler}
        >
          {Object.keys(groups).map((group) => (
            <MenuItem key={uuidV4()} value={group}>
              Grupo {group}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
                  checked={showPricesWithoutIncrement}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

Settings.propTypes = {
  selectedGroup: PropTypes.number.isRequired,
  showPricesWithoutIncrement: PropTypes.bool.isRequired,
  groups: PropTypes.object.isRequired,
  onTogglePrice: PropTypes.func.isRequired,
  onChangeGroup: PropTypes.func.isRequired,
};

const mapStateToProps = ({ strategy }) => {
  return {
    selectedGroup: strategy.settings.selectedGroup,
    showPricesWithoutIncrement: strategy.settings.showPricesWithoutIncrement,
    groups: strategy.root.groups,
  };
};

const mapDispatchToProps = {
  onTogglePrice: toggleShowNoIncrement,
  onChangeGroup: changeGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
