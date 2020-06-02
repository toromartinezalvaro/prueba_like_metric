import React, { Component } from 'react';
import exportFromJSON from 'export-from-json';
import NumberFormat from 'react-number-format';
import Pie from '../../components/Detail/pie/Pie';
import Property from '../../components/Detail/Property/Property';
import Additional from '../../components/Detail/Aditionals/Aditionals';
import Totals from '../../components/Detail/Totals/Totals';
import DetailServices from '../../services/detail/DetailServices';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import styles from './DetailAdmin.module.scss';
import variables from '../../assets/styles/variables.scss';
import Table from '../../components/UI/Table/Table';
import errorHandling from '../../services/commons/errorHelper';
import Error from '../../components/UI/Error/Error';
import FloatingButton from '../../components/UI/FloatingButton/FloatingButton';
import Button from '../../components/UI/Button/Button';
import LoadableContainer from '../../components/UI/Loader';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.services = new DetailServices(this);
  }

  state = {
    properties: [],
    property: {},
    property2: {},
    totals: {},
    totals2: {},
    areas: [],
    additional: [],
    areas2: [],
    additional2: [],
    areasTable: {
      nameAreas: [],
      priceAreas: [],
    },
    areasTable2: {
      nameAreas: [],
      priceAreas: [],
    },
    style: {},
    active: 0,
    active2: 0,
    id: 0,
    id2: 0,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getDetails();
  }

  getDetails = () => {
    const { towerId } = this.props.match.params;
    if (!towerId) {
      return;
    }
    this.services
      .getDetails(towerId)
      .then((response) => {
        this.assignDefaultValues(response.data);
      })
      .catch((error) => {
        const errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
        });
      });
    this.setState({ currentErrorMessage: '' });
  };

  assignDefaultValues = (data) => {
    if (data.length !== 0) {
      this.setState({
        properties: data,
        property: data[0],
        totals: data[0].totals,
        areas: data[0].areas,
        additional: data[0].additionalAreas,
      });
      this.assignTableData();
    }
    this.setState({ isLoading: false });
  };

  sortData = (data) =>
    data.sort((a, b) => {
      const aInt = parseInt(a.areaType.id, 10);
      const bInt = parseInt(b.areaType.id, 10);
      if (b.areaType.primary) return 1;
      if (aInt > bInt) return 1;
      if (aInt < bInt) return -1;
      return 0;
    });

  assignTableData = () => {
    if (this.state.areas) {
      const areas = this.sortData(this.state.areas);
      this.setState({
        areasTable: this.mapAreasForCells(areas),
      });
    }
  };

  formatPrice = (value) => {
    return (
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
    );
  };

  printAdditional = (data) => {
    return data.map((aditional) => {
      return aditional.areaType.unit === 'MT2' ? (
        <Additional
          Title={`${aditional.areaType.name} - ${aditional.areaType.unit}`}
          Title1="Nomenclatura"
          Title2="Area"
          Title3="Precio"
          Title4="Total"
          key={aditional.id}
          Value1={aditional.nomenclature}
          Value2={aditional.measure}
          Value3={this.formatPrice(aditional.price)}
          Value4={this.formatPrice(aditional.price * aditional.measure)}
        />
      ) : (
        <Additional
          Title={`${aditional.areaType.name} - ${aditional.areaType.unit}`}
          Title1="Nomenclatura"
          Title2="Precio"
          key={aditional.id}
          Value1={aditional.nomenclature}
          Value2={this.formatPrice(aditional.price)}
        />
      );
    });
  };

  mapAreasForCells = (areas) =>
    areas.reduce(
      (current, next) => {
        if (next.areaType.unit === 'MT2') {
          current.nameAreas.push(next.areaType.name);
          current.priceAreas.push(
            <p style={{ alignContent: 'center' }}>
              {this.formatPrice(next.price)}
            </p>,
          );
        }
        return current;
      },
      {
        nameAreas: [],
        priceAreas: [],
      },
    );

  cells = (properties) => {
    return properties.map((property) => {
      const handleOnClick = () => {
        const areas = this.sortData(property.areas);
        if (
          this.state.id2 !== property.id &&
          this.state.id !== property.id &&
          this.state.id !== 0
        ) {
          return this.setState({
            id2: property.id,
            active2: 1,
            property2: property,
            totals2: property.totals,
            areas2: property.areas.filter(
              ({ areaType }) => areaType.unit === 'MT2',
            ),
            additional2: property.additionalAreas,
            areasTable2: this.mapAreasForCells(areas),
          });
        }
        if (this.state.id2 === property.id && this.state.id !== Property.id) {
          return this.setState({ id2: 0, active2: 0 });
        }

        if (
          (this.state.id !== property.id && this.state.active2 === 0) ||
          this.state.id === 0
        ) {
          return this.setState({
            property,
            totals: property.totals,
            areas: property.areas.filter(
              ({ areaType }) => areaType.unit === 'MT2',
            ),
            additional: property.additionalAreas,
            id: property.id,
            areasTable: this.mapAreasForCells(areas),
          });
        }
        return this.setState({ id: 0 });
      };
      return (
        <div key={property.nomenclature} onClick={handleOnClick}>
          <Property
            property={property}
            style={
              this.state.id === property.id
                ? { color: 'white', backgroundColor: variables.mainColor }
                : this.state.id2 === property.id
                ? { color: 'white', backgroundColor: variables.greenColor }
                : {}
            }
          />
        </div>
      );
    });
  };

  onClickExport = () => {
    const { towerId } = this.props.match.params;
    this.services
      .getExcel(towerId)
      .then((response) => {
        if (!response.data) {
          throw Error('No response');
        }
        const fileName = 'Detalle';
        const exportType = 'xls';
        exportFromJSON({ data: response.data, fileName, exportType });
      })
      .catch(this.genericCatch);
  };

  genericCatch = (error) => {
    const errorHelper = errorHandling(error);
    this.setState({
      currentErrorMessage: errorHelper.message,
      isLoading: false,
    });
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        {this.state.currentErrorMessage !== '' ? (
          <Error message={this.state.currentErrorMessage} />
        ) : null}
        <Card>
          <CardHeader>
            <p>Inmuebles</p>
            <Button onClick={this.onClickExport}>Exportar a Excel</Button>
          </CardHeader>
          <CardBody style={{ margin: '0' }}>
            <div className={styles.Row}>
              {this.cells(this.state.properties)}
            </div>
          </CardBody>
        </Card>
        {this.state.id !== 0 || this.state.id2 !== 0 ? (
          <div className={styles.Container}>
            {this.state.id !== 0 ? (
              <div className={styles.AreaContainer}>
                <div>
                  <Card style={{ marginTop: '0' }}>
                    <CardHeader>
                      <p>Areas {this.state.property.nomenclature}</p>
                    </CardHeader>
                    <CardBody style={{ margin: '0' }}>
                      <Pie
                        property={this.state.property}
                        nomenclature={this.state.property.nomenclature}
                      />

                      <Totals data={this.state.property} />
                      <div
                        style={{
                          marginTop: '10px',
                          overflowX: 'auto',
                          maxWidth: '450px',
                        }}
                      >
                        <Table
                          intersect={'Areas'}
                          headers={this.state.areasTable.nameAreas}
                          columns={[
                            <p
                              key="PrecioxMts21"
                              style={{ alignContent: 'center' }}
                            >
                              PrecioxMts2
                            </p>,
                          ]}
                          data={[this.state.areasTable.priceAreas]}
                          style={{ padding: '0em 1.5em' }}
                          width={{ width: '100px' }}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </div>
                {this.state.id !== 0 ? (
                  <div
                    style={
                      this.state.id !== 0 && this.state.id2 !== 0
                        ? { flexGrow: '1' }
                        : { display: 'flex' }
                    }
                  >
                    <Card style={{ marginTop: '0', width: '100%' }}>
                      <CardHeader>
                        <p>Adicionales</p>
                      </CardHeader>
                      <CardBody style={{ margin: '0' }}>
                        {this.printAdditional(this.state.additional)}
                        <Additional
                          Title="Total"
                          Title1="Cantidad"
                          Title2="Promedio"
                          Title3="Total"
                          Value1={this.state.totals.quantityAdditional}
                          Value2={this.formatPrice(
                            this.state.totals.priceXUnit,
                          )}
                          Value3={this.formatPrice(
                            this.state.totals.priceAdditional,
                          )}
                        />
                      </CardBody>
                    </Card>
                  </div>
                ) : null}
              </div>
            ) : null}
            {this.state.active2 !== 0 ? (
              <div className={styles.AreaContainer}>
                <div>
                  <Card style={{ marginTop: '0' }}>
                    <CardHeader>
                      <p>Areas {this.state.property2.nomenclature}</p>
                    </CardHeader>
                    <CardBody style={{ margin: '0' }}>
                      <Pie
                        property={this.state.property2}
                        nomenclature={this.state.property2.nomenclature}
                      />
                      <Totals data={this.state.property2} />
                      <div
                        style={{
                          marginTop: '10px',
                          overflowX: 'auto',
                          maxWidth: '450px',
                        }}
                      >
                        <Table
                          intersect={'Areas'}
                          headers={this.state.areasTable2.nameAreas}
                          columns={[
                            <p
                              key="PrecioxMts2C"
                              style={{ alignContent: 'center' }}
                            >
                              PrecioxMts2
                            </p>,
                          ]}
                          data={[this.state.areasTable2.priceAreas]}
                          style={{ padding: '0em 1.5em' }}
                          width={{ width: '100px' }}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </div>
                {this.state.active2 !== 0 ? (
                  <div
                    style={
                      this.state.id2 !== 0 && this.state.id !== 0
                        ? { flexGrow: '1' }
                        : { display: 'flex' }
                    }
                  >
                    <Card style={{ marginTop: '0' }}>
                      <CardHeader>
                        <p>Adicionales</p>
                      </CardHeader>
                      <CardBody style={{ margin: '0' }}>
                        {this.printAdditional(this.state.additional2)}

                        <Additional
                          Title="Total"
                          Title1="Cantidad"
                          Title2="Promedio"
                          Title3="Total"
                          Value1={this.state.totals2.quantityAdditional}
                          Value2={this.formatPrice(
                            this.state.totals2.priceXUnit,
                          )}
                          Value3={this.formatPrice(
                            this.state.totals2.priceAdditional,
                          )}
                        />
                      </CardBody>
                    </Card>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
        <FloatingButton
          route="summary"
          projectId={this.props.match.params.projectId}
          towerId={this.props.match.params.towerId}
        >
          Resumen
        </FloatingButton>
      </LoadableContainer>
    );
  }
}
