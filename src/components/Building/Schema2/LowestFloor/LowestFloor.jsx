import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget from '../shared/Widget';

const LowestFloor = () => {
  return <Widget title="Piso mas bajo vendible">3</Widget>;
};

LowestFloor.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LowestFloor);
