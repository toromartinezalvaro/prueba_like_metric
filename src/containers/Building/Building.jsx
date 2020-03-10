import _ from 'lodash';
import React, { Component } from 'react';
import Naming from '../../components/Building/Naming/Naming';

import Schema from '../../components/Building/Schema/Schema';
import Error from '../../components/UI/Error/Error';
import errorHandling from '../../services/commons/errorHelper';
import SchemeServices from '../../services/schema/SchemaServices';
import FloatingButton from '../../components/UI/FloatingButton/FloatingButton';
import LoadableContainer from '../../components/UI/Loader';

class Building extends Component {
  constructor(props) {
    super(props);
    this.services = new SchemeServices(this);
  }

  state = {
    floors: 1,
    properties: 1,
    lowestFloor: 1,
    disable: false,
    disableWarning: false,
    update: false,
    names: [],
    currentErrorMessage: '',
    isLoading: false,
    showFloatingButton: false,
    loadingNaming: false,
    stratums: {},
    isLoadingSchemas: false,
    salesDates: {
      salesStartDate: new Date().getTime(),
      endOfSalesDate: new Date().getTime(),
    },
    sold: false,
    disableSold: false,
  };

  componentDidMount() {
    this.disableIfEdit();
    this.updateNames();
    this.setState({ isLoading: true });
  }

  onChangeHandler = (target) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  disableIfEdit = () => {
    this.services
      .isDisable(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ disableSold: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateNames = (isLoadingSchemas = false) => {
    const trueLoading = isLoadingSchemas
      ? { isLoadingSchemas: true }
      : { loadingNaming: true };

    const falseLoading = isLoadingSchemas
      ? { isLoadingSchemas: false }
      : { loadingNaming: false };

    this.setState(trueLoading);
    this.services
      .getSchema(this.props.match.params.towerId)
      .then((response) => {
        if (response.data.length !== 0) {
          this.updateStatesWithResponse(response, falseLoading);
          this.setupShowFloatingButton(response.data.properties);
        }
      })
      .catch((error) => {
        const errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
        });
        this.setState({ currentErrorMessage: '' });
      });
  };

  updateStatesWithResponse = (response, loading) => {
    let { floors, totalProperties, lowestFloor } = response.data;
    const { properties, stratum, stratums } = response.data;
    floors = _.defaultTo(floors, 0);
    totalProperties = _.defaultTo(totalProperties, 0);
    lowestFloor = _.defaultTo(lowestFloor, 0);
    this.setState({
      floors,
      properties: totalProperties,
      lowestFloor,
      update: true,
      disable: floors > 0,
      names: properties,
      isLoading: false,
      stratum,
      stratums,
      ...loading,
    });
  };

  setupShowFloatingButton = (properties) => {
    if (properties.length <= 0) {
      return;
    }

    const showFloating = properties.find((arrayProperties) => {
      const anyNomenclature = arrayProperties.find((nomenclature) => {
        return nomenclature !== null && nomenclature.name !== '0';
      });
      return anyNomenclature !== undefined;
    });
    if (showFloating !== undefined) {
      this.setState({ showFloatingButton: true });
    }
  };

  toggleEditMode = () => {
    this.setState((prevState) => ({
      disable: !prevState.disable,
    }));
  };

  toggleWarning = () => {
    this.setState((prevState) => ({
      disableWarning: !prevState.disableWarning,
    }));
  };

