import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget from '../shared/Widget';

const PropertiesPerFloor = () => {
  return <Widget title="Apartamentos">3</Widget>;
};

PropertiesPerFloor.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PropertiesPerFloor);
