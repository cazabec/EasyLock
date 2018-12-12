import {
  UPLOAD_PICTURE_REQUEST,
  UPLOAD_PICTURE_FAILURE,
  UPLOAD_PICTURE_SUCCESS,
} from '../constants';

const initialState = {
  uploadPending: false,
  uploadDone: false,
};

export default function uploadReducer(state = initialState, action) {
    switch (action.type) {
        case UPLOAD_PICTURE_REQUEST:
            return Object.assign({}, state, {
                uploadPending: true,
            });

        case UPLOAD_PICTURE_SUCCESS:
            return Object.assign({}, state, {
                uploadPending: false,
                uploadDone: true,
            });
        case UPLOAD_PICTURE_FAILURE:
            return Object.assign({}, state, {
                uploadDone: false,
                uploadPending: false,
            });

        default:
            return state;
    }
}

