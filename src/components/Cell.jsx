import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { catIndex } from '../actions/action-catIndex.js';
import { burgerIndex } from '../actions/action-burgerIndex.js';

class Cell extends Component {

  // burgerindex chyba niepotrzebny w reduksie, winien byc tutaj w stejcie chyba

  drawBurgerIndex = (burgerIndexInit) => {
    const newBurgerIndex = Math.floor(Math.random() * 100) + 1;
    newBurgerIndex !== burgerIndexInit ? this.props.burgerIndex(newBurgerIndex) : this.drawBurgerIndex();
  }

  render() {
    let cellClass;
    //console.log(this.props);

    const { catIndex, burgerIndexInit, id } = this.props;
    
    if (catIndex === id) {
      cellClass = 'cat';
    } else if ( burgerIndexInit === id) {
      cellClass = 'hamborgir';
    }

    if ( catIndex === burgerIndexInit ) {
      console.log('jesc jedzenie');
      this.drawBurgerIndex(burgerIndexInit);
    }
    
    return (
      <div className={ cellClass } key={ id } index={ id } >
        { id }
      </div>  
    )
  }
}

function mapStateToProps(state) {
  return {
    catIndex: state.catIndex,
    burgerIndexInit: state.burgerIndex
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    burgerIndex: burgerIndex
  }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Cell);
