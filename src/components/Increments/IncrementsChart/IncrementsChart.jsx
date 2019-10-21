import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Button from '../../UI/Button/IconButton/IconButton';

const incrementsChart = ({
  data,
  incrementsHandler,
  getData,
  salesStartDate,
  ...rest
}) => {
  const defaultColor = 'rgba(0, 0, 0, 0.1)';

  const backgroundColors = [
    'rgba(238, 99, 82, 0.65)',
    'rgba(58, 124, 165, 0.65)',
    'rgba(250, 192, 94, 0.65)',
    'rgba(247, 157, 132, 0.65)',
    'rgba(255, 107, 107, 0.65)',
    'rgba(47, 102, 144, 0.65)',
    'rgba(89, 205, 144, 0.65)',
    'rgba(22, 66, 91, 0.65)',
    'rgba(129, 195, 215, 0.65)',
  ];

  const parseData = (data) => {
    return data.map((group, index) => {
      const INCREMENTS_FIXED = group.increments.map(
        (increment) => increment && increment.toFixed(2),
      );
      return {
        label: group.name,
        data: INCREMENTS_FIXED,
        borderColor:
          group.name === 'Mercado' ? defaultColor : backgroundColors[index],
        backgroundColor:
          group.name === 'Mercado' ? defaultColor : backgroundColors[index],
        fill: group.name !== 'Mercado' ? null : true,
      };
    });
  };

  const getLabels = (data) => {
    const lengths = data.map((group) => {
      return group.increments.length;
    });
    return Array(_.max(lengths))
      .fill(null)
      .map((_, index) => {
        return moment(Number(salesStartDate))
          .add(index, 'months')
          .format('MM/YY');
      });
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, i, values) {
              const stringValue = value.toString();
              const index = stringValue.search(/[1-9]/);
              return (
                '$' +
                stringValue.substring(0, index) +
                stringValue
                  .substring(index, stringValue.length)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
              );
              //return '$' + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, ',');
            },
          },
        },
      ],
    },
  };

  return (
    <Card>
      <CardHeader>
        <span>
          Gráfica de incrementos{' '}
          <Button onClick={getData} icon="fas fa-sync-alt" />
        </span>
      </CardHeader>
      <CardBody>
        {data.length === 0 ? (
          'No hay información para mostrar'
        ) : (
          <Line
            data={{
              labels: getLabels(data),
              datasets: parseData(data),
            }}
            options={options}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default incrementsChart;
