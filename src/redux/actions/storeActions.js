import * as actionTypes from "./actionTypes";
import * as parameters from "../../common/Parameters";

export function getStoreSuccess(store) {
  return {
    type: actionTypes.GET_STORES_SUCCESS,
    payload: store,
  };
}

export function createStoreSuccess(store) {
  return { type: actionTypes.CREATE_STORE_SUCCESS, payload: store };
}

export function updateStoreSuccess(store) {
  return { type: actionTypes.UPDATE_STORE_SUCCESS, payload: store };
}

export function deleteStoreSuccess(store) {
  return { type: actionTypes.DELETE_STORE_SUCCESS, payload: store };
}

export function saveStore(store) {
  return store.id ? updateStore(store) : createStore(store);
}

export function getStores() {
  return function (dispatch) {
    let url =
      parameters.API_SERVER_URL + "/stores?userId=" + actionTypes.USER.id;
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getStoreSuccess(result)));
  };
}

export function createStore(store) {
  store.userId = actionTypes.USER.id;

  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/stores";

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(store),
    })
      .then((response) => response.json())
      .then((result) => dispatch(createStoreSuccess(result)))
      .catch((err) => {
        throw err;
      });
  };
}

export function updateStore(store) {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/stores/" + store.id;

    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(store),
    })
      .then((response) => response.json())
      .then((result) => dispatch(updateStoreSuccess(result)))
      .catch((err) => {
        throw err;
      });
  };
}

export function deleteStore(storeId) {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/stores/" + storeId;

    return fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => dispatch(deleteStoreSuccess(storeId)));
  };
}
