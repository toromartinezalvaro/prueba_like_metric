import React, { Component } from 'react';
import Styles from './Dashboard.module.scss';

function withDashboardLayout(WrappedComponent) {
  class WithDashboardLayout extends Component {
    
    render() {
      return (
        <div>
          
          <WrappedComponent
            {...this.props}
            spawnMessage={this.addMessage}
          ></WrappedComponent>
        </div>
      );
    }
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  WithDashboardLayout.displayName = `withDashboardLayout(${wrappedComponentName})`;
  return WithDashboardLayout;
}

export default withDashboardLayout;
