import React from 'react';
import ReactDOM from 'react-dom';

import '../src/style/style.scss';

class App extends React.Component {
  
  render() {
    const x = "dsfssssssdf";
    return (
      <p>{ x }</p>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);