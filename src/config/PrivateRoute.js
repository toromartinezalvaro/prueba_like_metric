import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import agent from './config';
import { UserRoutes, DashboardRoutes, ProjectRoutes } from '../routes/local/routes';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = agent.currentUser
      console.log("authorized", currentUser)
      if (!agent.currentToken || !currentUser) {
        return (
          <Redirect
            to={{
              pathName: UserRoutes.login,
              state: { from: props.location },
            }}
          />
        );
      }

      if (roles && !agent.isAuthorized(roles)) {
        console.log("isAuthorized")
        return <Redirect to={{ pathname: DashboardRoutes.base + ProjectRoutes.base }} />;
      }

      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
