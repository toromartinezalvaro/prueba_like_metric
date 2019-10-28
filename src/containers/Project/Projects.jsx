import React, { Component } from 'react';
import ProjectServices from '../../services/Projects/ProjectServices';
import ProjectItems from '../../components/Projects/Projects';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import { DashboardRoutes } from '../../routes/local/routes';
import LoadableContainer from '../../components/UI/Loader';
import CompanyModal from '../../components/Projects/company/CreateCompanyModal';
import Agent from '../../config/config';
import { Role } from '../../helpers';

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.services = new ProjectServices(this);
  }

  state = {
    projectIsMissingCompany: null,
    projects: [],
    modalIsHidden: true,
    newTitleProject: '',
    newDescriptionProject: '',
    alertMessage: '',
    alertIsHidden: true,
    alertAccept: () => {},
    isLoading: false,
  };

  componentDidMount() {
    if (this.props.changeTower) {
      this.props.changeTower(null);
    }
    this.loadCurrentProjects();
  }

  openProjectHandler = (id) => {
    this.props.history.push({
      pathname: this.props.match.url + DashboardRoutes.towers.value + id,
    });
  };

  createProjectHandler = () => {
    this.setState({
      modalIsHidden: false,
    });
  };

  removeProjectHandler = (id) => {
    const onAccept = () => {
      this.setState({
        alertIsHidden: true,
      });
      this.services
        .removeProject({ projectId: id })
        .then((response) => {
          const project = response.data.projects;
          if (project) {
            this.setState({
              projects: project,
              modalIsHidden: project.length > 0,
            });
          }
        })
        .catch((error) => {
          console.log('ERROR::: ', error);
        });
    };

    this.setState({
      alertAccept: onAccept,
      alertMessage:
        'Está seguro de que quiere eliminar todo el proyecto? Al hacer esto eliminará toda la info interna',
      alertIsHidden: false,
    });
  };

  loadCurrentProjects = () => {
    this.setState({ isLoading: true });
    this.services
      .getProjects()
      .then((response) => {
        const nullCompany = response.data.projects.find(
          (project) => !project.companyId,
        );
        this.setState({
          projectIsMissingCompany: nullCompany,
          projects: response.data.projects ? response.data.projects : [],
          modalIsHidden: response.data.projects.length > 0 || nullCompany,
        });
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({
          projects: [],
          modalIsHidden: true,
        });
        this.setState({ isLoading: false });
      });
  };

  onCreate = () => {
    if (this.state.newTitleProject === '') {
      alert('Dale un lindo nombre a tu proyecto');
      return;
    }

    this.services
      .createProject({
        name: this.state.newTitleProject,
        description: this.state.newDescriptionProject,
      })
      .then((response) => {
        this.setState({
          projects: response.data.projects ? response.data.projects : [],
          modalIsHidden: response.data.projects.length > 0,
        });
      })
      .catch((error) => {
        console.log('ERROR::: ', error);
      });

    this.setState({
      modalIsHidden: true,
      newTitleProject: '',
      newDescriptionProject: '',
    });
  };

  cancel = () => {
    this.setState({
      alertIsHidden: true,
    });

    if (this.state.projects.length > 0) {
      this.setState({
        modalIsHidden: true,
      });
    } else {
      alert(
        'Para acceder a todos los beneficios de esta plataform primero debes tener por lo menos un proyecto',
      );
    }
  };

  onChange = (target) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  createModal = () => {
    return (
      <Modal
        title={'Crear proyecto'}
        hidden={this.state.modalIsHidden}
        onConfirm={this.onCreate}
        onCancel={this.cancel}
      >
        <div>
          <label>Nombre</label>
          <Input
            name="newTitleProject"
            onChange={this.onChange}
            validations={[]}
            style={{ width: '75px' }}
            value={this.state.newTitleProject}
          />
        </div>
        <div>
          <label>Descripción</label>
          <Input
            name="newDescriptionProject"
            onChange={this.onChange}
            validations={[]}
            style={{ width: '75px' }}
            value={this.state.newDescriptionProject}
          />
        </div>
      </Modal>
    );
  };

  createAlert() {
    return (
      <Modal
        title={'Alerta!'}
        hidden={this.state.alertIsHidden}
        onConfirm={this.state.alertAccept}
        onCancel={this.cancel}
      >
        <p>{this.state.alertMessage}</p>
      </Modal>
    );
  }

  render() {
    const { projectIsMissingCompany, projects } = this.state;
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        {Agent.isAuthorized([Role.Super, Role.Admin]) && (
          <CompanyModal
            isOpen={true} // {projectIsMissingCompany || projects.length < 1}
            project={projectIsMissingCompany}
          />
        )}
        {projects.length > 0 && (
          <ProjectItems
            projects={projects}
            openProject={this.openProjectHandler}
            createProject={this.createProjectHandler}
            removeProject={this.removeProjectHandler}
          />
        )}
        {!this.state.modalIsHidden && this.createModal()}
        {!this.state.alertIsHidden && this.createAlert()}
      </LoadableContainer>
    );
  }
}
