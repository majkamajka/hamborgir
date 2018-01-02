import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { catIndex } from '../actions/action-catIndex.js';
import { burgerIndex } from '../actions/action-burgerIndex.js';

import Cell from './Cell.jsx';

class Board extends Component {

  state = {
    catIndex: 1,
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
    //this.props.score i score to chyba to samo - ?

    const { size } = this.props;

    const catTimeout = () => {      
      this.calculateCatPosition();
      this.setState({catIndex: 10*(this.state.y-1) + this.state.x});
      this.props.catIndex(this.state.catIndex);
      if (!((this.state.x === 0 || this.state.x > size || this.state.y === 0 || this.state.y > size))) {
        setTimeout(catTimeout, this.props.speed);
      } else {
        console.log('game over');
      }
    }

    setTimeout(catTimeout, this.props.speed);

    window.addEventListener('keydown', this.setDirection);
  }

  drawBoard() {
    const board = [];
    for (let i = 0; i < this.props.size; i++) {
      for (let j = 1; j <= this.props.size; j++) {
        board.push(
          //to id jest bez sensu
          <Cell id={ 10 * i + j } />
        )
      }
    }
    return board;
  }

  render() {
    return [
      <section className='board'>
        { this.drawBoard() }
      </section>,
      <p>score: { this.props.scoreFromRedux }</p>,
      <p>speed: { this.props.speed }</p>
    ]
  }
};

// zle ponazywane rzeczy/propsy - burgerIndexInit burgerIndex, scoreFromRedux. poprawic potem.

function mapStateToProps(state) {
  return {
    scoreFromRedux: state.scoreFromRedux,
    speed: state.speed
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    catIndex: catIndex,
    burgerIndex: burgerIndex
  }, dispatch)
}

 export default connect(mapStateToProps, matchDispatchToProps)(Board);
