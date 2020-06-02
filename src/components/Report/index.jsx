import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody } from '../UI/Card/Card';
import General from './General';
import Styles from './styles.module.scss';
import ConsolidatedSalesReport from './ConsolidatedSalesReport';

const Report = ({ data, pricesReportData, unitsReportData }) => {
  return (
    <>
      {/* <Card>
        <CardHeader>
          <span>Reporte</span>
        </CardHeader>
        <CardBody>
          <div className={Styles.container}>
            <General data={data} />
          </div>
        </CardBody>
      </Card> */}
      <ConsolidatedSalesReport
        pricesReportData={pricesReportData}
        unitsReportData={unitsReportData}
      />
    </>
  );
};

Report.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      name: PropTypes.string,
      averageArea: PropTypes.number,
      averagePrice: PropTypes.number,
      sold: PropTypes.exact({
        units: PropTypes.number,
        balance: PropTypes.number,
      }),
      inventory: PropTypes.exact({
        units: PropTypes.number,
        balance: PropTypes.number,
      }),
      total: PropTypes.exact({
        units: PropTypes.number,
        balance: PropTypes.number,
      }),
      discounts: PropTypes.number,
      balance: PropTypes.number,
    }),
  ),
};

export default Report;
