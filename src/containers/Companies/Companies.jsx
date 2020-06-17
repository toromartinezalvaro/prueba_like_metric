import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import CompanyServices from '../../services/companies/index';
import CompaniesSelector from '../../components/Companies/CompanieSelector';
import AssignedCompanies from '../../components/Companies/AssignedCompanies';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';
import commonStyles from '../../assets/styles/variables.scss';
import styles from './Companies.module.scss';

class Companies extends React.Component {
  constructor(props) {
    super(props);
    this.service = new CompanyServices();
    this.state = {
      loading: true,
      companies: [],
      projects: undefined,
      companySelected: undefined,
      actionOn: false,
      companyForAssign: undefined,
      assigned: undefined,
      projectToSelect: undefined,
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
      .create(company.name)
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

  projectsAssociated = () => {
    this.service
      .associatedProjects()
      .then((response) => {
        const assigned = response.data;
        this.setState({ assigned });
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

  assignThisProject = () => {
    if (this.state.projectSelected) {
      this.service
        .associateWithProject(
          this.state.companySelected,
          this.state.projectSelected,
        )
        .then(() => {
          this.props.spawnMessage(
            'El proyecto fue asociado exitosamente',
            'success',
          );
          this.getCompanies();
          this.getProject();
          this.actionModal();
        })
        .catch(() =>
          this.props.spawnMessage('No se pudo asociar el proyecto', 'error'),
        );
    } else {
      this.props.spawnMessage('Debes seleccionar un proyecto', 'error');
    }
  };

  componentDidMount() {
    this.getProject();
    this.getCompanies();
    this.projectsAssociated();
    this.setState({
      loading: false,
    });
  }

  actionModal = () => {
    this.setState({ actionOn: !this.state.actionOn });
  };

  companyToSelect = (id) => {
    const companySelected = id;
    this.setState({ companySelected });
  };

  projectToSelect = (id) => {
    const projectSelected = id;
    this.setState({ projectSelected });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Administración de compañías</h1>
        {this.state.loading ? (
          <div>
            <CircularProgress classes={{ root: styles.loader }} />
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.companieSelector}>
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
                  projectToSelect={this.projectToSelect}
                  assignThisProject={this.assignThisProject}
                />
              )}
            </div>
            {this.state.projects && (
              <AssignedCompanies
                associations={this.state.projects}
                companySelect={this.state.companySelected}
              />
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

Companies.propTypes = {
  spawnMessage: PropTypes.func,
};

export default withDefaultLayout(Companies);
