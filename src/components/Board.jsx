import React, { Component } from 'react';

import Cell from './Cell.jsx';

class Board extends Component {

  state = {
    index: 0,
    //direction: 'right',
    moveX: 1,
    moveY: 0,
    x: 0,
    y: 1,
  };

  // ADD: calculate cat index

  // calculateCatPosition = () => {
 
  //   return 10;
  // }

  setDirection = (e) => {
    if (e.keyCode == 37) {
      this.setState({ direction: 'left', moveX: -1, moveY: 0})
    } else if (e.keyCode == 38) {
      this.setState({ direction: 'up', moveY: -1, moveX: 0})
    } else if (e.keyCode == 39) {
      this.setState({ direction: 'right', moveX: 1, moveY: 0})
    } else if (e.keyCode == 40) {
      this.setState({ direction: 'down', moveY: 1, moveX: 0})
    } 
  }

  componentDidMount() {
    const startCat = setInterval(() => {
      console.log(this.state);
      
      this.setState({
        x: this.state.x + this.state.moveX,
        y: this.state.y + this.state.moveY
      });
      if (this.state.x < 0 || this.state.x > 10 || this.state.y < 0 || this.state.y > 10) {
        // console.log(this.state.x);
        
        // this.setState({
        //   x: -1
        // });
        console.log("dupa");
        clearInterval(startCat);
      }
    }, 1000);
    window.addEventListener('keydown', this.setDirection );
  }

  drawBoard() {
    const board = [];
    for (let i = 0; i < this.props.size; i++) {
      for (let j = 1; j <= this.props.size; j++) {
        board.push(
          <Cell
            className={ j === this.state.x && i === this.state.y - 1? 'cat' : null } // dlaczego?! j=x i i = y, a nie na odwrot :(
            key={ 10*i + j }
            content={ 10*i + j }
            x={ i }
            y={ j }
          />
        )
      }
    }
    return board;
  }

  render() {
    return (
      <section className='board' >
        { this.drawBoard() }
      </section>
    )
  }
}

export default Board;
