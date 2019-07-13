import React, { Component } from 'react';
import UserServices from '../../services/user/UserServices';
import { ChildrenUsers } from '../../components/User';
import { ProjectList } from '../../components/Projects';
import Loader from 'react-loader-spinner';
import agent from '../../config/config';
import { DashboardRoutes, ProjectRoutes } from '../../routes/local/routes';
import styles from './AssignTowerToUsers.module.scss';
import errorHandling from '../../services/commons/errorHelper';
import Error from '../../components/UI/Error/Error';
import {
  UserProductAssigner,
  PasswordEditor,
} from '../../components/User/ModalsContent';
import Modal from '../../components/UI/Modal/Modal';

class AssignTowerToUsers extends Component {
  constructor(props) {
    super(props);
    this.services = new UserServices(this);
  }

  state = {
    users: [],
    projects: [],
    currentUser: undefined,
    currentErrorMessage: '',
    isLoading: false,
    isUpdatingPasswordMode: false,
    isAddingProjectMode: false,
    password: '',
    confirmPassword: '',
    currentProject: undefined,
  };

  componentDidMount() {
    this.loadCurrentUserInfo();
  }

  onChange = target => {
    if (target.name && target.value) {
      this.setState({
        [target.name]: target.value,
      });
    } else {
      const userId = target;
      let currentUser = this.state.users.find(user => {
        console.log('id ', user.id, userId);
        return user.id == userId;
      });

      this.setState({
        currentUser: currentUser,
      });
    }
  };

  onCancel = () => {
    this.setState({
      isUpdatingPasswordMode: false,
      isAddingProjectMode: false,
    });
  };

  onConfirm = isPassword => {};

  loadCurrentUserInfo = () => {
    this.setState({
      isLoading: true,
    });

    this.services
      .childrenInfo()
      .then(response => {
        const { users, projects } = response.data;
        this.setState({
          isLoading: false,
          users: users ? users : [],
          projects: projects ? projects : [],
          currentUser: users[0],
          currentProject: projects[0],
        });
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
          isLoading: false,
        });
      });
  };

  openPasswordModal = (event) => {
    console.log("updatePasswordModal")
    this.setState({
      isUpdatingPasswordMode: true,
    });
  };

  openProjectModal = (event) => {
    console.log("addProjectModal")
    this.setState({
      isAddingProjectMode: true,
    });
  };

  render() {
    return this.state.isLoading ? (
      <div className={styles.Loader}>
        <Loader type="Puff" color={styles.mainColor} height="100" width="100" />
      </div>
    ) : (
      <div className={styles.Container}>
        {this.state.currentErrorMessage !== '' ? (
          <Error message={this.state.currentErrorMessage} />
        ) : null}
        {this.state.currentUser && (
          <ChildrenUsers
            onChange={this.onChange}
            users={this.state.users}
            currentUser={this.state.currentUser}
            openPasswordModal={this.openPasswordModal}
            openProjectModal={this.openProjectModal}
          />
        )}
        {this.state.currentUser && (
          <ProjectList currentUser={this.state.currentUser} />
        )}

        <Modal
          title={
            'Modificar contraseña del usuario ' +
            (this.state.currentUser ? this.state.currentUser.name : '')
          }
          hidden={!this.state.isUpdatingPasswordMode}
          onConfirm={this.onConfirm(true)}
          onCancel={this.onCancel}
        >
          <PasswordEditor
            password={this.state.password}
            confirmPassword={this.state.confirmPassword}
            onChange={this.state.onChange}
          />
        </Modal>
        <Modal
          title={
            'Agregar proyectos al usuario ' +
            (this.state.currentUser ? this.state.currentUser.name : '')
          }
          hidden={!this.state.isAddingProjectMode}
          onConfirm={this.onConfirm(false)}
          onCancel={this.onCancel}
        >
          <UserProductAssigner
            currentProject={this.state.currentProject}
            projects={this.state.projects}
          />
        </Modal>
      </div>
    );
  }
}

export default AssignTowerToUsers;
