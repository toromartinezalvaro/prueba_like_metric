export const OPEN_SALES_WIZARD_DIALOG = 'OPEN_SALES_WIZARD_DIALOG';
export const CLOSE_SALES_WIZARD_DIALOG = 'CLOSE_SALES_WIZARD_DIALOG';
export const CHANGE_SUGGESTED_INCREMENT = 'CHANGE_SUGGESTED_INCREMENT';
export const CALCULATED = 'CALCULATED';
export const NOT_CALCULATED = 'NOT_CALCULATED';

export const openSalesWizardDialog = () => ({
  type: OPEN_SALES_WIZARD_DIALOG,
});

export const closeSalesWizardDialog = () => ({
  type: CLOSE_SALES_WIZARD_DIALOG,
});

export const changeSuggestedIncrement = (increment) => ({
  type: CHANGE_SUGGESTED_INCREMENT,
  payload: increment,
});

export const setCalculated = () => ({
  type: CALCULATED,
});

export const setNotCalculated = () => ({
  type: NOT_CALCULATED,
});
