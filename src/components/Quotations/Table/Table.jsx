import React from 'react';
import moment from 'moment';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Table = () => {
  return (
    <TableContainer component={Paper}>
      <MuiTable aria-label="simple table">
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
              {moment()
                .format('MMM YY')
                .toString()}
            </TableCell>
            <TableCell>$3,600,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>
              {moment()
                .format('MMM YY')
                .toString()}
            </TableCell>
            <TableCell>$2,676,923</TableCell>
          </TableRow>
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
