import React, { Component } from 'react';

class Pairing extends Component {
  state = {
    init: false,
  };

  componentDidMount() {
    this.setState((prevState, currentProps) => {
      return {
        init: true,
      };
    });
  }

  static propTypes = {};

  render() {
    return <div></div>;
  }
}

export default Pairing;
