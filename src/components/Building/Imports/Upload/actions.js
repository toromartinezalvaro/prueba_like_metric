export const UPLOAD_DIALOG_OPEN = 'BUILDING_UPLOAD_DIALOG_OPEN';
export const UPLOAD_DIALOG_CLOSE = 'BUILDING_UPLOAD_DIALOG_CLOSE';
export const UPLOAD_DIALOG_SELECT_FILE = 'BUILDING_UPLOAD_DIALOG_SELECT_FILE';
export const UPLOAD_DIALOG_API_FETCH_START = 'BUILDING_UPLOAD_DIALOG_API_FETCH_START';
export const UPLOAD_DIALOG_API_FETCH_END = 'BUILDING_UPLOAD_DIALOG_API_FETCH_END';

export const openDialog = () => ({
  type: UPLOAD_DIALOG_OPEN,
});

export const closeDialog = () => ({
  type: UPLOAD_DIALOG_CLOSE,
});

export const changeFile = (file) => ({
  type: UPLOAD_DIALOG_SELECT_FILE,
  payload: file,
});

export const startApiFetch = () => ({
  type: UPLOAD_DIALOG_API_FETCH_START,
});

export const stopApiFetch = () => ({
  type: UPLOAD_DIALOG_API_FETCH_END,
});
