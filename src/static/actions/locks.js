import {
  GET_LOCKS_REQUEST,
  GET_LOCKS_FAILURE,
  GET_LOCKS_SUCCESS,

  GET_RIGHTS_REQUEST,
  GET_RIGHTS_FAILURE,
  GET_RIGHTS_SUCCESS,

  CREATE_LOCK_REQUEST,
  CREATE_LOCK_FAILURE,
  CREATE_LOCK_SUCCESS,

  INVITE_REQUEST,
  INVITE_FAILURE,
  INVITE_SUCCESS,

} from '../constants';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { push } from 'react-router-redux';

export function getLocksRequest() {
  return {
    type: GET_LOCKS_REQUEST,
  };
}

export function getLocksSuccess(response) {
  return {
    type: GET_LOCKS_SUCCESS,
    payload: response.results,
  };
}

export function getLocksFailure() {
  return {
    type: GET_LOCKS_FAILURE,
  };
}

export function getLocks(token) {
  return (dispatch) => {
    dispatch(getLocksRequest());
    return fetch(SERVER_URL + '/api/v1/lock/', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: 'Token ' + token,
      },
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(getLocksSuccess(response));
      })
      .catch((error) => {
        dispatch(getLocksFailure());
        return Promise.resolve();
      });
  };
}

export function getRightsRequest() {
  return {
    type: GET_RIGHTS_REQUEST,
  };
}

export function getRightsSuccess(response) {
  return {
    type: GET_RIGHTS_SUCCESS,
    payload: response.results,
  };
}

export function getRightsFailure() {
  return {
    type: GET_RIGHTS_FAILURE,
  };
}

export function getRights(token) {
  return (dispatch) => {
    dispatch(getRightsRequest());
    return fetch(SERVER_URL + '/api/v1/rights/', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: 'Token ' + token,
      },
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(getRightsSuccess(response));
      })
      .catch((error) => {
        dispatch(getRightsFailure());
        return Promise.resolve();
      });
  };
}

export function createLockRequest() {
  return {
    type: CREATE_LOCK_REQUEST,
  };
}

export function createLockSuccess(response) {
  return {
    type: CREATE_LOCK_SUCCESS,
    payload: response.results,
  };
}

export function createLockFailure() {
  return {
    type: CREATE_LOCK_FAILURE,
  };
}

export function createLock(name, description, token) {
  return (dispatch) => {
    dispatch(createLockRequest());
    return fetch(SERVER_URL + '/api/v1/lock/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
      },
      body: JSON.stringify({name: name, description: description})
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(createLockSuccess(response));
        dispatch(push('/locks'));
      })
      .catch((error) => {
        dispatch(createLockFailure());
        return Promise.resolve();
      });
  };
}

export function inviteRequest() {
  return {
    type: INVITE_REQUEST,
  };
}

export function inviteSuccess(response) {
  return {
    type: INVITE_SUCCESS,
    payload: response.results,
  };
}

export function inviteFailure() {
  return {
    type: INVITE_FAILURE,
  };
}

export function invite(user, lock, expiration, token) {
  return (dispatch) => {
    dispatch(inviteRequest());
    return fetch(SERVER_URL + '/api/v1/rights/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
      },
      body: JSON.stringify({
        right: 'GUEST',
        expiration: expiration,
        user: user,
        lock: lock,
      }),
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(inviteSuccess(response));
        dispatch(push('/lock/' + lock));
      })
      .catch((error) => {
        dispatch(inviteFailure());
        return Promise.resolve();
      });
  };
}
