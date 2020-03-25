import React from 'react';
import { MenuItem } from '@material-ui/core';
import CompanyServices from '../../services/companies/index';
import CompaniesSelector from '../../components/Companies/CompanieSelector';
import AssignedCompanies from '../../components/Companies/AssignedCompanies';
import styles from './Companies.module.scss';

class Companies extends React.Component {
  constructor(props) {
    super(props);
    this.service = new CompanyServices();
    this.state = {
      companies: [],
      projects: [],
    };
  }

  getCompanies = () => {
    this.service
      .getCompanies()
      .then((response) => {
        const companies = response.data;
        this.setState({ companies });
      })
      .catch((error) => console.log(error));
  };

  getProject = () => {
    this.service
      .getProjects()
      .then((response) => {
        const projects = response.data;
        console.log('DATOS CARGA', projects);
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.getCompanies();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Administración de compañías</h1>
        <div className={styles.container}>
          <CompaniesSelector companies={this.state.companies} />
          <AssignedCompanies />
        </div>
      </React.Fragment>
    );
  }
}

export default Companies;
