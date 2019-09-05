import React, { Component } from 'react';
import styled from 'styled-components';
import Message from '../../../components/UI/Message';

function withDefaultLayout(WrappedComponent) {
  const Container = styled.div`
    position: relative;
  `;

  const ErrorStackContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
  `;

  class WithDefaultLayout extends Component {
    state = {
      messages: ['Test message'],
    };

    stackMessage = (message) => {
      this.setState((prevState) => ({
        messages: [...prevState.messages, message],
      }));
    };

    // eslint-disable-next-line class-methods-use-this
    render() {
      return (
        <Container>
          <ErrorStackContainer>
            {this.state.messages.map((message, index) => (
              <Message key={`errorMessage${index}`}>{message}</Message>
            ))}
          </ErrorStackContainer>
          <WrappedComponent
            {...this.props}
            spawnMessage={this.stackMessage}
          ></WrappedComponent>
        </Container>
      );
    }
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  WithDefaultLayout.displayName = `withDefaultLayout(${wrappedComponentName})`;
  return WithDefaultLayout;
}

export default withDefaultLayout;
