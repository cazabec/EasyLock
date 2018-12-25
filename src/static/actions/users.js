import {
  GET_USERS_REQUEST,
  GET_USERS_FAILURE,
  GET_USERS_SUCCESS,
} from '../constants';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';

export function getUsersRequest() {
  return {
    type: GET_USERS_REQUEST,
  };
}

export function getUsersSuccess(response) {
  return {
    type: GET_USERS_SUCCESS,
    payload: response.results,
  };
}

export function getUsersFailure() {
  return {
    type: GET_USERS_FAILURE,
  };
}

export function getUsers(token) {
  return (dispatch) => {
    dispatch(getUsersRequest());
    return fetch(SERVER_URL + '/api/v1/accounts/', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: 'Token ' + token,
      },
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(getUsersSuccess(response));
      })
      .catch((error) => {
        dispatch(getUsersFailure());
        return Promise.resolve();
      });
  };
}
