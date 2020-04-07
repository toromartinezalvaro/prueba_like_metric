import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import {
  changeStrategy,
  fetchDataSuccess,
} from '../../../../../../containers/StrategyV2/actions';
import StrategyServices from '../../../../../../services/strategy/StrategyService';
import IncrementServices from '../../../../../../services/increments/IncrementsServices';
import Increment2Services from '../../../../../../services/incrementsV2/incrementsService';
import ConfirmDialog from './ConfirmDialog';
import generateDataset from '../../../../../../containers/StrategyV2/helpers/dataset';

const services = {
  strategy: new StrategyServices(),
  increment: new IncrementServices(),
  increment2: new Increment2Services(),
};

const Strategies = ({
  strategy,
  onChangeStrategy,
  isReset,
  strategies,
  groupId,
  onFetchedData,
}) => {
  const { towerId } = useParams();
  const [
    selectStrategyConfirmationDialogOpen,
    setSelectStrategyConfirmationDialogOpen,
  ] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [
    resetStrategyConfirmationDialogOpen,
    setResetStrategyConfirmationDialogOpen,
  ] = useState(false);

  const changeStrategyHandler = (id) => {
    onChangeStrategy(Number(id));
    const lineSelected = strategies.find((s) => s.id === Number(id));
    services.strategy.putStrategy({
      id: groupId,
      strategy: Number(id),
      incrementList: lineSelected.percentage,
      arrayIncrementList: [],
    });
  };

  const resetStrategyHandler = async () => {
    await services.increment.resetStrategy(groupId);
    const response = await services.increment2.getIncrementsAndStrategy(
      towerId,
    );
    onFetchedData({
      strategyLines: generateDataset(response.data.increments),
      groups: response.data.summary.increments,
    });
    onChangeStrategy(null);
  };

  const confirmStrategySelection = () => {
    changeStrategyHandler(selectedStrategy);
  };

  return (
    <>
      <Paper>
        <Box p={3}>
          <Box mb={2}>
            <Typography variant="h5">Estrategias</Typography>
          </Box>
          <Box mb={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Seleccione una estrategia:
              </FormLabel>
              <RadioGroup
                row
                aria-label="estrategia"
                value={isReset ? null : strategy}
                onChange={(event) => {
                  setSelectedStrategy(event.target.value);
                  setSelectStrategyConfirmationDialogOpen(true);
                }}
              >
                <FormControlLabel
                  value={1}
                  disabled={!(strategies && strategies.length >= 2) || !isReset}
                  control={<Radio />}
                  label="Continua"
                />
                <FormControlLabel
                  value={3}
                  disabled={!(strategies && strategies.length >= 3) || !isReset}
                  control={<Radio />}
                  label="Semi-continua"
                />
                <FormControlLabel
                  value={9}
                  disabled={!(strategies && strategies.length >= 4) || !isReset}
                  control={<Radio />}
                  label="Semi-escalonada"
                />
                <FormControlLabel
                  value={18}
                  disabled={!(strategies && strategies.length >= 5) || !isReset}
                  control={<Radio />}
                  label="Escalonada"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              setResetStrategyConfirmationDialogOpen(true);
            }}
            fullWidth
            disabled={isReset}
          >
            Reiniciar estrategia
          </Button>
        </Box>
      </Paper>
      <ConfirmDialog
        open={selectStrategyConfirmationDialogOpen}
        title="Seleccionar estrategia"
        content="¿Esta seguro de que desea selecionar esa estrategia?"
        handleAccept={() => {
          confirmStrategySelection();
          setSelectStrategyConfirmationDialogOpen(false);
        }}
        handleClose={() => {
          setSelectStrategyConfirmationDialogOpen(false);
        }}
      />
      <ConfirmDialog
        open={resetStrategyConfirmationDialogOpen}
        title="Reinciar estrategia"
        content="¿Esta seguro de que desea reiniciar la estrategia?"
        handleAccept={() => {
          resetStrategyHandler();
          setResetStrategyConfirmationDialogOpen(false);
        }}
        handleClose={() => {
          setResetStrategyConfirmationDialogOpen(false);
        }}
      />
    </>
  );
};

Strategies.propTypes = {
  strategies: PropTypes.array.isRequired,
  isReset: PropTypes.bool.isRequired,
  strategy: PropTypes.number.isRequired,
  onChangeStrategy: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired,
  onFetchedData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const group =
    state.strategy.root.strategyLines[state.strategy.root.selectedGroup];
  const { strategy, isReset } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];

  return {
    strategy,
    isReset,
    strategies: group ? group.strategies : null,
    groupId: group ? group.id : null,
  };
};

const mapDispatchToProps = {
  onChangeStrategy: changeStrategy,
  onFetchedData: fetchDataSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Strategies);
