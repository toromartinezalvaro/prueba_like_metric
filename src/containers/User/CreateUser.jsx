import React, { Component } from 'react';
import UserServices from '../../services/user/UserServices';
import { CreateUserForm } from '../../components/User';
import Loader from 'react-loader-spinner';
import agent from '../../config/config';
import { DashboardRoutes, ProjectRoutes } from '../../routes/local/routes';
import styles from './CreateUser.module.scss';
import errorHandling from '../../services/commons/errorHelper';
import { Role } from '../../helpers';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.services = new UserServices(this);
  }

  state = {
    role: Role.User,
    name: '',
    email: '',
    password: '',
    currentErrorMessage: '',
    isLoading: false,
  };

  onChange = (target) => {
    const { name, value } = target;
    if (name && value) {
      this.setState({
        [name]: value,
      });
    }
  };

  createUserHandler = () => {
    const { role, name, email, password } = this.state;
    this.setState({ isLoading: true });

    this.services
      .signup({
        userType: role,
        name,
        email,
        password,
      })
      .then((user) => {
        console.log('user --> ', user);
        if (user.email) {
          this.props.history.push(DashboardRoutes.base + ProjectRoutes.base);
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.props.spawnMessage(error.message, 'error');
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    return this.state.isLoading ? (
      <div className="Container">
        <Loader type="Puff" color={styles.mainColor} height="100" width="100" />
      </div>
    ) : (
      <div>
        <CreateUserForm
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

export default withDefaultLayout(CreateUser);
