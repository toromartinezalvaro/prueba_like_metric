import React from 'react';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/IconButton/IconButton';
import styles from './IncrementsChart.module.scss';

const incrementsChart = ({ data, incrementsHandler, getData, ...rest }) => {
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

  const parseData = data => {
    return data.map((group, index) => {
      return {
        label: group.name,
        data: group.increments,
        borderColor: backgroundColors[index],
        backgroundColor: backgroundColors[index],
        fill: group.name !== 'Mercado' ? null : true,
      };
    });
  };

  const getLabels = data => {
    const lengths = data.map(group => {
      return group.increments.length;
    });
    return Array(_.max(lengths))
      .fill(null)
      .map((_, index) => {
        return index + 1;
      });
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
          />
        )}
      </CardBody>
    </Card>
  );
};

export default incrementsChart;
