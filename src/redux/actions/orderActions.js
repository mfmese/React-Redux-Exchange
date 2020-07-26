import * as actionTypes from "./actionTypes";
import * as parameters from "../../common/Parameters";

export function getOrdersSuccess(orders) {
  return { type: actionTypes.GET_ORDERS_SUCCESS, payload: orders };
}

export function createOrderSuccess(order) {
  return { type: actionTypes.CREATE_ORDER_SUCCESS, payload: order };
}

export function updateOrderSuccess(order) {
  return { type: actionTypes.UPDATE_ORDER_SUCCESS, payload: order };
}

export function deleteOrderSuccess(order) {
  return { type: actionTypes.DELETE_ORDER_SUCCESS, payload: order };
}

export function saveOrder(order) {
  return order.id ? updateOrder(order) : createOrder(order);
}

export function getOrderTypesSuccess(orderTypes) {
  return { type: actionTypes.GET_ORDER_TYPES_SUCCESS, payload: orderTypes };
}

export function getOrders() {
  return function (dispatch) {
    let url =
      parameters.API_SERVER_URL + "/orders?userId=" + actionTypes.USER.id;

    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getOrdersSuccess(result)));
  };
}

export function getOrderTypes() {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/orderTypes";

    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getOrderTypesSuccess(result)));
  };
}

export function createOrder(order) {
  order.userId = actionTypes.USER.id;

  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/orders";

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((result) => dispatch(createOrderSuccess(result)))
      .catch((err) => {
        throw err;
      });
  };
}

export function updateOrder(order) {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/orders/" + order.id;

    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((result) => dispatch(updateOrderSuccess(result)))
      .catch((err) => {
        throw err;
      });
  };
}

export function deleteOrder(orderId) {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/orders/" + orderId;

    return fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => dispatch(deleteOrderSuccess(orderId)));
  };
}
