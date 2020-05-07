import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import Icon from '@material-ui/core/Icon';
import Services from '../../../../services/group/groupService';
import Loader from '../../../UI2/Loader/Loader';
import { updateFieldTab, deleteFieldTab } from '../action';
import { startApiFetch, failApiFetch, successApiFetch } from './action';
import { setOpen } from '../ItemPanel/CantDeleteDialog/action';
import style from './TabPanel.module.scss';

const services = new Services();

const TabPanel = ({
  group,
  loadingField,
  index,
  onUpdateField,
  groups,
  onStartApi,
  onFailApi,
  onSuccessApi,
  onDeleteField,
  onSetOpenCantDelete,
}) => {
  const [disabled, setDisabled] = useState(true);

  const [name, setGroupName] = useState(group.categoryName);

  const [visible, setVisible] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleChangeGroupName = (element) => {
    const newGroupName = element.target.value;
    setGroupName(newGroupName);
  };

  const handleChangeForEdit = async () => {
    if (disabled) {
      setDisabled((prevstate) => !prevstate);
    } else {
      onStartApi();
      try {
        const updatedGroups = [...groups];
        const fieldToUpdate = { ...updatedGroups[index], categoryName: name };
        const response = await services.createGroup(fieldToUpdate);
        updatedGroups[index] = fieldToUpdate;
        onUpdateField(updatedGroups);
        setDisabled((prevstate) => !prevstate);
        onSuccessApi();
      } catch (error) {
        onFailApi();
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }
    }
  };

  const handleDeleteField = async () => {
    if (disabled) {
      onStartApi();
      try {
        const groupsBeforeDelete = [...groups];
        const fieldToDelete = groupsBeforeDelete[index].id;
        const response = await services.deleteGroup({ id: fieldToDelete });
        const groupsAfterDelete = groupsBeforeDelete.filter(
          (element) => element.id !== fieldToDelete,
        );
        onDeleteField(groupsAfterDelete);
        setDisabled((prevstate) => !prevstate);
        onSuccessApi();
      } catch (error) {
        if (error.response.data.message === 'groupAssociate') {
          onSetOpenCantDelete('grupo');
          onSuccessApi();
        } else {
          onFailApi();
          enqueueSnackbar(error.response.data.message, { variant: 'error' });
        }
      }
    } else {
      setDisabled((prevstate) => !prevstate);
    }
  };

  return (
    <div role="tabpanel" className={style.Tabpanelroot}>
      <Box p={3}>
        <div className={style.GroupNameContainer}>
          <Loader isLoading={loadingField}>
            <TextField
              name="categoryName"
              defaultValue={group.categoryName}
              onChange={handleChangeGroupName}
              margin="dense"
              disabled={disabled}
              fullWidth
              InputProps={{
                classes: {
                  input: style.GroupTextField,
                },
              }}
              onMouseEnter={() => setVisible((prevState) => !prevState)}
              onMouseLeave={() => setVisible((prevState) => !prevState)}
            />
          </Loader>
          {visible && (
            <>
              <Button
                onClick={handleChangeForEdit}
                onMouseEnter={() => setVisible((prevState) => !prevState)}
                onMouseLeave={() => setVisible((prevState) => !prevState)}
              >
                <Icon
                  className={disabled ? 'fas fa-pen' : 'fas fa-check'}
                  color="primary"
                />
              </Button>
              <Button
                onClick={handleDeleteField}
                onMouseEnter={() => setVisible((prevState) => !prevState)}
                onMouseLeave={() => setVisible((prevState) => !prevState)}
              >
                <Icon className="fas fa-times" color="secondary" />
              </Button>
            </>
          )}
        </div>
      </Box>
    </div>
  );
};

TabPanel.propTypes = {
  group: PropTypes.object.isRequired,
  loadingField: PropTypes.bool.isRequired,
  onClickEditOrCancelField: PropTypes.func.isRequired,
  index: PropTypes.number,
  onUpdateField: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  onStartApi: PropTypes.func.isRequired,
  onFailApi: PropTypes.func.isRequired,
  onSuccessApi: PropTypes.func.isRequired,
  onDeleteField: PropTypes.func.isRequired,
  onSetOpenCantDelete: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loadingField: state.groups.groupTabPanel.loading,
    groups: state.groups.groupTabs.groups,
  };
};

const mapDispatchToProps = {
  onUpdateField: updateFieldTab,
  onStartApi: startApiFetch,
  onFailApi: failApiFetch,
  onSuccessApi: successApiFetch,
  onDeleteField: deleteFieldTab,
  onSetOpenCantDelete: setOpen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabPanel);
