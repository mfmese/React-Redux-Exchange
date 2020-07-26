import * as actionTypes from "../actions/actionTypes";

import initialState from "./initialState";

export default function stockOperationListReducer(
  state = initialState.stockOperations,
  action
) {
  switch (action.type) {
    case actionTypes.GET_STOCK_OPERATION_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
