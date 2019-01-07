import {
  UPLOAD_PICTURE_REQUEST,
  UPLOAD_PICTURE_FAILURE,
  UPLOAD_PICTURE_SUCCESS,
  TEST_REQUEST,
  TEST_FAILURE,
  TEST_SUCCESS,
} from '../constants';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { setProfilePicture } from './auth';

export function UploadPictureRequest() {
  return {
    type: UPLOAD_PICTURE_REQUEST,
  };
}

export function uploadPictureSuccess() {
  return {
    type: UPLOAD_PICTURE_SUCCESS,
  };
}

export function uploadFailure() {
  return {
    type: UPLOAD_PICTURE_FAILURE,
  };
}

export function uploadPicture(picture, token) {
  return (dispatch) => {
    dispatch(UploadPictureRequest());
    const data = new FormData();
    data.append('image', picture);
    return fetch(SERVER_URL + '/api/v1/upload/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        Authorization: 'Token ' + token,
      },
      body: data,
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(setProfilePicture(response.image));
      })
      .catch((error) => {
        if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
          // Invalid authentication credentials
          return error.response.json().then((data) => {
            dispatch(uploadFailure());
          });
        } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
          // Server side error
          dispatch(uploadFailure());
        } else {
          // Most likely connection issues
          dispatch(uploadFailure());
        }
        return Promise.resolve();
      });
  };
}

export function testFailure() {
  return {
    type: TEST_FAILURE,
  };
}

export function testSuccess(response) {
  return {
    type: TEST_SUCCESS,
    payload: response,
  };
}

export function testRequest() {
  return {
    type: TEST_REQUEST,
  };
}


export function testLock(picture, lockId, token) {
  return (dispatch) => {
    dispatch(testRequest());
    const data = new FormData();
    data.append('picture', picture);
    return fetch(SERVER_URL + '/api/v1/open/' + lockId, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        Authorization: 'Token ' + token,
      },
      body: data,
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(testSuccess(response));
      })
      .catch((error) => {
        if (error && typeof error.response !== 'undefined') {
          dispatch(testFailure());
        }
        return Promise.resolve();
      });
  };
}

export function trainClassifier(token) {
  return (dispatch) => {
    return fetch(SERVER_URL + '/api/v1/train/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        Authorization: 'Token ' + token,
      },
    })
  };
}