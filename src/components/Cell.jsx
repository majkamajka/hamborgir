import React, { Component } from 'react';
import { connect } from 'react-redux';
import { catIndex } from '../actions/index.js';

class Cell extends Component {

  render() {
    let cellClass;
    
    if (this.props.catIndex === this.props.id) {
      cellClass = 'cat';
    } else if ( this.props.burgerIndex === this.props.id) {
      cellClass = 'hamborgir';
    }

    //dodac sprawdzanie kolizji kota z burgerem, jak jest - wylosowac nowy burgerIndex
    
    return (
      <div className={ cellClass } key={ this.props.id } index={ this.props.id } >
        {this.props.id}
      </div>  
    )
  }
}

function mapStateToProps(state) {
  return {
    catIndex: state.catIndex
  }
}

export default connect(mapStateToProps)(Cell);
