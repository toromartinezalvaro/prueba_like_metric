import React from 'react';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import styles from './IncrementsChart.module.scss';

const incrementsChart = ({ data, incrementsHandler, ...rest }) => {
  const parseData = data => {
    return data.map((prices, index) => {
      return {
        label: `Tipo ${index + 1}`,
        data: prices,
        fill: null,
      };
    });
  };

  const getLabels = data => {
    const lengths = data.map(prices => {
      return prices.length;
    });
    return Array(_.max(lengths))
      .fill(null)
      .map((_, index) => {
        return index + 1;
      });
  };

  const getPrices = increments => {
    return increments.map(type => {
      return type.prices;
    });
  };

  return (
    <Card>
      <CardHeader>
        <span>Gráfica de incrementos</span>
      </CardHeader>
      <CardBody>
        <div className={styles.Container}>
          Incrementos
          {data.map(increment => {
            return (
              <div>
                <span className={styles.Header}>{increment.type}: </span>{' '}
                <Input
                  value={increment.increment}
                  validations={[]}
                  onChange={target => {
                    incrementsHandler(increment.id, target.value);
                  }}
                />
              </div>
            );
          })}
        </div>
        <Line
          data={{
            labels: getLabels(getPrices(data)),
            datasets: parseData(getPrices(data)),
          }}
        />
      </CardBody>
    </Card>
  );
};

export default incrementsChart;
