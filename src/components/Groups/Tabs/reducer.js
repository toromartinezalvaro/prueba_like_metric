import {
  GROUPS_SET_GROUPS,
  GROUPS_SET_ITEMS,
  GROUPS_ADD_ONE_GROUP,
  GROUPS_ADD_ONE_ITEM,
  GROUPS_CHANGE_SELECTED_TAB,
  GROUPS_UPDATE_FIELD_TAB,
  GROUPS_DELETE_FIELD_TAB,
  GROUPS_UPDATE_FIELD_ITEM,
  GROUPS_DELETE_FIELD_ITEM,
  GROUPS_SET_COMPANY_ID,
  GROUPS_SET_COMPANIES_IDS,
} from './action';

const initialState = {
  groups: [],
  items: [],
  tabNumber: 0,
  companies: [],
  companyId: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GROUPS_SET_GROUPS:
      return { ...state, groups: payload };
    case GROUPS_SET_ITEMS:
      return { ...state, items: payload };
    case GROUPS_ADD_ONE_GROUP:
      return { ...state, groups: [...state.groups, payload] };
    case GROUPS_ADD_ONE_ITEM:
      return { ...state, items: [...state.items, payload] };
    case GROUPS_CHANGE_SELECTED_TAB:
      return { ...state, tabNumber: payload };
    case GROUPS_UPDATE_FIELD_TAB:
      return { ...state, groups: payload };
    case GROUPS_DELETE_FIELD_TAB:
      return { ...state, groups: payload };
    case GROUPS_UPDATE_FIELD_ITEM:
      return { ...state, items: payload };
    case GROUPS_DELETE_FIELD_ITEM:
      return { ...state, items: payload };
    case GROUPS_SET_COMPANY_ID:
      return { ...state, companyId: payload };
    case GROUPS_SET_COMPANIES_IDS:
      return { ...state, companies: payload };
    default:
      return state;
  }
};
