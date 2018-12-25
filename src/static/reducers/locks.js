import {
  GET_LOCKS_FAILURE,
  GET_LOCKS_SUCCESS,
  GET_RIGHTS_FAILURE,
  GET_RIGHTS_SUCCESS,

} from '../constants';

const initialState = {
  list: [],
  rights: [],
};

export default function locksReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LOCKS_SUCCESS:
            return Object.assign({}, state, {
                list: action.payload,
            });

        case GET_RIGHTS_SUCCESS:
            return Object.assign({}, state, {
                rights: action.payload,
            });


        case GET_LOCKS_FAILURE:
            return Object.assign({}, state, {
                list: [],
            });

        case GET_RIGHTS_FAILURE:
            return Object.assign({}, state, {
                rights: [],
            });


        default:
            return state;
    }
}

