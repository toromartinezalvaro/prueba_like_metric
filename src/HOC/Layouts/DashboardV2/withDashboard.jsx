import React, { Component } from 'react';
import Styles from './Dashboard.module.scss';

function withDashboardLayout(WrappedComponent) {
  class WithDashboardLayout extends Component {

    // eslint-disable-next-line class-methods-use-this
    render() {
      return (
        <div>
          <div className={Styles.errorStackContainer}>
            {this.state.messages.map((message, index) => (
              <Alert
                key={`errorMessage${index}`}
                close={() => {
                  this.close(index);
                }}
                type={message.type}
                title={message.title}
              >
                {message.text}
              </Alert>
            ))}
          </div>
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
