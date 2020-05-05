export const GROUPS_OPEN_CANT_DELETE_DIALOG = 'GROUPS_OPEN_CANT_DELETE_DIALOG';
export const GROUPS_CLOSE_CANT_DELETE_DIALOG =
  'GROUPS_CLOSE_CANT_DELETE_DIALOG';

export const setOpen = (option) => ({
  type: GROUPS_OPEN_CANT_DELETE_DIALOG,
  payload: option,
});

export const setClose = () => ({
  type: GROUPS_CLOSE_CANT_DELETE_DIALOG,
});
