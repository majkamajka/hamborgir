import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { catIndex } from '../actions/action-catIndex.js';
import { burgerIndex } from '../actions/action-burgerIndex.js';
import { score } from '../actions/action-score.js';
// wszystkie actions w jeden plik?

class Cell extends Component {

  // burgerindex chyba niepotrzebny w reduksie, winien byc tutaj w stejcie chyba

  cellClass = (catIndex, burgerIndexInit, id) => {
    //console.log(this.props);
    
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
      this.props.updateScore(this.props.score + 1);
    }
  }

  render() {
    const { catIndex, burgerIndexInit, id } = this.props;
    this.checkCollision();
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
    score: state.score
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    burgerIndex: burgerIndex,
    updateScore: score
  }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Cell);
