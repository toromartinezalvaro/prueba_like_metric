import React, { Fragment, useState, useEffect } from 'react';
import _ from 'lodash';
import Table from '../../UI/Table/Table';
import Input from '../../UI/Input/Input';
import errorHandling from '../../../services/commons/errorHelper';
import Error from '../../../components/UI/Error/Error';
import Loader from 'react-loader-spinner';
import commonStyles from '../../../assets/styles/variables.scss';
import styles from './Prices.module.scss';

const Prices = props => {
  const { areaTypeId, measurementUnit, services, towerId } = props;
  const [areas, setAreas] = useState([]);
  const [prices, setPrices] = useState([]);
  const [currentErrorMessage, setCurrentErrorMessage] = useState();
  const [isLoading, setLoading] = useState(false);

  const updateAreaPrice = (id, price) => {
    services
      .putAreaPrice(id, {
        price: price,
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateAreaTypePrice = (id, price) => {
    services
      .putAreaTypePrice(id, {
        price: price,
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    services
      .getPrices(towerId, areaTypeId)
      .then(res => {
        setLoading(false);
        if (res.data.length > 0) {
          res.data = _.sortBy(res.data, o => o.measure);
          if (res.data[0].areaType.unit === 'UNT') {
            setPrices([res.data[0].price]);
          } else {
            const areas = [];
            const prices = res.data.map(area => {
              areas.push(area.measure);
              return [
                <Input
                  mask="currency"
                  onChange={target => {
                    updateAreaPrice(area.id, target.value);
                  }}
                  validations={[]}
                  style={{ width: '75px' }}
                  value={area.price}
                />,
              ];
            });
            setAreas(areas);
            setPrices(prices);
          }
        }
      })
      .catch(error => {
        setLoading(false);
        let errorHelper = errorHandling(error);
        setCurrentErrorMessage(errorHelper.message);
      });
    setCurrentErrorMessage('');
  }, []);

  return (
    <Fragment>
      <div>
        {currentErrorMessage !== '' ? (
          <Error message={currentErrorMessage} />
        ) : null}
        {console.log('Ooooh ', isLoading, props.isLoading)}
        {prices.length === 0 && !isLoading && !props.isLoading ? (
          <div>No se han ingresado areas</div>
        ) : isLoading || props.isLoading ? (
          <div className={styles.Loader}>
            <Loader
              type="ThreeDots"
              color={commonStyles.mainColor}
              height="100"
              width="100"
            />
          </div>
        ) : measurementUnit === 'MT2' ? (
          <Table
            intersect={'Areas'}
            headers={['Precio']}
            columns={areas}
            data={prices}
            maxHeight={{ maxHeight: '36vh' }}
          />
        ) : (
          <div style={{ display: 'flex' }}>
            <div>Precio: </div>
            <div>
              {console.log('prices', prices)}
              <Input
                mask="currency"
                onChange={target => {
                  updateAreaTypePrice(areaTypeId, target.value);
                }}
                value={prices[0]}
                validations={[]}
                style={{ width: '75px' }}
              />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Prices;
