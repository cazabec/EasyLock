import {
  UPLOAD_PICTURE_REQUEST,
  UPLOAD_PICTURE_FAILURE,
  UPLOAD_PICTURE_SUCCESS,
} from '../constants';

const initialState = {
  uploadPending: false,
};

export default function uploadReducer(state = initialState, action) {
    switch (action.type) {
        case UPLOAD_PICTURE_REQUEST:
            return Object.assign({}, state, {
                uploadPending: true,
            });

        case UPLOAD_PICTURE_SUCCESS:
        case UPLOAD_PICTURE_FAILURE:
            return Object.assign({}, state, {
                uploadPending: false,
            });

        default:
            return state;
    }
}

