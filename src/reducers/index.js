import { combineReducers } from 'redux';
import CatIndexReducer from './reducer-catIndex';
import BurgerIndexReducer from './reducer-burgerIndex';

const allReducers = combineReducers({
  catIndex: CatIndexReducer,
  burgerIndex: BurgerIndexReducer
});

export default allReducers;