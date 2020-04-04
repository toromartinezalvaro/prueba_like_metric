import { CHANGE_VIEW } from './actions';

export const MAIN_VIEW = 'main';
export const DETAILS_VIEW = 'details';

const initialState = {
  view: MAIN_VIEW,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_VIEW:
      return { ...state, view: payload };
    default:
      return state;
  }
};
