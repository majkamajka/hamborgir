import React, { Component } from 'react';

class Cell extends Component {

  render() {
    return (
      <div className={ this.props.className } id={ this.props.key } >
        {this.props.content}
      </div>  
    )
  }
}

export default Cell;
