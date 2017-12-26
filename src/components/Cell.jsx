import React, { Component } from 'react';
import { connect } from 'react-redux';
import { catIndex } from '../actions/index.js';

class Cell extends Component {

  render() {
    console.log(this.props.catIndex);
    
    return (
      <div className={ this.props.className } key={ this.props.id } index={ this.props.id } >
        {this.props.content}
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
