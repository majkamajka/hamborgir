import { combineReducers } from 'redux';
import CatIndexReducer from './reducer-catIndex';
import BurgerIndexReducer from './reducer-burgerIndex';
import ScoreReducer from './reducer-score';
import SpeedReducer from './reducer-speed';

const allReducers = combineReducers({ // w calej aplikacji rzeczy beda sie tak nazywac, jak tutaj
  catIndex: CatIndexReducer,
  burgerIndex: BurgerIndexReducer,
  scoreFromRedux: ScoreReducer,
  speed: SpeedReducer
});

export default allReducers;
