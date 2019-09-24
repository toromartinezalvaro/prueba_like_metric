import React from 'react';
import NumberFormat from 'react-number-format';
import Accordion from '../../../UI/Accordion/Accordion';
import Input from '../../../UI/Input/Input';
import Styles from './styles.module.scss';

const SalesWizard = ({ putSuggestedEffectiveAnnualInterestRate, data }) => {
  return (
    <Accordion trigger={<div className={Styles.title}>Ayuda Ventas</div>}>
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
              putSuggestedEffectiveAnnualInterestRate(target.value / 100);
            }}
          />
        </div>
        <div className={Styles.definition}>Incremento Pesos (Meta)</div>
        <div>
          
        </div>
        <div>
         
        </div>
        <div>
          <NumberFormat
            value={data.inventory.suggestedIncrement.toFixed(2)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </div>
      </div>
    </Accordion>
  );
};

export default SalesWizard;
