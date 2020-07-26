import * as actionTypes from "../actions/actionTypes";

import initialState from "./initialState";

export default function storeSaveReducer(
  state = initialState.saveStore,
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_STORE_SUCCESS:
      return action.payload;
    case actionTypes.UPDATE_STORE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
