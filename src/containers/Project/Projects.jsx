import React, { Component } from "react";
import ProjectServices from "../../services/Projects/ProjectServices";
import ProjectItems from "../../components/Projects/Projects";
import Modal from "../../components/UI/Modal/Modal";
import Input from "../../components/UI/Input/Input";
// import { UserRoutes } from "../../routes/local/routes";

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.services = new ProjectServices(this);
  }

  state = {
    projects: [],
    modalIsHidden: true,
    newTitleProject: "",
    newDescriptionProject: ""
  };

  componentDidMount() {
    this.loadCurrentProjects();
  }

  openProjectHandler = id => {};

  createProjectHandler = () => {
    this.setState({
      modalIsHidden: false
    });
  };

  removeProjectHandler = id => {
    
  }

  loadCurrentProjects = () => {
    this.services
      .getProjects()
      .then(response => {
        console.log("response ---> ", response.data.projects);
        this.setState({
          projects: response.data.projects ? response.data.projects : [],
          modalIsHidden: response.data.projects.length > 0
        });
        console.log("state ---> ", this.state.projects);
      })
      .catch(error => {
        console.log("ERROR::: ", error);
      });
  };

  onCreate = () => {
    if (this.state.newTitleProject === "") {
      alert("Ingrese por lo menos un nombre para poder crear un proyecto");
      return;
    }
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
            style={{ width: "75px", fontSize: "16px" }}
            value={this.state.newTitleProject}
          />
        </div>
        <div>
          <label>Descripción</label>
          <Input
            name="newDescriptionProject"
            onChange={this.onChange}
            validations={[]}
            style={{ width: "75px", fontSize: "16px" }}
            value={this.state.newDescriptionProject}
          />
        </div>
      </Modal>
    );
  };

  render() {
    return (
      <div>
        {this.state.projects.length > 0 && (
          <ProjectItems
            projects={this.state.projects}
            openProject={this.openProjectHandler}
            createProject={this.createProjectHandler}
            removeProject={this.removeProjectHandler}
          />
        )}
        {!this.state.modalIsHidden && this.createModal()}
      </div>
    );
  }
}
