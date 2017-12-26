import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { catIndex } from '../actions/index.js';

import Cell from './Cell.jsx';

class Board extends Component {

  state = {
    catIndex: 1,
    burgerIndex: Math.floor(Math.random() * 100) + 1,
    //direction: 'right',
    moveX: 1,
    moveY: 0,
    x: 0,
    y: 1,
  };

  calculateCatPosition = () => {
    this.setState({
      x: this.state.x + this.state.moveX,
      y: this.state.y + this.state.moveY,
    });
    
  }

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
      this.calculateCatPosition();
      this.setState({catIndex: 10*(this.state.y-1) + this.state.x});
      this.props.catIndex(this.state.catIndex);
      
      if (this.state.x < 0 || this.state.x > 10 || this.state.y < 0 || this.state.y > 10) {
        console.log('game over');
        clearInterval(startCat); // trzeba zniknac kota
      }
    }, 500);
    window.addEventListener('keydown', this.setDirection );
  }

  drawBoard() {
    const board = [];
    for (let i = 0; i < this.props.size; i++) {
      for (let j = 1; j <= this.props.size; j++) {
        board.push(
          <Cell
            burgerIndex={ this.state.burgerIndex }
            id={ 10*i + j } />
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
};

function mapStateToProps(state) {
  return {
    catIndex: state.catIndex
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({catIndex: catIndex}, dispatch)
}

 export default connect(mapStateToProps, matchDispatchToProps)(Board);
