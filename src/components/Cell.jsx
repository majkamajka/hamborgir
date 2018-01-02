import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { burgerIndex } from '../actions/action-burgerIndex.js';
import { updateScore } from '../actions/action-updateScore.js';
import { increaseSpeed } from '../actions/action-increaseSpeed';

// wszystkie actions w jeden plik?

class Cell extends Component {
  cellClass = (catIndex, burgerIndexInit, id) => {
    if (catIndex === id) {
      return 'cat';
    } else if ( burgerIndexInit === id) {
      return 'hamborgir';
    } else {
      return '';
    }
  }

  drawBurgerIndex = (burgerIndexInit) => {
    const newBurgerIndex = Math.floor(Math.random() * 100) + 1;
    newBurgerIndex !== burgerIndexInit ? this.props.burgerIndex(newBurgerIndex) : this.drawBurgerIndex();
  }

  checkCollision = () => {
    const { catIndex, burgerIndexInit } = this.props; // dwa razy definiuje te same zmiennie - :/
    if ( catIndex === burgerIndexInit ) {
      console.log('jesc jedzenie');
      this.drawBurgerIndex(burgerIndexInit);
      this.props.updateScore(this.props.scoreFromRedux);
      if ((this.props.scoreFromRedux + 1) % 3 === 0 && this.props.scoreFromRedux !== 0) { //o jeden props.score za pozno, => +1 :/
        this.props.increaseSpeed(this.props.speed);
      }
    }
  }

  render() {
    const { catIndex, burgerIndexInit, id } = this.props;
    this.checkCollision(); // <- nie wiem co z tym - warning :/

    return (
      <div 
        className={ this.cellClass(catIndex, burgerIndexInit, id) }
        key={ id }
        index={ id }
      >
        { id }
      </div>  
    )
  }
}

function mapStateToProps(state) {
  return {
    catIndex: state.catIndex,
    burgerIndexInit: state.burgerIndex,
    scoreFromRedux: state.scoreFromRedux,
    speed: state.speed
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    burgerIndex: burgerIndex,
    updateScore: updateScore,
    increaseSpeed: increaseSpeed
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Cell);
