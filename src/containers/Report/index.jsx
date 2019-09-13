/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';
import Services from '../../services/Report';
import Report from '../../components/Report';

class ReportContainer extends Component {
  constructor(props) {
    super(props);
    this.services = new Services(this);
  }

  state = {
    reportData: [],
  };

  componentDidMount() {
    this.services
      .getReport(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ reportData: response.data });
      })
      .catch((error) => {
        this.props.spawnMessage(error.response.data.message, 'error');
      });
  }

  render() {
    return <Report data={this.state.reportData} />;
  }
}

export default withDefaultLayout(ReportContainer);
