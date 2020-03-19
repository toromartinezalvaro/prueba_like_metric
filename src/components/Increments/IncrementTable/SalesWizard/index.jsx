import React from 'react';
import NumberFormat from 'react-number-format';
import {
  DialogContent,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import Styles from './styles.module.scss';

const SalesWizard = ({
  putSuggestedEffectiveAnnualInterestRate,
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
          <div>{data.inventory.retentionMonths}</div>
          <div className={Styles.definition}>Tasas Incremento e.a</div>
          <div></div>
          <div></div>
          <div>
            <Input
              mask="percentage"
              validations={[]}
              value={(
                data.inventory.suggestedEffectiveAnnualInterestRate * 100
              ).toFixed(2)}
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
              value={data.inventory.suggestedIncrement.toFixed(2)}
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
            console.log(
              data.inventory.suggestedIncrement,
              salesIncrement,
              Number(data.inventory.suggestedIncrement) + salesIncrement,
            );
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
