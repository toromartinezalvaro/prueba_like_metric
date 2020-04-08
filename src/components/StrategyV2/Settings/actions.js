export const TOGGLE_SETTING__SHOW_NO_INCREMENT =
  'TOGGLE_SETTING__SHOW_NO_INCREMENT';
export const CHANGE_GROUP = 'CHANGE_GROUP';

export const toggleShowNoIncrement = () => ({
  type: TOGGLE_SETTING__SHOW_NO_INCREMENT,
});
export const changeGroup = (group) => ({
  type: CHANGE_GROUP,
  payload: group,
});
