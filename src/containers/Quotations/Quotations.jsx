import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import QuotationsDialog from '../../components/Quotations/Dialog';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';

const Quotations = ({ spawnMessage, ...props }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Abrir cotizacion</Button>
      <QuotationsDialog
        open={open}
        closeHandler={() => setOpen(false)}
        quotationData={{
          propertyId: 1944,
          identityDocument: '1017242984',
          propertyPrice: 3283000.0,
        }}
        towerId={props.match.params.towerId}
        spawnMessage={spawnMessage}
      />
    </div>
  );
};

Quotations.propTypes = {
  spawnMessage: PropTypes.func.isRequired,
};

export default withDefaultLayout(Quotations);
