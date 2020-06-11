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
import {
  setGroups,
  setItems,
  setCompanies,
} from '../../components/Groups/Tabs/action';

const services = new Services();

const Groups = ({
  apiLoading,
  onStartApiFetch,
  onApiFetchSuccess,
  onSetCompanies,
  onApiFetchFail,
  apiError,
  onSetGroups,
  onSetItems,
  groups,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    async function fetch() {
      try {
        const response = await services.getCompanies();
        console.log('RESPONSE', response.data);
        const companies = response.data.filter((company) => company !== null);
        onSetCompanies(
          _.orderBy(
            companies,
            [(company) => company.name.toLowerCase()],
            ['asc'],
          ),
        );
        onApiFetchSuccess();
      } catch (error) {
        onApiFetchFail();
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
    fetch();
  }, [groups]);
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
  onSetCompanies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  apiLoading: state.groups.root.loading,
  apiError: state.groups.root.error,
  groups: state.groups.groupTabs.groups,
});
const mapDispatchToProps = {
  onStartApiFetch: startApiFetch,
  onApiFetchSuccess: successApiFetch,
  onApiFetchFail: failApiFetch,
  onSetGroups: setGroups,
  onSetItems: setItems,
  onSetCompanies: setCompanies,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Groups);
