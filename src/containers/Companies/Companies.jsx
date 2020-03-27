import React from 'react';
import PropTypes from 'prop-types';
import CompanyServices from '../../services/companies/index';
import CompaniesSelector from '../../components/Companies/CompanieSelector';
import AssignedCompanies from '../../components/Companies/AssignedCompanies';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';
import styles from './Companies.module.scss';

class Companies extends React.Component {
  constructor(props) {
    super(props);
    this.service = new CompanyServices();
    this.state = {
      companies: [],
      projects: undefined,
    };
  }

  getCompanies = () => {
    this.service
      .getCompanies()
      .then((response) => {
        const companies = response.data;
        this.setState({ companies });
      })
      .catch((error) => this.props.spawnMessage(error, 'error'));
  };

  getProject = () => {
    this.service
      .getProjects()
      .then((response) => {
        const projects = response.data;
        console.log('PROJECTS', projects);
        this.setState({ projects });
      })
      .catch((error) => this.props.spawnMessage(error, 'error'));
  };

  createCompany = (company) => {
    this.service
      .create(company)
      .then((response) => {
        this.props.spawnMessage(
          'La compañía fué creada exitosamente ',
          'success',
        );
        this.getCompanies();
        this.getProject();
      })
      .catch((error) => {
        this.props.spawnMessage(error, 'error');
      });
  };

  componentDidMount() {
    this.getProject();
    this.getCompanies();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Administración de compañías</h1>
        <div className={styles.container}>
          {this.state.companies && (
            <CompaniesSelector
              companies={this.state.companies}
              createCompanyService={this.createCompany}
            />
          )}
          {this.state.projects && (
            <AssignedCompanies associations={this.state.projects} />
          )}
        </div>
      </React.Fragment>
    );
  }
}

Companies.propTypes = {
  spawnMessage: PropTypes.func,
};

export default withDefaultLayout(Companies);
