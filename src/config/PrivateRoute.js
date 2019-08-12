import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Agent from './config';
import {
  UserRoutes,
  DashboardRoutes,
  ProjectRoutes,
} from '../routes/local/routes';
import Context from '../Context';

const PrivateRoute = ({
  component: Component,
  roles,
  isPrivate = true,
  changeTower,
  ...rest
}) => {
  const { isAuth, activateAuth } = useContext(Context.Shared);

  return (
    <Route
      {...rest}
      render={(props) => {
        const pushTo = (route) => {
          props.history.push(route);
        };

        if (!isAuth && isPrivate) {
          return (
            <Redirect
              to={{
                pathname: UserRoutes.login,
                state: { from: props.location },
              }}
            />
          );
        }

        if (roles && !Agent.isAuthorized(roles)) {
          return (
            <Redirect
              to={{ pathname: DashboardRoutes.base + ProjectRoutes.base }}
            />
          );
        }

        return (
          <Component
            pushTo={pushTo}
            activateAuth={activateAuth}
            changeTower={changeTower}
            {...props}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
