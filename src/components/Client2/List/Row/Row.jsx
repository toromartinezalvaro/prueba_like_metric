import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '../../../UI2/Button';

const Row = ({ client }) => {
  const { identityDocument, name, email, phoneNumber } = client;

  return (
    <TableRow>
      <TableCell>
        <i className="fas fa-check-circle"></i>
      </TableCell>
      <TableCell>{identityDocument}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{phoneNumber}</TableCell>
      <TableCell>
        <Button>Detalles</Button>
      </TableCell>
      <TableCell>
        <Button>Sala de ventas</Button>
      </TableCell>
    </TableRow>
  );
};

Row.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string,
    identityDocument: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};

Row.defaultProps = {
  client: {
    id: uuidv4(),
    identityDocument: '',
    name: '',
    email: '',
    phoneNumber: '',
  },
};

export default Row;
