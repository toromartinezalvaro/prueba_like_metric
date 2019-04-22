import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const SecureContainer = Container => class extends Container {

  constructor() {
    super();
    this.state = {
      isLoading: false,
      redirect: false,
      excecuteNoAuthorization: this.excecuteNoAuthorization,
      loadingAspect: this.loadingAspect
    };
  }

  excecuteNoAuthorization = () => {
    this.setState({ redirect: true })
  }

  loadingAspect = () => {
    let loadingAspect = super.loadingAspect()
    return loadingAspect ? loadingAspect : null
  }

  render() {
    const { loading, redirect } = this.state;
    if (loading) {
      return this.loadingAspect();
    }
    if (redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <Container {...this.props} />
      </React.Fragment>
    );
  }

}

export default SecureContainer