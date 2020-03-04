import React, { useMemo } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Styles from './Table.module.scss';

const Table = ({ quotation }) => {
  const initialFee = useMemo(
    () => quotation.propertyPrice * quotation.initialFeePercentage,
    [quotation],
  );

  return (
    <TableContainer component={Paper} classes={{ root: Styles.table }}>
      <MuiTable stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Cuota</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Fecha</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Valor</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Separacion</TableCell>
            <TableCell>
              {moment(Number(quotation.paymentStartDate))
                .format('MMM YY')
                .toString()}
            </TableCell>
            <TableCell>
              <NumberFormat
                value={(initialFee * quotation.reservePercentage).toFixed(2)}
                displayType="text"
                thousandSeparator
                prefix="$"
              />
            </TableCell>
          </TableRow>
          {Array(Math.max(1, quotation.periods))
            .fill(null)
            .map((_, index) => (
              <TableRow key={`QuotationRow-${index}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {moment(Number(quotation.paymentStartDate))
                    .add(index + 1, 'M')
                    .format('MMM YY')
                    .toString()}
                </TableCell>
                <TableCell>
                  <NumberFormat
                    value={(
                      (initialFee - initialFee * quotation.reservePercentage) /
                      quotation.periods
                    ).toFixed(2)}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                  />
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell>Cuota final</TableCell>
            <TableCell>
              {moment(Number(quotation.deliveryDate))
                .format('MMM YY')
                .toString()}
            </TableCell>
            <TableCell>
              <NumberFormat
                value={
                  quotation.propertyPrice * (1 - quotation.initialFeePercentage)
                }
                displayType="text"
                thousandSeparator
                prefix="$"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
