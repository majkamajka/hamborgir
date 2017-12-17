import React, { Component } from 'react';

class Board extends Component {

  drawBoard() {
    const x = [];
    for (let i = 0; i < this.props.size * this.props.size; i++) {
      x.push(<div key={ i }>{ i + 1 }</div>)
    }
    
    return x;
  }

  render() {
    return (
      <section className='board'>
        { this.drawBoard() }
      </section>
    )
  }
}

export default Board;
