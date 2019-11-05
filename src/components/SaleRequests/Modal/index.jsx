import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import NumberFormat from 'react-number-format';
import Button from '../../UI/Button/Button';
import Table from '../../UI/Table/Table';
import Input from '../../UI/Input/Input';
import Styles from './SaleRequestsModal.module.scss';

const SaleRequestModal = ({
  open,
  approveHandler,
  rejectHandler,
  cancelHandler,
  saleRequest: { client, property, pricing },
}) => {
  const getColumns = () => {
    return property.details.map((detail) => {
      return detail.name;
    });
  };

  const getData = () => {
    return property.details.map((detail, index) => {
      return [detail.reference, detail.quantity, detail.unit, detail.value];
    });
  };

  return (
    <Dialog open={open} scroll="body" maxWidth="lg">
      <DialogTitle>Solicitud de venta</DialogTitle>
      <DialogContent>
        <div className={Styles.info}>
          <span className={Styles.client}>{client.name}</span>{' '}
          <div className={Styles.property}>
            Propiedad: <span className={Styles.name}>{property.name}</span>
          </div>
        </div>
        <div className={Styles.details}>
          <div className={Styles.header}>
            <span>Detalle</span>
          </div>
          <div>
            <Table
              intersect="Item"
              headers={['#', 'Cantidad', 'Unidad', 'Valor']}
              columns={getColumns()}
              data={getData()}
            />
          </div>
        </div>
        <div className={Styles.pricing}>
          <div className={Styles.l0}>
            <span className={Styles.title}>Precio de lista:</span>
            <span className={Styles.value}>
              <Input mask="currency" value={pricing.l0} />
            </span>
          </div>
          <div className={Styles.trade}>
            <span className={Styles.title}>Descuento comercial:</span>
            <span className={Styles.value}>
              <Input mask="currency" value={pricing.trade} />
            </span>
          </div>
          <div className={Styles.financial}>
            <span className={Styles.title}>Descuento financiero:</span>
            <span className={Styles.value}>
              <Input mask="currency" value={pricing.financial} />
            </span>
          </div>
        </div>
        <div className={Styles.total}>
          <span className={Styles.title}>Total:</span>
          <span className={Styles.value}>
            <NumberFormat
              value={pricing.l0 - pricing.trade - pricing.financial}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
          </span>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelHandler}>Cancelar</Button>
        <Button onClick={rejectHandler}>Rechazar</Button>
        <Button onClick={approveHandler}>Aprovar</Button>
      </DialogActions>
    </Dialog>
  );
};

SaleRequestModal.propTypes = {
  open: PropTypes.bool.isRequired,
  approveHandler: PropTypes.func.isRequired,
  rejectHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  saleRequest: PropTypes.shape({
    client: PropTypes.shape({
      name: PropTypes.string,
    }),
    property: PropTypes.shape({
      name: PropTypes.string,
      details: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          reference: PropTypes.string,
          quantity: PropTypes.number,
          unit: PropTypes.string,
          value: PropTypes.number,
        }),
      ),
    }),
    pricing: PropTypes.shape({
      l0: PropTypes.number,
      trade: PropTypes.number,
      financial: PropTypes.number,
    }),
  }),
};

SaleRequestModal.defaultProps = {
  saleRequest: {
    client: {
      name: 'Sebastian',
    },
    property: {
      name: '801',
      details: [
        {
          name: 'Apartamento',
          reference: '801',
          quantity: 1,
          unit: 'Metros',
          value: 8100,
        },
        {
          name: 'Parqueadero',
          reference: 'P-01',
          quantity: 1,
          unit: 'Unidad',
          value: 810,
        },
        {
          name: 'Util',
          reference: 'U-3',
          quantity: 1,
          unit: 'Unidad',
          value: 88,
        },
      ],
    },
    pricing: {
      l0: 8300,
      trade: 810,
      financial: 820,
    },
  },
};

export default SaleRequestModal;
