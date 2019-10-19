import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import SummaryTable from '../../components/Summary/SummaryTable/SummaryTable';
import SummaryCell from '../../components/Summary/SummaryCell/SummaryCell';
import SummaryServices from '../../services/summary/SummaryService';
import Input from '../../components/UI/Input/Input';
import getHeat from '../../components/Summary/HeatMap/HeatMap';
import FloatingButton from '../../components/UI/FloatingButton/FloatingButton';
import LoadableContainer from '../../components/UI/Loader';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.services = new SummaryServices(this);
  }

  state = {
    firstFee: 0,
    periods: 1,
    credit: 100,
    locations: [],
    floors: [],
    areas: {
      min: 0,
      max: 0,
      avg: 0,
      rack: [[{}]],
    },
    pricesWithAdditions: {
      min: 0,
      max: 0,
      avg: 0,
      rack: [[{}]],
    },
    pricePerMT2WithAdditions: {
      min: 0,
      max: 0,
      avg: 0,
      rack: [[{}]],
    },
    propertiesPrices: {
      min: 0,
      max: 0,
      avg: 0,
      sum: 0,
      rack: [[{}]],
    },
    pricePerMT2: {
      min: 0,
      max: 0,
      avg: 0,
      sum: 0,
      rack: [[{}]],
    },
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getSummaries(this.props.match.params.towerId)
      .then((response) => {
        const { data } = response;
        this.setState({
          locations: [...Array(data.totalProperties).keys()].map((o) => o + 1),
          floors: [...Array(data.floors).keys()].map(
            (o) => o + data.lowestFloor,
          ),
          areas: data.areas,
          pricesWithAdditions: data.pricesWithAdditions,
          pricePerMT2WithAdditions: data.pricePerMT2WithAdditions,
          propertiesPrices: data.propertiesPrices,
          pricePerMT2: data.pricePerMT2,
          periods: data.periods,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  }

  getData = (summary, key) => {
    if (!summary) {
      return null;
    }
    return summary.rack.map((row) =>
      row.map((value) => {
        const wrappedValue = value || {}
        return (
          <SummaryCell
            data-tip={wrappedValue.name}
            key={key}
            k={key}
            style={{
              backgroundColor: getHeat(
                summary.min,
                summary.max,
                summary.avg,
                wrappedValue,
                key,
              ),
            }}
          >
            {wrappedValue}
          </SummaryCell>
        );
      }),
    );
  };

  firstFeeHandler = (target) => {
    this.setState({
      firstFee: target.value,
      credit: 100 - target.value,
    });
  };

  periodsHandler = (target) => {
    this.setState({ periods: target.value });
  };

  creditHandler = (target) => {
    this.setState({
      credit: target.value,
      firstFee: 100 - target.value,
    });
  };

  calcFees = () => {
    let items = 0;
    let secondIndex = -1;
    const firstIndex = this.state.pricesWithAdditions.rack.findIndex((i) => {
      secondIndex = i.findIndex((j) => j !== undefined && j !== null);
      return secondIndex > -1;
    });
    if (firstIndex === -1) {
      return null;
    }
    const fees = {
      min: this.state.pricesWithAdditions.rack[firstIndex][secondIndex].price,
      max: this.state.pricesWithAdditions.rack[firstIndex][secondIndex].price,
      avg: 0,
      sum: 0,
      rack: [],
    };
    fees.rack = this.state.pricesWithAdditions.rack.map((row) => {
      return row.map((value) => {
        if (value) {
          if (value.price < fees.min) {
            fees.min = value.price;
          }
          if (value.price > fees.max) {
            fees.max = value.price;
          }
          fees.sum += value.price;
          items++;
          const newValue = { ...value };
          newValue.price =
            value.price * (this.state.firstFee / 100) * this.state.periods;
          return newValue;
        }
        return null;
      });
    });
    fees.avg = fees.sum /= items;
    return fees;
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        <Card>
          <CardHeader>
            <p>Resumen general</p>
          </CardHeader>
          <CardBody>
            <SummaryTable
              title="Areas"
              intersect="Areas"
              headers={this.state.locations}
              columns={this.state.floors}
              data={this.getData(this.state.areas, 'area')}
              stats={[
                { title: 'Mínimo', value: this.state.areas.min },
                { title: 'Máximo', value: this.state.areas.max },
                { title: 'Promedio', value: this.state.areas.avg },
                { title: 'Total', value: this.state.areas.sum },
              ]}
            />
            <SummaryTable
              title="Precio con adicionales"
              intersect="Precios"
              headers={this.state.locations}
              columns={this.state.floors}
              data={this.getData(this.state.pricesWithAdditions, 'price')}
              stats={[
                { title: 'Mínimo', value: this.state.pricesWithAdditions.min },
                { title: 'Máximo', value: this.state.pricesWithAdditions.max },
                {
                  title: 'Promedio',
                  value: this.state.pricesWithAdditions.avg,
                },
                { title: 'Total', value: this.state.pricesWithAdditions.sum },
              ]}
            />
            <SummaryTable
              title="Valor mes cuota inicial"
              intersect="Precios"
              headers={this.state.locations}
              columns={this.state.floors}
              data={this.getData(this.calcFees(), 'price')}
              stats={[
                {
                  title: 'Cuota inicial',
                  value: (
                    <Input
                      updateWithProp
                      mask="percentage"
                      zeroDefault={true}
                      validations={[
                        {
                          fn: (value) =>
                            parseFloat(value) >= 0 && parseFloat(value) <= 100,
                          message: 'El valor debe estar entre 0% y 100%',
                        },
                      ]}
                      style={{ width: '75px', fontSize: '16px' }}
                      onChange={this.firstFeeHandler}
                      value={this.state.firstFee}
                    />
                  ),
                },
                {
                  title: 'Credito',
                  value: (
                    <Input
                      updateWithProp
                      mask="percentage"
                      style={{ width: '75px', fontSize: '16px' }}
                      value={this.state.credit}
                      onChange={this.creditHandler}
                      validations={[
                        {
                          fn: (value) =>
                            parseFloat(value) >= 0 && parseFloat(value) <= 100,
                          message: 'El valor debe estar entre 0% y 100%',
                        },
                      ]}
                    />
                  ),
                },
                {
                  title: 'Plazo',
                  value: <span>{this.state.periods}</span>,
                },
              ]}
            />
            <SummaryTable
              title="Precio por m² con adicionales"
              intersect="Precios"
              headers={this.state.locations}
              columns={this.state.floors}
              data={this.getData(this.state.pricePerMT2WithAdditions, 'price')}
              stats={[
                {
                  title: 'Mínimo',
                  value: this.state.pricePerMT2WithAdditions.min,
                },
                {
                  title: 'Máximo',
                  value: this.state.pricePerMT2WithAdditions.max,
                },
                {
                  title: 'Promedio',
                  value: this.state.pricePerMT2WithAdditions.avg,
                },
                {
                  title: 'Total',
                  value: this.state.pricePerMT2WithAdditions.sum,
                },
              ]}
            />
            <SummaryTable
              title="Precio del inmueble"
              intersect="Precios"
              headers={this.state.locations}
              columns={this.state.floors}
              data={this.getData(this.state.propertiesPrices, 'price')}
              stats={[
                {
                  title: 'Mínimo',
                  value: this.state.propertiesPrices.min,
                },
                {
                  title: 'Máximo',
                  value: this.state.propertiesPrices.max,
                },
                {
                  title: 'Promedio',
                  value: this.state.propertiesPrices.avg,
                },
                { title: 'Total', value: this.state.propertiesPrices.sum },
              ]}
            />
            <SummaryTable
              title="Precio por m²"
              intersect="Precios"
              headers={this.state.locations}
              columns={this.state.floors}
              data={this.getData(this.state.pricePerMT2, 'price')}
              stats={[
                {
                  title: 'Mínimo',
                  value: this.state.pricePerMT2.min,
                },
                {
                  title: 'Máximo',
                  value: this.state.pricePerMT2.max,
                },
                {
                  title: 'Promedio',
                  value: this.state.pricePerMT2.avg,
                },
                { title: 'Total', value: this.state.pricePerMT2.sum },
              ]}
            />
          </CardBody>
          <FloatingButton
            route="rackAreas"
            projectId={this.props.match.params.projectId}
            towerId={this.props.match.params.towerId}
          >
            Resumen Areas
          </FloatingButton>
        </Card>
        <ReactTooltip />
      </LoadableContainer>
    );
  }
}

export default Summary;
