import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { Button } from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Styles from './AccordionTrigger.module.scss';

function AccordionTrigger({ group, resetStrategy }) {
  return (
    <div className={Styles.Header}>
      <div>
        <span>{group.name}</span>
        <NumberFormat
          value={group.total.increment}
          displayType={'text'}
          prefix=" - $"
          thousandSeparator={true}
        />
      </div>
      <div className={Styles.ContainerButtons}>
        <div className={Styles.DeleteButton}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AutorenewIcon />}
            onClick={(e) => {
              e.stopPropagation();
              resetStrategy(group.id);
            }}
          >
            Reiniciar Estrategia
          </Button>
        </div>
      </div>
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
