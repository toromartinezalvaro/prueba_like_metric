import React, { Component } from 'react';
import UserServices from '../../services/user/UserServices';
import { ChildrenInfo } from '../../components/User';
import Loader from 'react-loader-spinner';
import agent from '../../config/config';
import { DashboardRoutes, ProjectRoutes } from '../../routes/local/routes';
import styles from './CreateUser.module.scss';
import errorHandling from '../../services/commons/errorHelper';
import Error from "../UI/Error/Error";

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

  onChange = target => {
    const { name, value } = target;
    if (name && value) {
      this.setState({
        [name]: value,
      });
    }
  };

  loadCurrentUserInfo = () => {
    this.setState({
      isLoading: true,
    });

    this.services
      .childrenInfo()
      .then(response => {
        const { users, projects } = response;
        this.setState({
          isLoading: false,
          users: users ? users : [],
          projects: projects ? projects : [],
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

  render() {
    return this.state.isLoading ? (
      <div className="Container">
        <Loader type="Puff" color={styles.mainColor} height="100" width="100" />
      </div>
    ) : (
      <div>
        {props.currentErrorMessage !== '' ? (
          <Error message={this.state.currentErrorMessage} />
        ) : null}
        <ChildrenInfo
          onChange={this.onChange}
          name={this.state.name}
          role={this.state.role}
          email={this.state.email}
          password={this.state.password}
          createUser={this.createUserHandler}
        />
      </div>
    );
  }
}

export default AssignTowerToUsers;
