import React, { Component } from 'react';
import Styles from './styles.module.scss';
import Alert from '../../../components/UI/Alert';
import LoaderFixed from '../../../components/UI/LoaderFixed';

function withDefaultLayout(WrappedComponent) {
  class WithDefaultLayout extends Component {
    state = {
      messages: [],
      isLoading: false,
    };

    offLoading = () => {
      this.setState({
        isLoading: false,
      });
    };

    onLoading = () => {
      this.setState({
        isLoading: true,
      });
    };

    addMessage = (message, type, title, timeout = 3000) => {
      this.setState((prevState) => ({
        messages: [
          ...prevState.messages,
          {
            type,
            title,
            text: message,
            timeout: setTimeout(() => {
              this.close();
            }, timeout),
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
          {this.state.isLoading && <LoaderFixed />}
          <WrappedComponent
            {...this.props}
            spawnMessage={this.addMessage}
            onLoading={this.onLoading}
            offLoading={this.offLoading}
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
