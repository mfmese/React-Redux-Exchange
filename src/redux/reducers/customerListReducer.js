import * as actionTypes from "../actions/actionTypes";

import initialState from "./initialState";

export default function customerListReducer(
  state = initialState.customers,
  action
) {
  switch (action.type) {
    case actionTypes.GET_CUSTOMERS_SUCCESS:
      return action.payload;
    case actionTypes.DELETE_CUSTOMER_SUCCESS:
      return state.filter((customer) => customer.id !== action.payload);
    default:
      return state;
  }
}
