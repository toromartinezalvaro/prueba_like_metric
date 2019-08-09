import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

function AccordionTrigger({ group }) {
  return (
    <div>
      <span>{group.name}</span>
      {group.increment !== null ? (
        <NumberFormat
          value={0}
          displayType={'text'}
          prefix=" - $"
          thousandSeparator={true}
        />
      ) : null}
    </div>
  );
}

AccordionTrigger.propTypes = {
  group: PropTypes.object,
};

AccordionTrigger.defaultProps = {
  group: { name: '', increment: null },
};

export default AccordionTrigger;
