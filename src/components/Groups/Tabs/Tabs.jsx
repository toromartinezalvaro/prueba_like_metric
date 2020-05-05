import React, { useEffct } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import MuiTabs from '@material-ui/core/Tabs';
import Fab from '@material-ui/core/Fab';
import Tab from '@material-ui/core/Tab';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import CreateGroupDialog from './CreateGroupDialog';
import { openCreateDialog } from './CreateGroupDialog/action';
import { changeSelectedTab } from './action';
import TabPanel from './TabPanel';
import ItemContainer from './ItemContainer';
import CompanySelector from './CompanySelector';

import style from './Tabs.module.scss';

const Tabs = ({
  onOpenCreateGroupDialog,
  groups,
  onSelectedGroup,
  tabNumber,
  companyId,
}) => {
  const changeValue = (event, newEvent) => {
    onSelectedGroup(newEvent);
  };

  return (
    <>
      <CompanySelector />
      <Paper square className={style.root}>
        <MuiTabs
          value={tabNumber}
          onChange={changeValue}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="icon tabs example"
        >
          <Tab icon={<GroupWorkIcon />} label="GRUPO" />
          <Tab icon={<AccountTreeIcon />} label="ITEMS" />
        </MuiTabs>
        {tabNumber === 0 ? (
          groups.map((group, index) => {
            return <TabPanel group={group} index={index} key={index} />;
          })
        ) : (
          <ItemContainer />
        )}
        {tabNumber === 0 && (
          <Fab
            color="primary"
            onClick={() => {
              onOpenCreateGroupDialog();
            }}
            disabled={!companyId}
          >
            <AddIcon />
          </Fab>
        )}
      </Paper>
      <CreateGroupDialog />
    </>
  );
};

Tabs.propTypes = {
  onOpenCreateGroupDialog: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  onSelectedGroup: PropTypes.func.isRequired,
  tabNumber: PropTypes.number.isRequired,
  companyId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  groups: state.groups.groupTabs.groups,
  tabNumber: state.groups.groupTabs.tabNumber,
  companyId: state.groups.groupTabs.companyId,
});

const mapDispatchToProps = {
  onOpenCreateGroupDialog: openCreateDialog,
  onSelectedGroup: changeSelectedTab,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tabs);
