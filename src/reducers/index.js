import { combineReducers } from 'redux';
import CatIndexReducer from './reducer-catIndex';
import BurgerIndexReducer from './reducer-burgerIndex';
import ScoreReducer from './reducer-score';

const allReducers = combineReducers({ // w calej aplikacji rzeczy beda sie tak nazywac, jak tutaj
  catIndex: CatIndexReducer,
  burgerIndex: BurgerIndexReducer,
  scoreFromRedux: ScoreReducer
});

export default allReducers;
