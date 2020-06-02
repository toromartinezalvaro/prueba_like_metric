export const FINANCIAL_DIALOG_OPEN = 'FINANCIAL_DIALOG_OPEN';
export const FINANCIAL_DIALOG_CLOSE = 'FINANCIAL_DIALOG_CLOSE';
export const FINANCIAL_DIALOG_SET_DATA = 'FINANCIAL_DIALOG_SET_DATA';

export const openFinancialDialog = () => ({
  type: FINANCIAL_DIALOG_OPEN,
});

export const closeFinancialDialog = () => ({
  type: FINANCIAL_DIALOG_CLOSE,
});

export const setFinancialDialogData = (data) => ({
  type: FINANCIAL_DIALOG_SET_DATA,
  payload: data,
});
