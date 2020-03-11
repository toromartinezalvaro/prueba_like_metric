import React, { Component, Fragment } from 'react';
import NumberFormat from 'react-number-format';
import Loader from 'react-loader-spinner';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import Table from '../../components/UI/Table/Table';
import Input from '../../components/UI/Input/Input';
import IconButton from '../../components/UI/Button/IconButton/IconButton';
import Modal from '../../components/UI/Modal/Modal';
import EditableHeader from '../../components/Area/EditableHeader/EditableHeader';
import AreaServices from '../../services/area/AreaServices';
import Prices from '../../components/Area/Prices/Prices';
import errorHandling from '../../services/commons/errorHelper';
import Error from '../../components/UI/Error/Error';
import FloatingButton from '../../components/UI/FloatingButton/FloatingButton';
import commonStyles from '../../assets/styles/variables.scss';
import LoadableContainer from '../../components/UI/Loader';
import Prices2 from '../../components/Area/Prices2';

class Area extends Component {
  constructor(props) {
    super(props);
    this.services = new AreaServices(this);
  }

  state = {
    areaTypeId: null,
    areaType: '',
    areaMeasurementUnit: 'MT2',
    areasNames: [],
    properties: [],
    areaTypes: [],
    data: [],
    hidden: true,
    editingAreaType: false,
    deleteAreaTypeId: null,
    hideDeleteModal: true,
    currentErrorMessage: '',
    showFloatingButton: false,
    calculateTotals: true,
    modalIsLoading: false,
    isLoading: false,
    anySold: false,
    isAreaTypeDialogOpen: false,
    disableSold: false,
  };

  modalContent = () => {
    if (this.state.editingAreaType) {
      return (
        <Fragment>
          <div style={{ display: 'flex' }}>
            <Input
              name="areaType"
              validations={[]}
              onChange={this.areaTypeHandler}
              value={this.state.areaType}
              disable={this.state.areaType === 'Interior'}
            />
            {this.state.areaMeasurementUnit}
          </div>
          <Prices
            areaTypeId={this.state.areaTypeId}
            measurementUnit={this.state.areaMeasurementUnit}
            services={this.services}
            towerId={this.props.match.params.towerId}
            isLoading={this.state.modalIsLoading}
            anySold={this.state.anySold}
          />
        </Fragment>
      );
    }
    return this.state.modalIsLoading ? (
      <div>
        <Loader
          type="ThreeDots"
          color={commonStyles.mainColor}
          height="100"
          width="100"
        />
      </div>
    ) : (
      <div style={{ display: 'flex' }}>
        <Input
          name="areaType"
          validations={[]}
          onChange={this.areaTypeHandler}
          value={this.state.areaType}
        />
        <span>MT2</span>
      </div>
    );
  };

  processHeaders = (headers, totals) => {
    let totalArea = 0;
    return headers.map((areaType) => {
      if (totals !== undefined && totals !== []) {
        totalArea = totals.reduce((current, total) => {
          total.id === areaType.id
            ? (current += total.total)
            : (current = current);
          return current;
        }, 0);
      }
      return (
        <div
          onClick={() => {
            this.handleOpenAreaTypeModal(areaType);
          }}
        >
          <EditableHeader
            onClick={() => {
              this.toggleDeleteModal(areaType.id);
            }}
            canBeDeleted={areaType.name.toLowerCase() === 'interior'}
          >
            <p
              style={{
                marginBlockStart: '0px',
                marginBlockEnd: '0px',
                lineHeight: '0px',
                marginTop: '18px',
              }}
            >
              Total:{' '}
              {
                <NumberFormat
                  value={parseFloat(totalArea).toFixed(1)}
                  displayType={'text'}
                  thousandSeparator={true}
                />
              }
            </p>
            {`${areaType.name} ${areaType.measurementUnit}`}
          </EditableHeader>
        </div>
      );
    });
  };

