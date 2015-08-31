import React, { Component } from 'react';
import { Shape } from 'react-art';
import { Spring } from 'react-motion';
import { makeHexPath } from '../utils/hex-layout';

export default class HexTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  }

  handleClick = () => {
    this.setState({
      isSelected: !this.state.isSelected
    })
  }

  render() {
    var color = '#888';
    var opacity = 1;
    var selectedSize = this.props.size;
    var zIndex = 0;

    if (this.state.isSelected) {
      selectedSize = this.props.size * 0.6;
      color = '#aaa';
      zIndex = 1;
    }

    // TODO - this could be optimised, don't need to calculate coords for every hex, just one and then offset.
    return (
      <Spring
        defaultValue={ { val: this.props.size } }
        endValue={ { val: selectedSize, config: [200, 15] } }>

        { interpolated => (
          <Shape
            d={ makeHexPath(interpolated.val, this.props.centre) }
            fill={ color }
            opacity= { opacity }
            onClick={ this.handleClick }
            zIndex= { zIndex } /> )}

      </Spring>
    );
  }
}
