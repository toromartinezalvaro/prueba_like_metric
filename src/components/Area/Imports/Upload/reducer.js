import { UPLOAD_DIALOG_CLOSE, UPLOAD_DIALOG_OPEN } from './actions';

const initialState = {
  open: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case UPLOAD_DIALOG_OPEN:
      return { ...state, open: true };
    case UPLOAD_DIALOG_CLOSE:
      return { ...state, open: false };
    default:
      return state;
  }
};
