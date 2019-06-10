import React, { Component, Fragment } from "react";
import PropertiesGraph from "../../components/Clustering/PropertiesGraph/PropertiesGraph";
import GroupTable from "../../components/Clustering/GroupTable/GroupTable";

class Clustering extends Component {
  constructor(props) {
    super(props);
    this.services = new SchemeServices(this);
  }

  state = {
    clusters: []
  };

  componentDidMount() {
    this.services.getClusters().then(response => {
      this.setState({ clusters: response });
    });
  }

  render() {
    return (
      <Fragment>
        <PropertiesGraph />
        <GroupTable />
      </Fragment>
    );
  }
}

export default Clustering;
