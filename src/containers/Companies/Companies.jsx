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
      companySelected: undefined,
      actionOn: false,
      companyForAssign: undefined,
    };
  }

  getCompanies = () => {
    this.service
      .getCompanies()
      .then((response) => {
        const companies = response.data;
        this.setState({ companies });
      })
      .catch(() =>
        this.props.spawnMessage('Error al conectar con el servidor', 'error'),
      );
  };

  getProject = () => {
    this.service
      .getProjects()
      .then((response) => {
        const projects = response.data;
        this.setState({ projects });
      })
      .catch(() =>
        this.props.spawnMessage('Error al conectar con el servidor', 'error'),
      );
  };

  createCompany = (company) => {
    this.service
      .create(company)
      .then(() => {
        this.props.spawnMessage(
          'La compañía fué creada exitosamente ',
          'success',
        );
        this.getCompanies();
        this.getProject();
      })
      .catch(() =>
        this.props.spawnMessage('No se pudo crear la compañía', 'error'),
      );
  };

  associateModal = () => {
    if (this.state.companySelected) {
      this.getProject();
      this.actionModal();
      const companyForAssign = this.state.companies.find(
        (element) => element.id === this.state.companySelected,
      );
      this.setState({ companyForAssign });
    } else {
      this.props.spawnMessage('Debes seleccionar una compañía', 'error');
    }
  };

  componentDidMount() {
    this.getProject();
    this.getCompanies();
  }

  actionModal = () => {
    this.setState({ actionOn: !this.state.actionOn });
  };

  companyToSelect = (id) => {
    const companySelected = id;
    this.setState({ companySelected });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Administración de compañías</h1>
        <div className={styles.container}>
          {this.state.companies && (
            <CompaniesSelector
              companies={this.state.companies}
              createCompanyService={this.createCompany}
              companyToSelect={this.companyToSelect}
              associateModal={this.associateModal}
              projects={this.state.projects}
              actionModal={this.actionModal}
              actionOn={this.state.actionOn}
              companyForAssign={this.state.companyForAssign}
            />
          )}
          {this.state.projects && (
            <AssignedCompanies
              associations={this.state.projects}
            />
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
