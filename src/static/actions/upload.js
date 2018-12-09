import {
  UPLOAD_PICTURE_REQUEST,
  UPLOAD_PICTURE_FAILURE,
  UPLOAD_PICTURE_SUCCESS,
} from '../constants';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';

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
