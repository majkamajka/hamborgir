import { combineReducers } from 'redux';
import CatIndexReducer from './reducer-catIndex';

const allReducers = combineReducers({
  catIndex: CatIndexReducer
});

export default allReducers;