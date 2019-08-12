import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

function AccordionTrigger({ group }) {
  return (
    <div>
      <span>{group.name}</span>
      <NumberFormat
        value={group.total.increment}
        displayType={'text'}
        prefix=" - $"
        thousandSeparator={true}
      />
    </div>
  );
}

AccordionTrigger.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string,
    total: PropTypes.shape({
      increment: PropTypes.number,
    }),
  }).isRequired,
};

export default AccordionTrigger;
