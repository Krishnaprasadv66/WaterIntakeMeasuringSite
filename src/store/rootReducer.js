import { combineReducers } from 'redux';
import authReducer from './authSlice';
import crudReducer from './crudSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  crud: crudReducer,
});

export default rootReducer;