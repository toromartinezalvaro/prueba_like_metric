export const FINANCIAL_BANK_DIALOG_OPEN = 'FINANCIAL_BANK_DIALOG_OPEN';
export const FINANCIAL_BANK_DIALOG_CLOSE = 'FINANCIAL_BANK_DIALOG_CLOSE';
export const SET_FINANCIAL_BANK_DIALOG_INFO = 'SET_FINANCIAL_BANK_DIALOG_INFO';

export const openFinancialBankDialog = () => ({
  type: FINANCIAL_BANK_DIALOG_OPEN,
});

export const closeFinancialBankDialog = () => ({
  type: FINANCIAL_BANK_DIALOG_CLOSE,
});

export const setFinancialBankDialogInfo = (info) => ({
  type: SET_FINANCIAL_BANK_DIALOG_INFO,
  payload: info,
});
