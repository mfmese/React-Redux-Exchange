import * as actionTypes from "./actionTypes";
import * as parameters from "../../common/Parameters";

export function getStockSuccess(stocks) {
  return { type: actionTypes.GET_STOCKS_SUCCESS, payload: stocks };
}

export function getStockOperationsSuccess(stockOperation) {
  return {
    type: actionTypes.GET_STOCK_OPERATION_SUCCESS,
    payload: stockOperation,
  };
}

export function createStockSuccess(stock) {
  return { type: actionTypes.CREATE_STOCK_SUCCESS, payload: stock };
}

export function updateStockSuccess(stock) {
  return { type: actionTypes.UPDATE_STOCK_SUCCESS, payload: stock };
}

export function deleteStockSuccess(stock) {
  return { type: actionTypes.DELETE_STOCK_SUCCESS, payload: stock };
}

export function saveStock(stock) {
  return stock.id ? updateStock(stock) : createStock(stock);
}

export function getStock() {
  return function (dispatch) {
    let url =
      parameters.API_SERVER_URL + "/stocks?userId=" + actionTypes.USER.id;
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getStockSuccess(result)));
  };
}

export function getStockOperations() {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/stockoperations";
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getStockOperationsSuccess(result)));
  };
}

export function createStock(stock) {
  stock.userId = actionTypes.USER.id;
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/stocks";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stock),
    })
      .then((response) => response.json())
      .then((result) => dispatch(createStockSuccess(result)))
      .catch((err) => {
        throw err;
      });
  };
}

export function updateStock(stock) {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/stocks/" + stock.id;

    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stock),
    })
      .then((response) => response.json())
      .then((result) => dispatch(updateStockSuccess(result)))
      .catch((err) => {
        throw err;
      });
  };
}

export function deleteStock(stockId) {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/stocks/" + stockId;

    return fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => dispatch(deleteStockSuccess(stockId)));
  };
}
