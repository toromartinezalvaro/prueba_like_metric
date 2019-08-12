import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import UserServices from '../../services/user/UserServices';
import { ChildrenUsers } from '../../components/User';
import { ProjectList } from '../../components/Projects';
import styles from './AssignTowerToUsers.module.scss';
import errorHandling from '../../services/commons/errorHelper';
import Error from '../../components/UI/Error/Error';
import {
  UserProductAssigner,
  PasswordEditor,
} from '../../components/User/ModalsContent';
import Modal from '../../components/UI/Modal/Modal';
import EmptyContentMessageView from '../../components/UI/EmptyContentMessageView';
import {
  DashboardRoutes,
  UserRoutes,
  ProjectRoutes,
} from '../../routes/local/routes';
import LoadableContainer from '../../components/UI/Loader';

class AssignTowerToUsers extends Component {
  constructor(props) {
    super(props);
    this.services = new UserServices(this);
  }

  state = {
    isModalLoading: false,
    users: [],
    projects: [],
    currentUser: undefined,
    currentErrorMessage: '',
    isUpdatingPasswordMode: false,
    isAddingProjectMode: false,
    password: '',
    confirmPassword: '',
    currentProject: undefined,
    isModalLocked: false,
  };

  componentDidMount() {
    this.loadCurrentUserInfo();
  }

  onChange = (target) => {
    if (target.name && target.value) {
      this.setState({
        [target.name]: target.value,
      });
    } else {
      const userId = target;
      let currentUser = this.state.users.find((user) => {
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
      password: '',
      confirmPassword: '',
    });
  };

  onConfirm = (isPassword) => {
    if (isPassword) {
      if (
        this.state.password === this.state.confirmPassword &&
        this.state.password.length > 0
      ) {
        this.updatePassword();
        return;
      }

      this.setState({
        currentErrorMessage:
          'Debes ingresar una contraseña igual en los dos campos',
      });
    } else {
      this.setState({
        isModalLoading: true,
      });
      this.addProjectToUser();
    }
  };

  updatePassword = () => {
    this.setState({
      isModalLoading: true,
    });

    this.services
      .updatePasswordFromAdmin({
        userId: this.state.currentUser.id,
        password: this.state.password,
      })
      .then(() => {
        this.setState({
          isUpdatingPasswordMode: false,
          isModalLoading: false,
          isModalLocked: false,
          currentErrorMessage:
            '¡Listo! Se ha actualizado la contraseña del usuario seleccionado',
          password: '',
          confirmPassword: '',
        });
      })
      .catch(this.genericCatch);
  };

  addProjectToUser = () => {
    console.log(
      'add project ',
      this.state.currentProject,
      this.state.currentUser.id,
    );
    this.services
      .addProjectToUser({
        userId: this.state.currentUser.id,
        projectId: this.state.currentProject,
      })
      .then(() => {
        this.setState({
          isAddingProjectMode: false,
          isModalLoading: false,
          isModalLocked: false,
          currentErrorMessage:
            '¡Listo! Se ha agregado el proyecto a ese usuario',
        });
        this.addLocalProjectToUser(
          this.state.currentProject,
          this.state.currentUser,
        );
      })
      .catch(this.genericCatch);
  };

  addLocalProjectToUser = (projectId, user) => {
    let currentUser = user;
    if (currentUser.projects.find((project) => project.id == projectId)) {
      return;
    }

    const project = this.state.projects.find(
      (project) => project.id == projectId,
    );
    currentUser.projects.push(project);
    const filteredUsers = this.state.users.filter(
      (user) => currentUser.id !== user.id,
    );
    const newUsers = [...filteredUsers, currentUser];
    console.log(newUsers);
    this.setState({
      users: newUsers,
    });
  };

  removeLocalProjectToUser = (projectId, user) => {
    const currentUser = user;
    const filteredUsers = this.state.users.filter(
      (user) => currentUser.id !== user.id,
    );
    const projects = currentUser.projects.filter(
      (project) => project.id !== projectId,
    );
    currentUser.projects = projects;
    const newUsers = [...filteredUsers, currentUser];
    this.setState({
      users: newUsers,
    });
  };

  loadCurrentUserInfo = () => {
    this.setState({
      isLoading: true,
    });

    this.services
      .childrenInfo()
      .then((response) => {
        const { users, projects } = response.data;
        console.log('response --<', response);
        this.setState({
          isLoading: false,
          users: users || [],
          projects: projects || [],
          currentUser: users[0],
          currentProject: projects[0] ? projects[0].id : null,
        });
      })
      .catch(this.genericCatch);
  };

  genericCatch = (error) => {
    console.log('response --<', error);
    const errorHelper = errorHandling(error);
    this.setState({
      currentErrorMessage: errorHelper.message,
      isLoading: false,
      isModalLoading: false,
      isModalLocked: false,
    });
  };

  openPasswordModal = () => {
    this.setState({
      isUpdatingPasswordMode: true,
    });
  };

  openProjectModal = () => {
    this.setState({
      isAddingProjectMode: true,
    });
  };

  loaderView = () => {
    return this.state.isModalLoading ? (
      <div className={styles.Loader}>
        <Loader
          type="ThreeDots"
          color={styles.mainColor}
          height="100"
          width="100"
        />
      </div>
    ) : null;
  };

  removeOnClick = (projectId, userId) => {
    console.log('removeOnClick ', projectId, userId);
    this.services
      .removeProjectForUser({ userId, projectId })
      .then(() => {
        this.removeLocalProjectToUser(projectId, this.state.currentUser);
      })
      .catch(this.genericCatch);
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        <div className={styles.Container}>
          {this.state.currentErrorMessage !== '' ? (
            <Error message={this.state.currentErrorMessage} />
          ) : null}
          {!this.state.currentUser && (
            <EmptyContentMessageView
              title="Vamos a administrar los permisos 👨‍🔧!"
              message="Es fácil, primero debes crear usuarios para que puedan acceder a proyectos y torres"
              buttonsContent={[
                {
                  title: 'Creemos un usuario',
                  url: UserRoutes.base + UserRoutes.create,
                },
                {
                  title: 'Creemos un proyecto',
                  url: DashboardRoutes.base + ProjectRoutes.base,
                },
              ]}
            />
          )}
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
            <ProjectList
              currentUser={this.state.currentUser}
              removeOnClick={this.removeOnClick}
            />
          )}

          <Modal
            title={`Modificar contravene del usuario ${
              this.state.currentUser ? this.state.currentUser.name : ''
            }`}
            hidden={!this.state.isUpdatingPasswordMode}
            onConfirm={() => this.onConfirm(true)}
            onCancel={this.onCancel}
            blocked={this.state.isModalLocked}
          >
            {!this.state.isModalLoading && (
              <PasswordEditor
                password={this.state.password}
                confirmPassword={this.state.confirmPassword}
                onChange={this.onChange}
              />
            )}
            {this.loaderView()}
          </Modal>
          <Modal
            title={`Agregar proyectos al usuario ${
              this.state.currentUser ? this.state.currentUser.name : ''
            }`}
            hidden={!this.state.isAddingProjectMode}
            onConfirm={() => this.onConfirm(false)}
            onCancel={this.onCancel}
            blocked={this.state.isModalLocked}
          >
            {!this.state.isModalLoading && (
              <UserProductAssigner
                currentProject={this.state.currentProject}
                projects={this.state.projects}
                userOnChange={this.onChange}
              />
            )}
            {this.loaderView()}
          </Modal>
        </div>
      </LoadableContainer>
    );
  }
}

export default AssignTowerToUsers;
