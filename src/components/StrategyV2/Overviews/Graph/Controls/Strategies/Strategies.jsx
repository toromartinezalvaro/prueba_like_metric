import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import {
  changeStrategy,
  fetchDataSuccess,
} from '../../../../../../containers/StrategyV2/actions';
import { startLoading, stopLoading } from '../../../../Loader/actions';
import StrategyServices from '../../../../../../services/strategy/StrategyService';
import IncrementServices from '../../../../../../services/increments/IncrementsServices';
import Increment2Services from '../../../../../../services/incrementsV2/incrementsService';
import ConfirmDialog from './ConfirmDialog';
import generateDataset from '../../../../../../containers/StrategyV2/helpers/dataset';
import Styles from './Strategies.module.scss';

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
  startApiLoading,
  stopApiLoading,
  rows,
}) => {
  const { towerId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [
    selectStrategyConfirmationDialogOpen,
    setSelectStrategyConfirmationDialogOpen,
  ] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [
    resetStrategyConfirmationDialogOpen,
    setResetStrategyConfirmationDialogOpen,
  ] = useState(false);

  const changeStrategyHandler = async (id) => {
    try {
      startApiLoading();
      const lineSelected = strategies.find((s) => s.id === Number(id));
      const arrayIncrementList = strategies.slice(1).map((s) => s.percentage);
      await services.increment2.putStrategy({
        id: groupId,
        strategy: Number(id),
        incrementList: lineSelected.percentage,
        arrayIncrementList,
      });
      const response = await services.increment2.getIncrementsAndStrategy(
        towerId,
      );
      onFetchedData({
        strategyLines: generateDataset(response.data.increments),
        groups: response.data.summary.increments,
      });
      onChangeStrategy(Number(id));
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
    stopApiLoading();
  };

  const resetStrategyHandler = async () => {
    try {
      startApiLoading();
      await services.increment2.resetStrategy(groupId);
      const response = await services.increment2.getIncrementsAndStrategy(
        towerId,
      );
      onFetchedData({
        strategyLines: generateDataset(response.data.increments),
        groups: response.data.summary.increments,
      });
      onChangeStrategy(null);
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
    stopApiLoading();
  };

  const confirmStrategySelection = () => {
    changeStrategyHandler(selectedStrategy);
  };

  return (
    <>
      <Paper>
        <Box p={3}>
          <Typography variant="h5">Estrategias</Typography>
        </Box>
        <RadioGroup
          row
          aria-label="estrategia"
          value={isReset ? null : strategy}
          onChange={(event) => {
            setSelectedStrategy(event.target.value);
            setSelectStrategyConfirmationDialogOpen(true);
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell>Estrategia</TableCell>
                  <TableCell>Tasa e.a</TableCell>
                  <TableCell>Frecuencia Inc</TableCell>
                  <TableCell>Tasa Fr</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={`strategy-${index}`}>
                    <TableCell classes={{ root: Styles.radioButtonCell }}>
                      <FormControlLabel
                        value={row.frequency}
                        control={<Radio />}
                      />
                    </TableCell>
                    <TableCell>{row.strategy}</TableCell>
                    <TableCell>{row.AER}</TableCell>
                    <TableCell>{row.frequency}</TableCell>
                    <TableCell>{row.frequencyRate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </RadioGroup>
        <Box p={3}>
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
  startApiLoading: PropTypes.func.isRequired,
  stopApiLoading: PropTypes.func.isRequired,
  rows: PropTypes.array,
};

const mapStrategyForSelector = (strategy) => {
  if (!strategy.id) return [];
  return {
    strategy: strategy.label[0],
    AER: `${Number(strategy.EARate * 100).toFixed(2)}%`,
    frequency: strategy.id,
    frequencyRate: `${Number(strategy.percentage * 100).toFixed(2)}%`,
  };
};

const mapStateToProps = (state) => {
  const group =
    state.strategy.root.strategyLines[state.strategy.root.selectedGroup];
  const { strategy, isReset } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  const strategies = group ? group.strategies : null;
  const rows = strategies.flatMap(mapStrategyForSelector);

  return {
    strategy,
    isReset,
    strategies,
    groupId: group ? group.id : null,
    rows,
  };
};

const mapDispatchToProps = {
  onChangeStrategy: changeStrategy,
  onFetchedData: fetchDataSuccess,
  startApiLoading: startLoading,
  stopApiLoading: stopLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Strategies);
