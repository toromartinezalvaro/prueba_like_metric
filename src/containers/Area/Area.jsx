import React, { Component, Fragment } from 'react';
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
import NumberFormat from 'react-number-format';
import Loader from 'react-loader-spinner';
import commonStyles from '../../assets/styles/variables.scss';

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
  };

  modalContent = () => {
    console.log('modalContent ====> ', this.state.areaType);
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
          />
        </Fragment>
      );
    } else {
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
          <select
            onChange={this.measurementUnitHandler}
            placeholder={'Tipo de medida'}
            value={this.state.areaMeasurementUnit}
          >
            <option value={'MT2'}>MT2</option>
            <option value={'UNT'}>Unidad</option>
          </select>
        </div>
      );
    }
  };

  processHeaders = (headers, totals) => {
    let totalArea = 0;
    return headers.map(areaType => {
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
          onDoubleClick={() => {
            this.toggleAreaTypeModal(areaType);
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

  toggleDeleteModal = id => {
    if (id === undefined) {
      this.setState(prevState => ({
        deleteAreaTypeId: null,
        hideDeleteModal: !prevState.hideDeleteModal,
      }));
    } else {
      this.setState(prevState => ({
        deleteAreaTypeId: id,
        hideDeleteModal: !prevState.hideDeleteModal,
      }));
    }
  };

  componentDidMount() {
    this.updateTableInformation();
    this.setState({ isLoading: true });
  }

  updateTableInformation = () => {
    const towerId = this.props.match.params.towerId;
    if (!towerId) {
      return;
    }
    this.services
      .getAreas(towerId)
      .then(response => {
        this.setState({
          data: response.data.propertiesAreas,
        });
        console.log('response', response);
        if (this.state.calculateTotals === true) {
          let types = [];
          this.state.data.forEach(arrayAreas => {
            if (arrayAreas !== undefined) {
              arrayAreas.forEach(area => {
                if (!types.find(type => area.type === type.id)) {
                  types.push({ id: area.type, total: 0 });
                }
                if (types !== undefined) {
                  let index = types.findIndex(obj => obj.id === area.type);
                  if (types[index] !== undefined) {
                    types[index].total += area.measure;
                  }
                }
                return types;
              });
              this.setState({ types: types, calculateTotals: false });
            }
          });
        }
        this.setState({
          areaTypes: response.data.areaTypes,
          properties: response.data.properties,
          isLoading: false,
        });
        let showFloating = response.data.propertiesAreas.find(arrayAreas => {
          let anyArea = arrayAreas.find(area => {
            return area !== null && area.measure !== 0;
          });
          return anyArea !== undefined;
        });
        if (showFloating !== undefined) {
          this.setState({ showFloatingButton: true });
        }
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
        });
      });
    this.setState({ currentErrorMessage: '' });
  };

  areaTypeHandler = target => {
    this.setState({ [target.name]: target.value });
  };

  measurementUnitHandler = event => {
    this.setState({ areaMeasurementUnit: event.target.value });
  };

  toggleAreaTypeModal = areaType => {
    console.log(
      `🌞 this is how areaType is comming ${JSON.stringify(areaType)}`,
    );
    if (areaType === undefined) {
      console.log(
        `⚠ So this is the current state ${JSON.stringify(this.state.areaType)}`,
      );
      this.setState(prevState => ({
        hidden: !prevState.hidden,
        areaType: '',
        areaMeasurementUnit: 'MT2',
        editingAreaType: false,
      }));
    } else {
      this.setState(prevState => ({
        hidden: !prevState.hidden,
        areaTypeId: areaType.id,
        areaType: areaType.name,
        areaMeasurementUnit: areaType.measurementUnit,
        editingAreaType: true,
      }));

      console.log(`🌞 ====> ${JSON.stringify(areaType)}`);
    }
  };

  deleteAreaType = () => {
    this.services
      .deleteArea(this.state.deleteAreaTypeId)
      .then(data => {
        this.toggleDeleteModal();
        this.updateTableInformation();
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
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
      .then(data => {
        console.log(data);
        this.toggleAreaTypeModal();
        this.updateTableInformation();
        this.setState({ modalIsLoading: false });
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
          modalIsLoading: false,
        });
      });
    this.setState({ currentErrorMessage: '' });
  };

  addAreaType = () => {
    console.log('addAreaType :D');
    this.setState({ modalIsLoading: true });
    this.services
      .postArea({
        name: this.state.areaType,
        measurementUnit: this.state.areaMeasurementUnit,
        towerId: this.props.match.params.towerId,
      })
      .then(data => {
        console.log(data);
        this.setState({ calculateTotals: true });
        this.toggleAreaTypeModal();
        this.updateTableInformation();
        this.setState({ modalIsLoading: false });
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
          modalIsLoading: false,
        });
      });
    this.setState({ currentErrorMessage: '' });
  };

  sumTotalHeader(actualValue, value, type, arrayTotals) {
    let index = arrayTotals.findIndex(obj => obj.id === type);
    if (arrayTotals[index] !== undefined) {
      console.log('actualValue', actualValue);

      if (actualValue > parseFloat(value)) {
        arrayTotals[index].total -= actualValue - parseFloat(value);
      } else {
        arrayTotals[index].total += parseFloat(value) - actualValue;
      }
    }
  }

  areaChangeHandler = (rowIndex, cellIndex, value, type) => {
    console.log(rowIndex, cellIndex, value, type);
    if (value !== '') {
      const currentData = this.state.data;
      let actualValue = currentData[rowIndex][cellIndex].measure;
      currentData[rowIndex][cellIndex].measure = value;
      this.services
        .putAreasByTowerId(
          this.props.match.params.towerId,
          currentData[rowIndex][cellIndex],
        )
        .then(response => {
          this.setState({ data: currentData, showFloatingButton: true });
          this.sumTotalHeader(actualValue, value, type, this.state.types);
          this.updateTableInformation();
        })
        .catch(error => {
          let errorHelper = errorHandling(error);
          this.setState({
            currentErrorMessage: errorHelper.message,
          });
        });
      this.setState({ currentErrorMessage: '' });
    }
  };

  render() {
    const inputs = this.state.data.map((row, rowIndex) => {
      return row.map((e2, cellIndex) => (
        <Input
          mask="number"
          style={{ width: '75px' }}
          validations={[
            {
              fn: value => {
                console.log(value);
                return value !== null;
              },
              message: 'No puede estar vacío',
            },
          ]}
          zeroDefault={true}
          onChange={target => {
            this.areaChangeHandler(rowIndex, cellIndex, target.value, e2.type);
          }}
          value={e2.measure}
        />
      ));
    });
  

    return (
      <div>
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
                    onClick={() => {
                      this.toggleAreaTypeModal();
                    }}
                  />,
                ]}
                columns={this.state.properties}
                data={[...inputs]}
                width={{ width: '125px' }}
              />
            </CardBody>
          </Card>
          {this.state.hidden ? null : (
            <Modal
              title={'Agregar nuevo tipo de area'}
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
      </div>
    );
  }
}

export default Area;
