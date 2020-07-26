import * as actionTypes from "../actions/actionTypes";

import initialState from "./initialState";

export default function stockSaveReducer(
  state = initialState.saveStock,
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_STOCK_SUCCESS:
      return action.payload;
    case actionTypes.UPDATE_STOCK_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
