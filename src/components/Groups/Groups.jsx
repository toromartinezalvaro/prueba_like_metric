import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GroupItem from './Item';
import styles from './Groups.module.scss';

const Group = ({ groups, createOrUpdateGroup, deleteGroup }) => {
  return (
    <div className={styles.container}>
      <Paper classes={{ root: styles.container }}>
        <TableContainer component={Paper}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center">GRUPOS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {groupList.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell align="right">
                        <GroupItem group={group} />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableCell align="right">{row.groups}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div className={styles.actionsContainer}>
        <Fab
          color="primary"
          classes={{ root: styles.fabButtonContainer }}
          disabled={buttonDisabled}
          onClick={generateFieldGroup}
        >
          <Icon className={`fas fa-plus ${styles.fabButton}`} />
        </Fab>
      </div>
    </div>
  );
};

Group.propTypes = {
  groups: PropTypes.array,
  createOrUpdateGroup: PropTypes.func,
  deleteGroup: PropTypes.func,
};

export default Group;
