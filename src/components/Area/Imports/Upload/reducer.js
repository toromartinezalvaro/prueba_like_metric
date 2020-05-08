import {
  UPLOAD_DIALOG_CLOSE,
  UPLOAD_DIALOG_OPEN,
  UPLOAD_DIALOG_SELECT_FILE,
  UPLOAD_DIALOG_API_FETCH_START,
  UPLOAD_DIALOG_API_FETCH_END,
} from './actions';

const initialState = {
  open: false,
  file: null,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPLOAD_DIALOG_OPEN:
      return { ...state, open: true };
    case UPLOAD_DIALOG_CLOSE:
      return { ...state, open: false };
    case UPLOAD_DIALOG_SELECT_FILE:
      return { ...state, file: payload };
    case UPLOAD_DIALOG_API_FETCH_START:
      return { ...state, loading: true };
    case UPLOAD_DIALOG_API_FETCH_END:
      return { ...state, loading: false };
    default:
      return state;
  }
};
