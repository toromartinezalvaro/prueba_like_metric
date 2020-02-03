import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { ResponsiveBar } from '@nivo/bar';
import Styles from './Areas.module.scss';

const Areas = ({ property }) => {
  return (
    <div className={Styles.areasContainer}>
      <div className={Styles.areas}>
        <span className={Styles.title}>Areas</span>
        <div style={{ height: '100px' }}>
          <ResponsiveBar
            data={[
              property.areas.reduce(
                (current, area) => {
                  current[area.name] = area.measure;
                  return current;
                },
                { id: 1 },
              ),
            ]}
            padding={0.6}
            keys={property.areas.map((area) => area.name)}
            layout="horizontal"
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'top',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 0,
                symbolSize: 20,
                itemDirection: 'left-to-right',
              },
            ]}
          />
        </div>
      </div>
      {property.additionalAreas.length > 0 && (
        <div className={Styles.additionalAreas}>
          <span className={Styles.title}>Adiciones</span>
          <div className={Styles.content}>
            {property.additionalAreas.map((area, index) => {
              return (
                <div
                  className={Styles.additionalArea}
                  key={`additionalArea-${index}`}
                >
                  <div className={Styles.stat}>
                    <span className={Styles.label}>Nombre: </span>
                    <span className={Styles.value}>{area.nomenclature}</span>
                  </div>
                  <div className={Styles.stat}>
                    <span className={Styles.label}>
                      {area.unit === 'Unidad' ? 'Cantidad' : 'Medida'}
                    </span>
                    <span>{area.measure}</span>
                  </div>
                  <div className={Styles.stat}>
                    <span className={Styles.label}>Precio</span>
                    <NumberFormat
                      thousandSeparator=","
                      prefix="$"
                      value={
                        area.unit === 'Unidad'
                          ? area.price * area.measure
                          : area.price
                      }
                      displayType="text"
                    />
                  </div>
                  <div className={Styles.stat}>
                    <span className={Styles.label}>Unidad</span>
                    <span>{area.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

Areas.propTypes = {
  property: PropTypes.shape({
    basePrice: PropTypes.number,
    additionalAreasPrice: PropTypes.number,
    totalArea: PropTypes.number,
    pricePerM2: PropTypes.number,
    pricePerM2WithAdditionalAreas: PropTypes.number,
    areas: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        measure: PropTypes.number,
        unit: PropTypes.oneOf(['MT2', 'UNT']),
      }),
    ),
    additionalAreas: PropTypes.arrayOf(
      PropTypes.shape({
        nomenclature: PropTypes.string,
        price: PropTypes.number,
        measure: PropTypes.number,
        unit: PropTypes.oneOf(['MT2', 'UNT']),
      }),
    ),
  }),
};

export default Areas;
