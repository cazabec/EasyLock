import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import uploadReducer from './upload';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    routing: routerReducer,
    upload: uploadReducer,
});
