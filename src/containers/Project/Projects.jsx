import React, { Component } from "react";
import ProjectServices from "../../services/Projects/ProjectServices";
import ProjectItems from "../../components/Projects/Projects";
import Modal from "../../components/UI/Modal/Modal";
import Input from "../../components/UI/Input/Input";
import { DashboardRoutes } from "../../routes/local/routes";
// import Error from "../../components/UI/Error/Error";

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.services = new ProjectServices(this);
  }

  state = {
    projects: [],
    modalIsHidden: true,
    newTitleProject: "",
    newDescriptionProject: "",
    alertMessage: "",
    alertIsHidden: true,
    alertAccept: () => {}
  };

  componentDidMount() {
    if (this.props.additionalProps) {
      this.props.additionalProps.changeTower(null);
    }
    this.loadCurrentProjects();
  }

  openProjectHandler = id => {
    console.log("tower id ", id);
    this.props.history.push({
      pathname: this.props.match.url + DashboardRoutes.towers.value + id
    });
  };

  createProjectHandler = () => {
    this.setState({
      modalIsHidden: false
    });
  };

  removeProjectHandler = id => {
    const onAccept = () => {
      this.setState({
        alertIsHidden: true
      });
      this.services
        .removeProject({ projectId: id })
        .then(response => {
          let project = response.data.projects;
          if (project) {
            this.setState({
              projects: project,
              modalIsHidden: project.length > 0
            });
          }
        })
        .catch(error => {
          console.log("ERROR::: ", error);
        });
    };

    this.setState({
      alertAccept: onAccept,
      alertMessage:
        "Está seguro de que quiere eliminar todo el proyecto? Al hacer esto eliminará toda la info interna",
      alertIsHidden: false
    });
  };

  loadCurrentProjects = () => {
    this.setState({ isLoading: true})
    this.services
      .getProjects()
      .then(response => {
        console.log("response ---> ", response.data.projects);
        this.setState({
          projects: response.data.projects ? response.data.projects : [],
          modalIsHidden: response.data.projects.length > 0
        });
        this.setState({ isLoading: false})
      })
      .catch(error => {
        this.setState({
          projects: [],
          modalIsHidden: true
        });
        this.setState({ isLoading: false})
      });
  };

  onCreate = () => {
    if (this.state.newTitleProject === "") {
      alert("Ingrese por lo menos un nombre para poder crear un proyecto");
      return;
    }

    console.log("onCreate :((((((");
    this.services
      .createProject({
        name: this.state.newTitleProject,
        description: this.state.newDescriptionProject
      })
      .then(response => {
        console.log("response ---> ", response.data);
        this.setState({
          projects: response.data.projects ? response.data.projects : [],
          modalIsHidden: response.data.projects.length > 0
        });
      })
      .catch(error => {
        console.log("ERROR::: ", error);
      });

    this.setState({
      modalIsHidden: true,
      newTitleProject: "",
      newDescriptionProject: ""
    });
  };

  cancel = () => {
    this.setState({
      alertIsHidden: true
    });

    if (this.state.projects.length > 0) {
      this.setState({
        modalIsHidden: true
      });
    } else {
      alert("Debes tener por lo menos un proyecto para continuar");
    }
  };

  onChange = target => {
    this.setState({
      [target.name]: target.value
    });
  };

  createModal = () => {
    return (
      <Modal
        title={"Crear proyecto"}
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
             style={{ width: "75px" }}
            value={this.state.newTitleProject}
          />
        </div>
        <div>
          <label>Descripción</label>
          <Input
            name="newDescriptionProject"
            onChange={this.onChange}
            validations={[]}
             style={{ width: "75px" }}
            value={this.state.newDescriptionProject}
          />
        </div>
      </Modal>
    );
  };

  createAlert() {
    return (
      <Modal
        title={"Alerta!"}
        hidden={this.state.alertIsHidden}
        onConfirm={this.state.alertAccept}
        onCancel={this.cancel}
      >
        <p>{this.state.alertMessage}</p>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        {/* <Error /> */}
        {this.state.projects.length > 0 && (
          <ProjectItems
            projects={this.state.projects}
            openProject={this.openProjectHandler}
            createProject={this.createProjectHandler}
            removeProject={this.removeProjectHandler}
          />
        )}
        {!this.state.modalIsHidden && this.createModal()}
        {!this.state.alertIsHidden && this.createAlert()}
      </div>
    );
  }
}
