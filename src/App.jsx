import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import allReducers from './reducers';
import { Provider } from 'react-redux';

import '../src/style/style.scss';

import Board from './components/Board.jsx';

const store = createStore(allReducers);

class App extends React.Component {
  render() {
    return (
      <Board size='10' />
    );
  }
}

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>
  , document.getElementById('app'),
);
