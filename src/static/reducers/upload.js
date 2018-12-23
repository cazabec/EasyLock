import {
  UPLOAD_PICTURE_REQUEST,
  UPLOAD_PICTURE_FAILURE,
  UPLOAD_PICTURE_SUCCESS,
  TEST_REQUEST,
  TEST_FAILURE,
  TEST_SUCCESS,
} from '../constants';

const initialState = {
  uploadPending: false,
  uploadDone: false,
  test: {
    user_id: null,
    similarity: null,
  },
};

export default function uploadReducer(state = initialState, action) {
    switch (action.type) {
        case UPLOAD_PICTURE_REQUEST:
        case TEST_REQUEST:
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
        case TEST_SUCCESS:
          return Object.assign({}, state, {
                uploadPending: false,
                test: action.payload,
            });
        case TEST_FAILURE:
          return Object.assign({}, state, {
                uploadPending: false,
            });
        default:
            return state;
    }
}

