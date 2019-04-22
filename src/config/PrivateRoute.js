import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import agent from './config'
import { UserRoutes } from '../routes/local/routes'

const PrivateRoute = ({component: Component, ...rest} ) => (
  <Route 
    {...rest}
    render= {props => agent.currentToken ?
        <Component {...props} /> :
        <Redirect to={{ 
          pathName: UserRoutes.login,
          state: { from: props.location }
        }}/>
    }
  />
)

export default PrivateRoute