export const UPLOAD_GROUP_DIALOG_OPEN = 'UPLOAD_GROUP_DIALOG_OPEN';
export const UPLOAD_GROUP_DIALOG_CLOSE = 'UPLOAD_GROUP_DIALOG_CLOSE';
export const UPLOAD_GROUP_DIALOG_SELECT_FILE = 'UPLOAD_GROUP_DIALOG_SELECT_FILE';
export const UPLOAD_GROUP_DIALOG_API_FETCH_START = 'UPLOAD_GROUP_DIALOG_API_FETCH_START';
export const UPLOAD_GROUP_DIALOG_API_FETCH_END = 'UPLOAD_GROUP_DIALOG_API_FETCH_END';

export const openDialog = () => ({
  type: UPLOAD_GROUP_DIALOG_OPEN,
});

export const closeDialog = () => ({
  type: UPLOAD_GROUP_DIALOG_CLOSE,
});

export const changeFile = (file) => ({
  type: UPLOAD_GROUP_DIALOG_SELECT_FILE,
  payload: file,
});

export const startApiFetch = () => ({
  type: UPLOAD_GROUP_DIALOG_API_FETCH_START,
});

export const stopApiFetch = () => ({
  type: UPLOAD_GROUP_DIALOG_API_FETCH_END,
});
