import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';

class Groups extends Component {
  render() {
    return (
      <div>
        <h1>helloWorld</h1>
      </div>
    );
  }

  propTypes = {
    prop: PropTypes,
  };
}

export default withDefaultLayout(Groups);
