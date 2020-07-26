import * as actionTypes from "./actionTypes";
import * as parameters from "../../common/Parameters";

export function getCustomersSuccess(customers) {
  return { type: actionTypes.GET_CUSTOMERS_SUCCESS, payload: customers };
}

export function createCustomerSuccess(customer) {
  return { type: actionTypes.CREATE_CUSTOMER_SUCCESS, payload: customer };
}

export function updateCustomerSuccess(customer) {
  return { type: actionTypes.UPDATE_CUSTOMER_SUCCESS, payload: customer };
}

export function deleteCustomerSuccess(customer) {
  return { type: actionTypes.DELETE_CUSTOMER_SUCCESS, payload: customer };
}

export function saveCustomer(customer) {
  return customer.id ? updateCustomer(customer) : createCustomer(customer);
}

export function getCustomers() {
  return function (dispatch) {
    let url =
      parameters.API_SERVER_URL + "/customers?userId=" + actionTypes.USER.id;
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getCustomersSuccess(result)));
  };
}

export function createCustomer(customer) {
  customer.userId = actionTypes.USER.id;

  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/customers";

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => response.json())
      .then((result) => dispatch(createCustomerSuccess(result)))
      .catch((err) => {
        throw err;
      });
  };
}

export function updateCustomer(customer) {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/customers/" + customer.id;

    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => response.json())
      .then((result) => dispatch(updateCustomerSuccess(result)))
      .catch((err) => {
        throw err;
      });
  };
}

export function deleteCustomer(customerId) {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/customers/" + customerId;

    return fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => dispatch(deleteCustomerSuccess(customerId)));
  };
}
