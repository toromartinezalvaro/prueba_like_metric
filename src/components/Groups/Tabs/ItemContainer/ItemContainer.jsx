import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import ItemPanel from '../ItemPanel';
import styles from './ItemContainer.module.scss';
import { openCreateItemDialog } from '../CreateItemDialog/action';
import { setGroupExpanded } from '../action';
import CreateItemDialog from '../CreateItemDialog';

export const ItemContainer = ({
  groups,
  onOpenCreateItemDialog,
  onSetGroupExpanded,
}) => {
  const [expanded, setExpanded] = useState('No open');

  const handleChangePanel = (panel, groupId) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : 'No open');
    onSetGroupExpanded(groupId);
  };

  return (
    <div>
      {groups.map((group, index) => {
        return (
          <ExpansionPanel
            expanded={expanded === `panel${index}`}
            onChange={handleChangePanel(`panel${index}`, group.id)}
            classes={{ root: styles.expansionHeader }}
            key={index}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <h5>{group.categoryName}</h5>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{ root: styles.expansionDetail }}>
              <Paper>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Id</TableCell>
                      <TableCell align="center">Nombre</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <ItemPanel />
                  </TableBody>
                </Table>
                <Fab
                  color="primary"
                  onClick={() => {
                    onOpenCreateItemDialog();
                  }}
                >
                  <AddIcon />
                </Fab>
                <CreateItemDialog />
              </Paper>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
};

ItemContainer.propTypes = {
  groups: PropTypes.array.isRequired,
  onOpenCreateItemDialog: PropTypes.bool.isRequired,
  onSetGroupExpanded: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  groups: state.groups.groupTabs.groups,
});

const mapDispatchToProps = {
  onOpenCreateItemDialog: openCreateItemDialog,
  onSetGroupExpanded: setGroupExpanded,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemContainer);
