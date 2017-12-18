import React, { Component } from 'react';

class Board extends Component {

  // state = {
  //   index: 0,
  // };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    }
  };  

  // ADD: calculate cat index

  calculateCatposition = () => {
    console.log('sasdsada');
    
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        index: this.state.index < 100 ? this.state.index + 1 : 0,
      })
    }, 500);
    this.calculateCatposition;
  }

  drawBoard() {
    const board = [];
    for (let i = 0; i < this.props.size * this.props.size; i++) {
      board.push(
        <div
          className={ i === this.state.index ? 'cat' : null }
          key={ i }
        >
          { i }
        </div>
      )
    }
    return board;
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