  toggleDeleteModal = (id) => {
    if (id === undefined) {
      this.setState((prevState) => ({
        deleteAreaTypeId: null,
        hideDeleteModal: !prevState.hideDeleteModal,
      }));
    } else {
      this.setState((prevState) => ({
        deleteAreaTypeId: id,
        hideDeleteModal: !prevState.hideDeleteModal,
      }));
    }
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

  componentDidMount() {
    this.updateTableInformation();
    this.setState({ isLoading: true });
    this.disableIfEdit();
  }

  updateTableInformation = () => {
    const { towerId } = this.props.match.params;
    if (!towerId) {
      return;
    }
    this.services
      .getAreas(towerId)
      .then((response) => {
        let currentState = {};
        if (this.state.calculateTotals === true) {
          const types = [];
          response.data.propertiesAreas.forEach((arrayAreas) => {
            if (arrayAreas !== undefined) {
              arrayAreas.forEach((area) => {
                if (!types.find((type) => area.type === type.id)) {
                  types.push({ id: area.type, total: 0 });
                }
                if (types !== undefined) {
                  const index = types.findIndex((obj) => obj.id === area.type);
                  if (types[index] !== undefined) {
                    types[index].total += area.measure;
                  }
                }
                return types;
              });
              currentState = { ...currentState, calculateTotals: false, types };
            }
          });
        }
        const showFloating = response.data.propertiesAreas.find(
          (arrayAreas) => {
            const anyArea = arrayAreas.find((area) => {
              return area !== null && area.measure !== 0;
            });
            return anyArea !== undefined;
          },
        );
        if (showFloating !== undefined) {
          currentState = { ...currentState, showFloatingButton: true };
        }

        this.setState({
          ...currentState,
          areaTypes: response.data.areaTypes,
          properties: response.data.properties,
          isLoading: false,
          data: response.data.propertiesAreas,
          anySold: response.data.anySold,
        });
      })
      .catch((error) => {
        const errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
        });
      });
    this.setState({ currentErrorMessage: '' });
  };

  areaTypeHandler = (target) => {
    this.setState({ [target.name]: target.value });
  };

  measurementUnitHandler = (event) => {
    this.setState({ areaMeasurementUnit: event.target.value });
  };

  handleOpenAreaTypeModal = (areaType) => {
    this.setState({
      isAreaTypeDialogOpen: true,
      areaTypeId: areaType.id,
    });
  };

  toggleAreaTypeModal = (areaType) => {
    if (areaType === undefined) {
      this.setState((prevState) => ({
        hidden: !prevState.hidden,
        areaType: '',
        areaMeasurementUnit: 'MT2',
        editingAreaType: false,
      }));
    } else {
      this.setState((prevState) => ({
        hidden: !prevState.hidden,
        areaTypeId: areaType.id,
        areaType: areaType.name,
        areaMeasurementUnit: areaType.measurementUnit,
        editingAreaType: true,
      }));
    }
  };

  deleteAreaType = () => {
    this.services
      .deleteArea(this.state.deleteAreaTypeId)
      .then((data) => {
        this.toggleDeleteModal();
        this.updateTableInformation();
      })
      .catch((error) => {
        const errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
        });
      });
    this.setState({ currentErrorMessage: '' });
  };

  updateAreaType = () => {
    this.setState({ modalIsLoading: true });
    this.services
      .putArea(this.state.areaTypeId, {
        id: this.state.areaTypeId,
        name: this.state.areaType,
        measurementUnit: this.state.areaMeasurementUnit,
        towerId: this.props.match.params.towerId,
      })
      .then((data) => {
        this.toggleAreaTypeModal();
        this.updateTableInformation();
        this.setState({ modalIsLoading: false });
      })
      .catch((error) => {
        const errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
          modalIsLoading: false,
        });
      });
    this.setState({ currentErrorMessage: '' });
  };

  addAreaType = () => {
    this.setState({ modalIsLoading: true });
    this.services
      .postArea({
        name: this.state.areaType,
        measurementUnit: this.state.areaMeasurementUnit,
        towerId: this.props.match.params.towerId,
      })
      .then((data) => {
        this.setState({ calculateTotals: true });
        this.toggleAreaTypeModal();
        this.updateTableInformation();
        this.setState({ modalIsLoading: false });
      })
      .catch((error) => {
        const errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
          modalIsLoading: false,
        });
      });
    this.setState({ currentErrorMessage: '' });
  };

  sumTotalHeader(actualValue, value, type, arrayTotals) {
    const index = arrayTotals.findIndex((obj) => obj.id === type);
    if (arrayTotals[index] !== undefined) {
      if (actualValue > parseFloat(value)) {
        arrayTotals[index].total -= actualValue - parseFloat(value);
      } else {
        arrayTotals[index].total += parseFloat(value) - actualValue;
      }
    }
  }

  areaChangeHandler = (rowIndex, cellIndex, value, type) => {
    if (value !== '') {
      const currentData = this.state.data;
      const actualValue = currentData[rowIndex][cellIndex].measure;
      currentData[rowIndex][cellIndex].measure = value;
      this.services
        .putAreasByTowerId(
          this.props.match.params.towerId,
          currentData[rowIndex][cellIndex],
        )
        .then(() => {
          this.setState({ data: currentData, showFloatingButton: true });
          this.sumTotalHeader(actualValue, value, type, this.state.types);
          this.setState({ isLoading: false });
        })
        .catch((error) => {
          const errorHelper = errorHandling(error);
          this.setState({
            currentErrorMessage: errorHelper.message,
          });
          this.setState({ isLoading: true });
          this.updateTableInformation();
        });
      this.setState({ currentErrorMessage: '' });
    }
  };

  inputsForData = (data) => {
    return data.map((row, rowIndex) => {
      return row.map((e2, cellIndex) => {
        return (
          <Input
            updateWithProp
            mask="number"
            style={{ width: '75px' }}
            validations={[
              {
                fn: (value) => {
                  return value !== null;
                },
                message: 'No puede estar vac�o',
              },
            ]}
            disable={this.state.anySold}
            zeroDefault={true}
            onChange={(target) => {
              this.areaChangeHandler(
                rowIndex,
                cellIndex,
                target.value,
                e2.type,
              );
            }}
            value={e2.measure}
          />
        );
      });
    });
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        {this.state.currentErrorMessage !== '' ? (
          <Error message={this.state.currentErrorMessage} />
        ) : null}
        <Fragment>
          <Card>
            <CardHeader>
              <p>Areas</p>
            </CardHeader>
            <CardBody>
              <Table
                intersect={'Areas'}
                headers={[
                  ...this.processHeaders(
                    this.state.areaTypes,
                    this.state.types,
                  ),
                  <IconButton
                    disabled={this.state.disableSold}
                    onClick={() => {
                      this.toggleAreaTypeModal();
                    }}
                  />,
                ]}
                columns={this.state.properties}
                data={[
                  ...(this.state.data && this.inputsForData(this.state.data)),
                ]}
                width={{ width: '125px' }}
              />
            </CardBody>
          </Card>
          {this.state.hidden ? null : (
            <Modal
              title={
                this.state.editingAreaType
                  ? 'Editar tipo de area'
                  : 'Agregar nuevo tipo de area'
              }
              hidden={this.state.hidden}
              onConfirm={
                this.state.editingAreaType
                  ? this.updateAreaType
                  : this.addAreaType
              }
              onCancel={this.toggleAreaTypeModal}
            >
              {this.modalContent()}
            </Modal>
          )}
          {this.state.hideDeleteModal ? null : (
            <Modal
              title={'Eliminar tipo de area'}
              hidden={this.state.hideDeleteModal}
              onConfirm={this.deleteAreaType}
              onCancel={this.toggleDeleteModal}
            >
              Deseas eliminar este tipo de area?
            </Modal>
          )}
        </Fragment>
        {this.state.showFloatingButton ? (
          <FloatingButton
            route="prime"
            projectId={this.props.match.params.projectId}
            towerId={this.props.match.params.towerId}
          >
            Primas
          </FloatingButton>
        ) : null}
        <Prices2
          open={this.state.isAreaTypeDialogOpen}
          handleClose={() => {
            this.setState({ isAreaTypeDialogOpen: false });
          }}
          towerId={this.props.match.params.towerId}
          areaTypeId={this.state.areaTypeId}
        />
      </LoadableContainer>
    );
  }
}

export default Area;
