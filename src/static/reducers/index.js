import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import uploadReducer from './upload';
import locksReducer from './locks';
import usersReducer from './users';


const appReducer = combineReducers({
  /* your app’s top-level reducers */
  auth: authReducer,
  data: dataReducer,
  routing: routerReducer,
  upload: uploadReducer,
  locks: locksReducer,
  users: usersReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'AUTH_LOGOUT_USER') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
