export const SALES_SPEED_DIALOG_OPEN = 'SALES_SPEED_DIALOG_OPEN';
export const SALES_SPEED_DIALOG_CLOSE = 'SALES_SPEED_DIALOG_CLOSE';
export const SALES_SPEED_DIALOG_SET_DATA = 'SALES_SPEED_DIALOG_SET_DATA';

export const openSalesSpeedDialog = () => ({
  type: SALES_SPEED_DIALOG_OPEN,
});

export const closeSalesSpeedDialog = () => ({
  type: SALES_SPEED_DIALOG_CLOSE,
});

export const setSalesSpeedDialogData = (data) => ({
  type: SALES_SPEED_DIALOG_SET_DATA,
  payload: data,
});
