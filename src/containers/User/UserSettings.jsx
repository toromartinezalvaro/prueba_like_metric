import React, { Component } from 'react';
import UserServices from '../../services/user/UserServices';
import errorHandling from '../../services/commons/errorHelper';
import Error from '../../components/UI/Error/Error';
import agent from '../../config/config';
import User from '../../components/User/User';
import { UserRoutes } from '../../routes/local/routes';
import styles from './UserSettings.module.scss';
import Loader from 'react-loader-spinner';
import Modal from '../../components/UI/Modal/Modal';
import { PasswordEditor } from '../../components/User/ModalsContent';

export default class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.services = new UserServices(this);
  }

  state = {
    isLoading: false,
    user: {},
    currentErrorMessage: '',
    password: '',
    confirmPassword: '',
    isModalLoading: '',
    isModalLocked: false,
    isUpdatingPasswordMode: false,
  };

  componentDidMount() {
    if (this.props.additionalProps) {
      this.props.additionalProps.changeTower(null);
    }
    this.loadCurrentUserInfo();
  }

  logoutAction = () => {
    this.services
      .logout()
      .then(response => {
        if (response.status === 200) {
          agent.logout();
          this.props.history.push(UserRoutes.login);
        }
      })
      .catch(this.genericCatch);
  };

  updatePasswordAction = () => {
    this.setState({
      isUpdatingPasswordMode: true
    })
  }
  
  updatePassword = () => {
    if (
      this.state.password !== this.state.confirmPassword ||
      this.state.password.length == 0
    ) {
      return;
    }

    this.setState({
      isModalLoading: true,
    });
    this.services
      .updatePassword({ password: this.state.password })
      .then(() => {
        this.setState({
          isUpdatingPasswordMode: false,
          isModalLoading: false,
          currentErrorMessage:
            '¡Listo! Se ha actualizado la contraseña del usuario',
          password: '',
          confirmPassword: ''
        });
        console.log("get into this")
      })
      .catch(this.genericCatch);
  };

  genericCatch = error => {
    let errorHelper = errorHandling(error);
    this.setState({
      currentErrorMessage: errorHelper.message,
      isLoading: false,
    });
  };

  loadCurrentUserInfo = () => {
    if (agent.currentToken) {
      this.setState({
        isLoading: false,
      });

      this.services
        .currentUser()
        .then(response => {
          var user = {};
          if (response.data.user) {
            user = response.data.user;
          }
          this.setState({ isLoading: false, user: user });
        })
        .catch(this.genericCatch);
    } else {
      this.setState({ isLoading: false });
    }
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

  onChange = target => {
    this.setState({
      [target.name]: target.value,
    });
  };

  onCancel = () => {
    this.setState({
      isUpdatingPasswordMode: false,
      password: '',
      confirmPassword: ''
    })
  }

  render() {
    return (
      <div>
        {this.state.currentErrorMessage !== '' ? (
          <Error message={this.state.currentErrorMessage} />
        ) : null}
        <User
          isLoading={this.state.isLoading}
          user={this.state.user}
          logoutAction={this.logoutAction}
          updatePassword={this.updatePasswordAction}
        />
        <Modal
          title={
            'Modificar contraseña del usuario ' +
            (this.state.currentUser ? this.state.currentUser.name : '')
          }
          hidden={!this.state.isUpdatingPasswordMode}
          onConfirm={this.updatePassword}
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
      </div>
    );
  }
}
