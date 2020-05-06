import { combineReducers } from 'redux';
import {
  GROUPS_FETCH_API_START,
  GROUPS_FETCH_API_SUCCESS,
  GROUPS_FETCH_API_FAIL,
} from './actions';

import { reducer as createGroupDialogReducer } from '../../components/Groups/Tabs/CreateGroupDialog';
import { reducer as createItemDialogReducer } from '../../components/Groups/Tabs/CreateItemDialog';
import { reducer as groupTabsReducer } from '../../components/Groups/Tabs';
import { reducer as groupTabPanelReducer } from '../../components/Groups/Tabs/TabPanel';
import { reducer as groupItemPanelReducer } from '../../components/Groups/Tabs/ItemPanel';
import { reducer as groupCantDeleteReducer } from '../../components/Groups/Tabs/ItemPanel/CantDeleteDialog';

const initialState = {
  loading: false,
  error: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GROUPS_FETCH_API_START:
      return { ...state, loading: true };
    case GROUPS_FETCH_API_SUCCESS:
      return { ...state, loading: false, error: false };
    case GROUPS_FETCH_API_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default combineReducers({
  root: reducer,
  createGroupDialog: createGroupDialogReducer,
  createItemDialog: createItemDialogReducer,
  groupTabs: groupTabsReducer,
  groupTabPanel: groupTabPanelReducer,
  groupItemPanel: groupItemPanelReducer,
  groupCantDelete: groupCantDeleteReducer,
});
