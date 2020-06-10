import React, { Component } from 'react';
import ProjectServices from '../../services/Projects/ProjectServices';
import CompanyServices from '../../services/companies';
import ProjectItems from '../../components/Projects/Projects';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import { DashboardRoutes, GroupsRoutes } from '../../routes/local/routes';
import LoadableContainer from '../../components/UI/Loader';
import CompanyModal from '../../components/Projects/company/CreateCompanyModal';
import Agent from '../../config/config';
import { Role } from '../../helpers';

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.services = new ProjectServices();
    this.companyServices = new CompanyServices();
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
    companies: undefined,
    currentEditingProject: null,
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

  openCtrlProjectHandler = (id) => {
    const urlToGo = this.props.match.url + DashboardRoutes.towers.value + id;
    window.open(urlToGo, '_blank');
  };

  createProjectHandler = () => {
    this.setState({
      modalIsHidden: false,
    });
  };

  removeProjectHandler = (id) => {
    const onAccept = () => {
      const { companies } = this.state;
      this.setState({
        alertIsHidden: true,
      });
      this.services
        .removeProject({ projectId: id })
        .then((response) => {
          const { projects } = response.data;
          if (projects) {
            this.setState({
              projects,
              modalIsHidden: projects.length > 0,
              companies: this.state.companies,
            });
          } else {
            this.setState({
              companies,
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
          isLoading: false,
          companies: response.data.companies,
        });
      })
      .catch((error) => {
        this.setState({
          projects: [],
          modalIsHidden: true,
          companies: [],
        });
        this.setState({ isLoading: false });
      });
  };

  onCreateAndAssociateCompany = (name) => {
    if (this.state.projectIsMissingCompany) {
      this.createNewCompanyWithProject(
        name,
        this.state.projectIsMissingCompany.id,
      );
    } else {
      this.createNewCompany(name);
    }
  };

  createNewCompany = (name) => {
    this.companyServices.create(name).then((response) => {
      const newCompany = response.data;
      if (this.state.companies.length < 1) {
        this.setState({ companies: [newCompany] });
      }
    });
  };

  createNewCompanyWithProject = (name, projectId) => {
    this.companyServices.createWithProject(name, projectId).then((response) => {
      if (response.data) {
        this.loadCurrentProjects();
      }
    });
  };

  associateCompanyWithProject = (companyId, projectId) => {
    this.companyServices
      .associateWithProject(companyId, projectId)
      .then((response) => {
        if (response.data) {
          this.loadCurrentProjects();
        }
      });
  };

  onEditProject = () => {
    const { id, name, description } = this.state.currentEditingProject;
    this.services
      .updateProject(id, { name, description })
      .then((response) => {
        const project = { ...response.data[1] };
        project.id = id;
        this.setState((prevState) => {
          const { projects } = prevState;
          const index = projects.findIndex((o) => o.id === id);
          projects[index] = project;
          return {
            projects,
            currentEditingProject: null,
            modalIsHidden: true,
          };
        });
      })
      .catch((error) => {
        this.setState({ currentEditingProject: null, modalIsHidden: true });
        console.error(error);
      });
  };

  onCreate = () => {
    if (this.state.newTitleProject === '') {
      alert('Dale un lindo nombre a tu proyecto');
      return;
    }
    const companyId = this.state.companies[0].id;
    this.services
      .createProject({
        name: this.state.newTitleProject,
        description: this.state.newDescriptionProject,
        companyId,
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
      currentEditingProject: null,
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

  onChangeProject = (name) => (target) => {
    const currentEditingProject = {
      ...this.state.currentEditingProject,
      [name]: target.value,
    };
    this.setState({
      currentEditingProject,
    });
  };

  createModal = () => {
    return (
      <Modal
        title={
          this.state.currentEditingProject
            ? `Editar proyecto`
            : 'Crear proyecto'
        }
        hidden={this.state.modalIsHidden}
        onConfirm={
          this.state.currentEditingProject ? this.onEditProject : this.onCreate
        }
        onCancel={this.cancel}
      >
        <div>
          <label>Nombre</label>
          <Input
            name="newTitleProject"
            onChange={
              this.state.currentEditingProject
                ? this.onChangeProject('name')
                : this.onChange
            }
            validations={[]}
            style={{ width: '75px' }}
            value={
              this.state.currentEditingProject
                ? this.state.currentEditingProject.name
                : this.state.newTitleProject
            }
          />
        </div>
        <div>
          <label>Descripción</label>
          <Input
            name="newDescriptionProject"
            onChange={
              this.state.currentEditingProject
                ? this.onChangeProject('description')
                : this.onChange
            }
            validations={[]}
            style={{ width: '75px' }}
            value={
              this.state.currentEditingProject
                ? this.state.currentEditingProject.description
                : this.state.newDescriptionProject
            }
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

  editHandler = (projectId) => {
    const { projects } = this.state;
    const currentEditingProject = projects.find(
      (project) => project.id === projectId,
    );
    this.setState({
      currentEditingProject,
      modalIsHidden: !currentEditingProject,
    });
  };

  redirectToGroups = () => {
    this.props.history.push({
      pathname: GroupsRoutes.base,
    });
  };

  render() {
    const { projectIsMissingCompany, projects, companies } = this.state;
    const showCompanyModal =
      projects &&
      companies &&
      (projectIsMissingCompany ||
        (projects.length < 1 && companies.length < 1));

    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        {Agent.isAuthorized([Role.Super, Role.Admin]) && companies && (
          <CompanyModal
            isOpen={showCompanyModal}
            onCreate={this.onCreateAndAssociateCompany}
            onAssociate={this.associateCompanyWithProject}
            project={projectIsMissingCompany}
            companies={companies}
          />
        )}
        {projects.length > 0 && (
          <ProjectItems
            projects={projects}
            companies={companies}
            openProject={this.openProjectHandler}
            createProject={this.createProjectHandler}
            removeProject={this.removeProjectHandler}
            editHandler={this.editHandler}
            DashboardRoutesValue={DashboardRoutes.towers.value}
            openCtrlProject={this.openCtrlProjectHandler}
            url={this.props.match.url}
            redirectToGroups={this.redirectToGroups}
          />
        )}
        {(!this.state.modalIsHidden || this.state.currentEditingProject) &&
          !showCompanyModal &&
          this.createModal()}
        {!this.state.alertIsHidden && this.createAlert()}
      </LoadableContainer>
    );
  }
}