  saveSchema = () => {
    this.setState({ isLoadingSchemas: true, disable: true });
    this.services
      .postSchema({
        towerId: this.props.match.params.towerId,
        floors: parseInt(this.state.floors, 10),
        properties: parseInt(this.state.properties, 10),
        lowestFloor: parseInt(this.state.lowestFloor, 10),
      })
      .then(() => {
        this.setState({ floors: [], disable: true, names: [], sold: true });
        this.updateNames(true);
        this.setState({ isLoadingSchemas: false });
      })
      .catch((error) => {
        const errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
          isLoadingSchemas: false,
        });
        this.setState({ currentErrorMessage: '' });
      });
  };

  updateSchema = () => {
    this.setState({ isLoadingSchemas: true, disable: true });
    this.services
      .putSchema({
        towerId: this.props.match.params.towerId,
        floors: parseInt(this.state.floors, 10),
        properties: parseInt(this.state.properties, 10),
        lowestFloor: parseInt(this.state.lowestFloor, 10),
      })
      .then(() => {
        this.setState({ floors: [], disable: true, names: [] });
        this.updateNames(true);
        this.setState({ isLoadingSchemas: false });
      })
      .catch((error) => {
        const errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
          isLoadingSchemas: false,
        });
      });
    this.setState({ currentErrorMessage: '' });
  };

  checkDuplicates = (value) => {
    const duplicate =
      value === ''
        ? true
        : this.state.names.reduce((current, next) => {
            next.map((e) => {
              if (e !== null) {
                if (e.name === value) {
                  current = e;
                }
              }
            });
            return current;
          }, true);
    return duplicate;
  };

  propertyNameChangeHandler = (id, floor, location, value) => {
    const names = [...this.state.names];
    names[floor - this.state.lowestFloor][location - 1] = {
      id,
      floor,
      location,
      name: value,
      towerId: this.props.match.params.towerId,
    };
    this.services
      .putProperties(names[floor - this.state.lowestFloor][location - 1])
      .then((data) => {
        this.updateNames();
      });
    this.setState({
      names,
      showFloatingButton: true,
    });
  };

  propertyDelete = (id) => {
    this.services.deleteProperties(id).then((data) => {
      this.updateNames();
    });
  };

  updateStratum = (stratum) => {
    this.services
      .putStratum(this.props.match.params.towerId, { stratum })
      .then(() => {
        this.setState({ stratum });
      });
  };

  putEndOfSalesDate = (endOfSalesDate) => {
    this.services
      .putEndOfSalesDate(this.props.match.params.towerId, {
        endOfSalesDate,
      })
      .then(() => {
        const tempSalesDates = { ...this.state.salesDates };
        tempSalesDates.endOfSalesDate = endOfSalesDate;
        this.setState({ salesDates: tempSalesDates });
      });
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        {this.state.currentErrorMessage !== '' ? (
          <Error message={this.state.currentErrorMessage} />
        ) : null}
        <div>
          <Schema
            floors={this.state.floors}
            properties={this.state.properties}
            lowestFloor={this.state.lowestFloor}
            disable={this.state.disable}
            update={this.state.update}
            onChange={this.onChangeHandler}
            editMode={this.toggleEditMode}
            saveSchema={this.saveSchema}
            updateSchema={this.updateSchema}
            stratum={this.state.stratum}
            stratums={this.state.stratums}
            updateStratum={this.updateStratum}
            disableWarning={this.state.disableWarning}
            toggleWarning={this.toggleWarning}
            sold={this.state.sold}
            disableSold={this.state.disableSold}
          />
          {!this.state.disable ? null : (
            <Naming
              isLoading={this.state.isLoadingSchemas}
              loadingNaming={this.state.loadingNaming}
              floors={this.state.floors}
              properties={this.state.properties}
              lowestFloor={this.state.lowestFloor}
              disable={this.state.disable}
              checkDuplicates={this.checkDuplicates}
              headers={[...Array(this.state.properties).keys()].map(
                (o) => o + 1,
              )}
              columns={[...Array(this.state.floors).keys()].map(
                (o) => o + this.state.lowestFloor,
              )}
              onPropertyNameChange={this.propertyNameChangeHandler}
              onPropertyEmpty={this.propertyDelete}
              editMode={this.toggleEditMode}
              names={this.state.names}
              disableSold={this.state.disableSold}
            />
          )}
          {console.log('names', this.state.names)}
        </div>
        {this.state.showFloatingButton ? (
          <FloatingButton
            route="areas"
            projectId={this.props.match.params.projectId}
            towerId={this.props.match.params.towerId}
          >
            Areas
          </FloatingButton>
        ) : null}
      </LoadableContainer>
    );
  }
}

export default Building;
