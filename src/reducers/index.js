import { combineReducers } from 'redux';
import CatIndexReducer from './reducer-catIndex';
import BurgerIndexReducer from './reducer-burgerIndex';
import Score from './reducer-score';

const allReducers = combineReducers({
  catIndex: CatIndexReducer,
  burgerIndex: BurgerIndexReducer,
  score: Score
});

export default allReducers;