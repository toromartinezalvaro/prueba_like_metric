export const UPLOAD_DIALOG_OPEN = 'UPLOAD_DIALOG_OPEN';

export const UPLOAD_DIALOG_CLOSE = 'UPLOAD_DIALOG_CLOSE';

export const openDialog = () => ({
  type: UPLOAD_DIALOG_OPEN,
});

export const closeDialog = () => ({
  type: UPLOAD_DIALOG_CLOSE,
});
