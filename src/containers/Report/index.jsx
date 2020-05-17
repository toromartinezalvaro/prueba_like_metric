/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';
import Services from '../../services/Report';
import Report from '../../components/Report';
import LoadableContainer from '../../components/UI/Loader';

class ReportContainer extends Component {
  constructor(props) {
    super(props);
    this.services = new Services(this);
  }

  state = {
    reportData: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getReport(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ reportData: response.data, isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        if (error.response === undefined) {
          this.props.spawnMessage('Error de conexión', 'error');
        } else {
          this.props.spawnMessage(error.message, 'error');
        }
      });
  }

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        {this.state.reportData.length > 0 ? (
          <Report data={this.state.reportData} />
        ) : null}
      </LoadableContainer>
    );
  }
}

export default withDefaultLayout(ReportContainer);
