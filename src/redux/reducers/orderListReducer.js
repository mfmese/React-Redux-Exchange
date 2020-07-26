import * as actionTypes from "../actions/actionTypes";

import initialState from "./initialState";

export default function orderListReducer(state = initialState.orders, action) {
  switch (action.type) {
    case actionTypes.GET_ORDERS_SUCCESS:
      return action.payload;
    case actionTypes.DELETE_ORDER_SUCCESS:
      return state.filter((order) => order.id !== action.payload);
    default:
      return state;
  }
}
