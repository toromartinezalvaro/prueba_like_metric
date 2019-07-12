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
  };

  componentDidMount() {
    this.loadCurrentUserInfo();
  }

  onChange = userId => {
    let currentUser = this.state.users.find(user => {
      console.log("id ", user.id, userId)
      return user.id == userId;
    });

    this.setState({
      currentUser: currentUser,
    });
  };

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
          currentUser: users[0]
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

  // createUserHandler = () => {
  //   const { role, name, email, password } = this.state;
  //   this.setState({ isLoading: true });

  //   this.services
  //     .signup({
  //       userType: role,
  //       name,
  //       email,
  //       password,
  //     })
  //     .then(user => {
  //       console.log('user --> ', user);
  //       if (user.email) {
  //         this.props.history.push(DashboardRoutes.base + ProjectRoutes.base);
  //       }
  //       this.setState({ isLoading: false });
  //     })
  //     .catch(error => {
  //       let errorHelper = errorHandling(error);
  //       this.setState({
  //         currentErrorMessage: errorHelper.message,
  //         isLoading: false,
  //       });
  //     });
  // };
  updatePasswordModal = () => {};

  addProjectModal = () => {};

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
            updatePassword={this.updatePasswordModal}
            addProject={this.addProjectModal}
          />
        )}
        {this.state.currentUser && (
          <ProjectList currentUser={this.state.currentUser} />
        )}
      </div>
    );
  }
}

export default AssignTowerToUsers;
