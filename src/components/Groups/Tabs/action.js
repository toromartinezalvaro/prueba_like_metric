export const GROUPS_SET_GROUPS = 'GROUPS_SET_GROUPS';
export const GROUPS_SET_ITEMS = 'GROUPS_SET_ITEMS';
export const GROUPS_ADD_ONE_GROUP = 'GROUPS_ADD_ONE_GROUP';
export const GROUPS_ADD_ONE_ITEM = 'GROUPS_ADD_ONE_ITEM';
export const GROUPS_CHANGE_SELECTED_TAB = 'GROUPS_CHANGE_SELECTED_TAB';
export const GROUPS_UPDATE_FIELD_TAB = 'GROUPS_UPDATE_FIELD_TAB';
export const GROUPS_DELETE_FIELD_TAB = 'GROUPS_DELETE_FIELD_TAB';
export const GROUPS_UPDATE_FIELD_ITEM = 'GROUPS_UPDATE_FIELD_ITEM';
export const GROUPS_DELETE_FIELD_ITEM = '  GROUPS_DELETE_FIELD_ITEM';
export const GROUPS_SET_COMPANY_ID = 'GROUPS_SET_COMPANY_ID';
export const GROUPS_SET_COMPANIES_IDS = 'GROUPS_SET_COMPANIES_IDS';
export const GROUPS_SET_EXPANDED_GROUP = 'GROUPS_SET_EXPANDED_GROUP';

export const setGroups = (groups) => ({
  type: GROUPS_SET_GROUPS,
  payload: groups,
});

export const setItems = (items) => ({
  type: GROUPS_SET_ITEMS,
  payload: items,
});

export const addOneGroup = (group) => ({
  type: GROUPS_ADD_ONE_GROUP,
  payload: group,
});
export const addOneItem = (item) => ({
  type: GROUPS_ADD_ONE_ITEM,
  payload: item,
});

export const changeSelectedTab = (tabNumber) => ({
  type: GROUPS_CHANGE_SELECTED_TAB,
  payload: tabNumber,
});

export const updateFieldTab = (groupsUpdated) => ({
  type: GROUPS_UPDATE_FIELD_TAB,
  payload: groupsUpdated,
});

export const deleteFieldTab = (groupsUpdated) => ({
  type: GROUPS_DELETE_FIELD_TAB,
  payload: groupsUpdated,
});

export const updateFieldItem = (itemsUpdated) => ({
  type: GROUPS_UPDATE_FIELD_ITEM,
  payload: itemsUpdated,
});

export const deleteFieldItem = (itemsUpdated) => ({
  type: GROUPS_DELETE_FIELD_ITEM,
  payload: itemsUpdated,
});

export const setCompanyId = (companyId) => ({
  type: GROUPS_SET_COMPANY_ID,
  payload: companyId,
});

export const setCompanies = (companies) => ({
  type: GROUPS_SET_COMPANIES_IDS,
  payload: companies,
});

export const setGroupExpanded = (groupId) => ({
  type: GROUPS_SET_EXPANDED_GROUP,
  payload: groupId,
});