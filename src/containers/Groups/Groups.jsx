import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import _ from 'lodash';
import Loader from '../../components/UI2/Loader/Loader';
import Services from '../../services/group/groupService';
import GroupsErrorMessage from '../../components/Groups/ErrorMessage';
import Tabs from '../../components/Groups/Tabs';
import { startApiFetch, successApiFetch, failApiFetch } from './actions';
import { setGroups, setItems } from '../../components/Groups/Tabs/action';

const services = new Services();

const Groups = ({
  apiLoading,
  onStartApiFetch,
  onApiFetchSuccess,
  onApiFetchFail,
  apiError,
  onSetGroups,
  onSetItems,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    async function fetch() {
      try {
        onStartApiFetch();
        const responseGroups = await services.getAllGroup();
        const responseItems = await services.getAllItems();
        onSetGroups(
          _.orderBy(
            responseGroups.data,
            [(group) => group.categoryName.toLowerCase()],
            ['asc'],
          ),
        );
        onSetItems(responseItems.data);
        onApiFetchSuccess();
      } catch (error) {
        onApiFetchFail();
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }
    }
    fetch();
  }, []);
  return (
    <Loader isLoading={apiLoading}>
      {apiError ? <GroupsErrorMessage /> : <Tabs />}
    </Loader>
  );
};
Groups.propTypes = {
  apiLoading: PropTypes.bool.isRequired,
  apiError: PropTypes.bool.isRequired,
  onStartApiFetch: PropTypes.func.isRequired,
  onApiFetchSuccess: PropTypes.func.isRequired,
  onApiFetchFail: PropTypes.func.isRequired,
  onSetGroups: PropTypes.func.isRequired,
  onSetItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  apiLoading: state.groups.root.loading,
  apiError: state.groups.root.error,
});
const mapDispatchToProps = {
  onStartApiFetch: startApiFetch,
  onApiFetchSuccess: successApiFetch,
  onApiFetchFail: failApiFetch,
  onSetGroups: setGroups,
  onSetItems: setItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Groups);
