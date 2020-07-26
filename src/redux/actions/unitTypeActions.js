import * as actionTypes from "./actionTypes";
import * as parameters from "../../common/Parameters";

export function getUnitTypeSuccess(unitType) {
  return {
    type: actionTypes.GET_UNIT_TYPES_SUCCESS,
    payload: unitType,
  };
}

export function createUnitTypeSuccess(unitType) {
  return { type: actionTypes.CREATE_UNIT_TYPE_SUCCESS, payload: unitType };
}

export function updateUnitTypeSuccess(unitType) {
  return { type: actionTypes.UPDATE_UNIT_TYPE_SUCCESS, payload: unitType };
}

export function deleteUnitTypeSuccess(unitType) {
  return { type: actionTypes.DELETE_UNIT_TYPE_SUCCESS, payload: unitType };
}

export function saveUnitType(unitType) {
  return unitType.id ? updateUnitType(unitType) : createUnitType(unitType);
}

export function getUnitTypes() {
  return function (dispatch) {
    let url =
      parameters.API_SERVER_URL + "/unitTypes?userId=" + actionTypes.USER.id;
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getUnitTypeSuccess(result)));
  };
}

export function createUnitType(unitType) {
  unitType.userId = actionTypes.USER.id;

  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/unitTypes";

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unitType),
    })
      .then((response) => response.json())
      .then((result) => dispatch(createUnitTypeSuccess(result)))
      .catch((err) => {
        throw err;
      });
  };
}

export function updateUnitType(unitType) {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/unitTypes/" + unitType.id;

    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unitType),
    })
      .then((response) => response.json())
      .then((result) => dispatch(updateUnitTypeSuccess(result)))
      .catch((err) => {
        throw err;
      });
  };
}

export function deleteUnitType(unitTypeId) {
  return function (dispatch) {
    let url = parameters.API_SERVER_URL + "/unitTypes/" + unitTypeId;

    return fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => dispatch(deleteUnitTypeSuccess(unitTypeId)));
  };
}
