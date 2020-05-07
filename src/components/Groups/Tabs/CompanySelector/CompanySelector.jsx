import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import _ from 'lodash';
import Select from '@material-ui/core/Select';
import { useSnackbar } from 'notistack';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { setCompanyId, setGroups, setItems } from '../action';
import Services from '../../../../services/group/groupService';
import style from './CompanySelector.module.scss';

const services = new Services();

export const CompanySelector = ({
  companies,
  companyid,
  onSetCompanyId,
  onSetGroups,
  onSetItems,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const fetch = async (companyId) => {
    try {
      const responseGroups = await services.getAllGroup(companyId);
      const responseItems = await services.getAllItems();
      onSetGroups(
        _.orderBy(
          responseGroups.data,
          [(group) => group.categoryName.toLowerCase()],
          ['asc'],
        ),
      );
      onSetItems(responseItems.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };
  const options = () =>
    companies.map((companie) => (
      <MenuItem value={companie.id} key={companie.id}>
        {companie.name}
      </MenuItem>
    ));
  const handleChangeCompany = (element) => {
    const company = element.target.value;
    onSetCompanyId(company);
    fetch(company);
  };
  return (
    <>
      <Typography classes={{ root: style.rootTypography }} variant="h6">
        <Box alignContent="center">
          Estás en los grupos e items de la compañía
        </Box>
        <Box className={style.rootBoxSelect}>
          <FormControl>
            <InputLabel>Compañías</InputLabel>
            <Select
              value={companyid}
              onChange={handleChangeCompany}
              classes={{ root: style.rootSelect }}
            >
              {options()}
            </Select>
          </FormControl>
        </Box>
      </Typography>
    </>
  );
};

CompanySelector.propTypes = {
  companies: PropTypes.array.isRequired,
  companyid: PropTypes.number.isRequired,
  onSetCompanyId: PropTypes.func.isRequired,
  onSetGroups: PropTypes.func.isRequired,
  onSetItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  companies: state.groups.groupTabs.companies,
  companyid: state.groups.groupTabs.companyId,
});

const mapDispatchToProps = {
  onSetCompanyId: setCompanyId,
  onSetGroups: setGroups,
  onSetItems: setItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanySelector);
