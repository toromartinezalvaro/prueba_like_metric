import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card, { CardHeader, CardBody, CardFooter } from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import Styles from './SearchOrNew.module.scss';
import SearchForm from './SearchForm';

const SearchOrNewClient = ({
  open,
  handleClose,
  clientInfo,
  searchNumber,
  pushToSalesRoom,
}) => {
  const [client, setClient] = React.useState(clientInfo);
  const [isEditing, setEdition] = React.useState(false);

  const handleChange = (name) => (event) => {
    setClient({ ...client, [name]: event.target.value });
  };

  const searchCurrentNumber = () => {
    if (isEditing) {
      pushToSalesRoom('1');
    } else searchNumber(client.documentNumber);

    setEdition(!isEditing);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} scroll="body" maxWidth="lg">
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={false}>
          <Card>
            <CardHeader></CardHeader>
            <CardBody>
              {/* {[...new Array(50)]
                .map(
                  () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                )
                .join('\n')} */}
              <SearchForm
                handleChange={handleChange}
                isEditing={isEditing}
                client={client}
              />
            </CardBody>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={searchCurrentNumber} color="primary">
            {isEditing ? 'Ir a sala de ventas' : 'Buscar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SearchOrNewClient.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  //   name: PropTypes.string.isRequired,
  //   percentage: PropTypes.number.isRequired,
  //   updateHandler: PropTypes.func.isRequired,
  //   deleteHandler: PropTypes.func.isRequired,
};

export default SearchOrNewClient;
