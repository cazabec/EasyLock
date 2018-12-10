import {
  GET_USERS_FAILURE,
  GET_USERS_SUCCESS,
} from '../constants';

const initialState = {
  list: [],
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        list: action.payload,
      });

    case GET_USERS_FAILURE:
      return Object.assign({}, state, {
        list: [],
      });

    default:
      return state;
  }
}

