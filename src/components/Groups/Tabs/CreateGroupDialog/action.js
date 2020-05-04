export const GROUPS_OPEN_CREATE_GROUP_DIALOG =
  'GROUPS_OPEN_CREATE_GROUP_DIALOG';

export const GROUPS_CLOSE_CREATE_GROUP_DIALOG =
  'GROUPS_CLOSE_CREATE_GROUP_DIALOG';

export const GROUP_CREATE_DIALOG_API_START = 'GROUP_CREATE_DIALOG_API_START';

export const GROUP_CREATE_DIALOG_API_FAIL = 'GROUP_CREATE_DIALOG_API_FAIL';

export const openCreateDialog = () => ({
  type: GROUPS_OPEN_CREATE_GROUP_DIALOG,
});

export const closeCreateDialog = () => ({
  type: GROUPS_CLOSE_CREATE_GROUP_DIALOG,
});

export const apiStart = () => ({
  type: GROUP_CREATE_DIALOG_API_START,
});

export const apiFail = () => ({
  type: GROUP_CREATE_DIALOG_API_FAIL,
});
