import React, { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import { Tooltip } from '@material-ui/core';
import moment from 'moment';
import Widget, { XS, SM } from '../../../Shared/Widget';
import { changeIncrement } from '../../../../../containers/StrategyV2/actions';
import Numbers from '../../../../../helpers/numbers';
import Styles from './ProjectedIncrement.module.scss';
import SalesWizard from './SalesWizard/index';
import IncrementsServices from '../../../../../services/increments/IncrementsServices';

const ProjectedIncrement = ({
  group,
  totalIncrement,
  salesIncrement,
  appliedIncrement,
  onIncrementChange,
  mini,
  field,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const services = new IncrementsServices();
  const inputValidations = [
    {
      fn: (value) => value > 0,
      message: 'Los meses de retención deben ser mayores a 0',
    },
    {
      fn: (value) => value <= 98,
      message: 'Los meses de retención deben ser menores a 98',
    },
  ];

  const putIncrement = (id, increment) => {
    services.putIncrement(this.props.match.params.towerId, {
      groupId: id,
      increment: parseFloat(increment),
    });
  };

  const putSuggestedEffectiveAnnualInterestRate = (
    id,
    effectiveAnnualInterestRate,
  ) => {
    services.putSuggestedEffectiveAnnualInterestRate(id, {
      effectiveAnnualInterestRate: parseFloat(effectiveAnnualInterestRate),
    });
  };

  const projectedIncrement = useMemo(() => {
    return totalIncrement - salesIncrement - appliedIncrement;
  }, [totalIncrement, salesIncrement, appliedIncrement]);

  const incrementChangeHandler = (event) => {
    onIncrementChange(Number(event.target.value));
  };

  return (
    <Widget title="Incremento proyectado " size={mini ? XS : SM}>
      {field ? (
        <>
          <TextField
            label="Incremento"
            placeholder="1.3"
            value={projectedIncrement}
            onChange={incrementChangeHandler}
            variant="outlined"
          />
          <Tooltip
            title="Abrir ayuda ventas"
            onClick={() => setModalOpen(true)}
          >
            <span className={Styles.Badge}>?</span>
          </Tooltip>
        </>
      ) : (
        <NumberFormat
          value={Numbers.toFixed(projectedIncrement)}
          displayType="text"
          prefix="$"
          thousandSeparator
        />
      )}
      <SalesWizard
        data={group}
        validations={[
          ...inputValidations,
          {
            fn: (value) =>
              value <= moment(Number(group.sales.date)).diff(moment(), 'month'),
            message: 'Los meses de retencion superan la fecha final de ventas',
          },
        ]}
        putSuggestedEffectiveAnnualInterestRate={(suggestedEARate) =>
          putSuggestedEffectiveAnnualInterestRate(group.id, suggestedEARate)
        }
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        isReset={group.isReset}
        putIncrement={(incrementP) => {
          putIncrement(group.id, incrementP);
        }}
        salesIncrement={group.sales.increment}
      />
    </Widget>
  );
};

ProjectedIncrement.propTypes = {
  totalIncrement: PropTypes.number.isRequired,
  salesIncrement: PropTypes.number.isRequired,
  appliedIncrement: PropTypes.number.isRequired,
  onIncrementChange: PropTypes.func.isRequired,
  mini: PropTypes.bool,
  field: PropTypes.bool,
};

ProjectedIncrement.defaultProps = {
  mini: false,
  field: false,
};

const mapStateToProps = (state) => {
  const group = state.strategy.root.groups[state.strategy.root.selectedGroup];
  const { total, sales, inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    group,
    totalIncrement: total.increment,
    salesIncrement: sales.increment,
    appliedIncrement: inventory.appliedIncrement,
  };
};

const mapDispatchToProps = {
  onIncrementChange: changeIncrement,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectedIncrement);
