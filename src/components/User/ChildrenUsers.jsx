import React from 'react';
import Input from '../UI/Input/Input';
import styles from './ChildrenUsers.module.scss';
import Card, { CardHeader, CardBody } from '../UI/Card/Card';
import { Role } from '../../helpers';
import agent from '../../config/config';

const ChildrenUsers = props => {
  const optionForUser = user => {
    return (
      <option key={'optionForUser' + user.id} value={user.id}>
        {' '}
        {user.email}{' '}
      </option>
    );
  };

  return (
    <div className={styles.Container}>
      <Card className={styles.Card}>
        <CardHeader>
          <p className={styles.Title}>Selecciona uno de tus usuarios</p>
        </CardHeader>
        <CardBody>
          <div className={styles.Row}>
            <select
              className={styles.Input}
              onChange={event => {
                props.onChange(event.target.value);
              }}
              value={props.currentUser.id}
            >
              {props.users.map(optionForUser)}
            </select>
          </div>
          <div className={styles.Row}>
            <button className={styles.Button} onClick={props.openPasswordModal}>
              Update Password
            </button>
            <button className={styles.Button} onClick={props.openProjectModal}>
              Agregar Proyecto
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ChildrenUsers;
