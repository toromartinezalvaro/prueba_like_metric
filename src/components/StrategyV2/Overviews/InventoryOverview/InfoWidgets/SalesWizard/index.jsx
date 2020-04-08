import React from 'react';
import NumberFormat from 'react-number-format';
import {
  DialogContent,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
import Button from '../../../../../UI/Button/Button';
import Input from '../../../../../UI/Input/Input';
import Styles from './styles.module.scss';
import Numbers from '../../../../../../helpers/numbers';

const SalesWizard = ({
  putSuggestedEffectiveAnnualInterestRate,
  suggestedEffectiveAnnualInterestRate,
  data,
  setModalOpen,
  isModalOpen,
  isReset,
  putIncrement,
  salesIncrement,
}) => {
  return (
    <Dialog open={isModalOpen}>
      <DialogTitle>
        <div>
          <span>{`Ayuda ventas`}</span>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className={Styles.container}>
          <div className={Styles.definition}>Meses Retención de Inventario</div>
          <div></div>
          <div></div>
          <div>{data.initialFee}</div>
          <div className={Styles.definition}>Tasas Incremento e.a</div>
          <div></div>
          <div></div>
          <div>
            <Input
              mask="percentage"
              validations={[]}
              value={suggestedEffectiveAnnualInterestRate * 100}
              onChange={(target) => {
                putSuggestedEffectiveAnnualInterestRate(
                  parseFloat(target.value / 100),
                );
              }}
            />
          </div>
          <div className={Styles.definition}>Incremento Pesos (Meta)</div>
          <div></div>
          <div></div>
          <div>
            <NumberFormat
              value={Numbers.toFixed(data.inventory.suggestedIncrement)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setModalOpen(false)}
          className={Styles.CancelButton}
        >
          Cerrar
        </Button>

        <Button
          onClick={() => {
            putIncrement(
              Number(data.inventory.suggestedIncrement) + salesIncrement,
            );
            setModalOpen(false);
          }}
          className={Styles.ConfirmButton}
          isDisabled={!isReset}
        >
          Aplicar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SalesWizard;
