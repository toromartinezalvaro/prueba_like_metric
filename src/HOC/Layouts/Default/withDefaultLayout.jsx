import React, { Component } from 'react';
import styled from 'styled-components';
import Alert from '../../../components/UI/Alert';

const ErrorStackContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  margin-top: 42px;
  margin-right: 24px;
`;

function withDefaultLayout(WrappedComponent) {
  class WithDefaultLayout extends Component {
    state = {
      messages: [],
    };

    addMessage = (message, type, title) => {
      this.setState((prevState) => ({
        messages: [
          ...prevState.messages,
          {
            type,
            title,
            text: message,
            timeout: setTimeout(() => {
              this.close();
            }, 3000),
          },
        ],
      }));
    };

    close = (index) => {
      clearTimeout(this.state.messages[0].timeout);
      this.setState((prevState) => {
        const tempMessages = [...prevState.messages];
        tempMessages.splice(index, 1);
        return { messages: tempMessages };
      });
    };

    // eslint-disable-next-line class-methods-use-this
    render() {
      return (
        <div>
          <ErrorStackContainer>
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
          </ErrorStackContainer>
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

  WithDefaultLayout.displayName = `withDefaultLayout(${wrappedComponentName})`;
  return WithDefaultLayout;
}

export default withDefaultLayout;
