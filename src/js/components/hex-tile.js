import React, { Component } from 'react';
import { Shape } from 'react-art';
import { makeHexPath } from '../utils/hex-layout';

export default class HexTile extends Component {
  handleClick() {

  }

  render() {
    var color = '#111';

    // TODO - this could be optimised, don't need to calculate coords for every hex, just one and then offset.
    var path = makeHexPath(this.props.size, this.props.centre);

    return (
      <Shape d={path} fill={color} opacity='0.5' onClick={ this.handleClick }></Shape>
    );
  }
}
