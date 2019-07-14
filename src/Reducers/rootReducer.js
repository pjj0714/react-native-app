import { combineReducers } from 'redux';
import login from './loginReducer';
import vehiclesData from './vehiclesDataReducer';
import favorite from './favoriteReducer';

const rootReducer = combineReducers({
  login,
  vehiclesData,
  favorite
});

export default rootReducer;
