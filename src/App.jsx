import React from 'react';
import ReactDOM from 'react-dom';

import '../src/style/style.scss';

import Board from './components/Board.jsx';

class App extends React.Component {
  
  render() {
    return (
      <Board size='10' />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);